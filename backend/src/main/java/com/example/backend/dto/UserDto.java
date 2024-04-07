package com.example.backend.dto;

import com.example.backend.model.ImageData;
import com.example.backend.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
public class UserDto {
    private  String fullName;
    private String email;
    private Long imageId;

    public UserDto(User user) {
        this.fullName = user.getFullName();
        this.email = user.getEmail();
        this.imageId = user.getImageData().getId();
    }
}
