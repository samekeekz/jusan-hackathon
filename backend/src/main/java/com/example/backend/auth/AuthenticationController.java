package com.example.backend.auth;

import com.example.backend.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final MailService mailService;
    @Autowired
    public AuthenticationController(AuthenticationService authenticationService, MailService mailService) {
        this.authenticationService = authenticationService;
        this.mailService = mailService;
    }


    @PostMapping("register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/password-recovery")
    public ResponseEntity<Void> passwordRecovery(@RequestParam String email) {
        mailService.sendRecoveryMail(authenticationService.createPassword(email), email);
        return ResponseEntity.ok().build();
    }
}
