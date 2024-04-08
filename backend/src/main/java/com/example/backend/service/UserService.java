package com.example.backend.service;

import com.example.backend.dto.UserDto;
import com.example.backend.model.ImageData;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final StorageService storageService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, StorageService storageService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.storageService = storageService;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }
    public UserDto getUserInfo(Authentication authentication){
        User user = getUser(authentication);
        return new UserDto(user);
    }

    public void uploadUserImage(MultipartFile file, Authentication authentication) throws IOException {
        ImageData imageData = storageService.uploadImage(file);

        User user = getUser(authentication);
        user.setImageData(imageData);
    }

    public byte[] downloadImage(Authentication authentication){
        User user = getUser(authentication);
        ImageData imageData = user.getImageData();
        return storageService.downloadImage(imageData.getId());
    }

    private User getUser(Authentication authentication) {
        long userId = 0;
        if (authentication != null && authentication.isAuthenticated()) {

            Object principal = authentication.getPrincipal();

            if (principal instanceof User user) {
                userId = user.getId();
            }
        }
        Optional<User> userOptional = userRepository.findById(userId);
        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return user;
    }

    public void delete(Authentication authentication) {
        User user = getUser(authentication);
        userRepository.delete(user);
    }

    public UserDto updateGeneralData(UserDto updateUser, Authentication authentication) {
        User user = getUser(authentication);
//        User user = userRepository.findUserByEmail(updateUser.getEmail());
        user.setFullName(updateUser.getFullName());
        user.setEmail(updateUser.getEmail());

        userRepository.save(user);

        return new UserDto(updateUser.getFullName(), updateUser.getEmail(), updateUser.getImageId());
    }

    public UserDto updatePassword(String newPassword, Authentication authentication) {
        User user = getUser(authentication);

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return new UserDto(user);
    }
}
