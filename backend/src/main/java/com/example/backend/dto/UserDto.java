package com.example.backend.dto;

import com.example.backend.model.ImageData;
import com.example.backend.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UserDto {
    private  String fullName;
    private String email;
    private Long imageId;

    public UserDto(String fullName, String email, Long imageId) {
        this.fullName = fullName;
        this.email = email;
        this.imageId = imageId;
    }

    public UserDto(User user) {
        this.fullName = user.getFullName();
        this.email = user.getEmail();
        this.imageId = user.getImageData().getId();
    }
}
