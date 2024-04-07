package com.example.backend;

import com.example.backend.service.StorageService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@SpringBootApplication
@RestController
public class BackendApplication implements CommandLineRunner {

    @Value("${server.port}")
    private String port;
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }
    @Override
    public void run(String... args) throws Exception {
        System.out.println("Application started. Listen on port:" + port);
    }
}
