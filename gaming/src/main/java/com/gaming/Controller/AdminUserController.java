package com.gaming.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.List;
import com.gaming.Model.AdminUser;
import com.gaming.Repository.AdminUserRepository;

@RestController
@RequestMapping("/api/admin_users")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminUserController {

    @Autowired
    private AdminUserRepository adminUserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public List<AdminUser> getAllAdminUsers() {
        return adminUserRepository.findAll();
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody AdminUser signUpRequest) {
        // --- FIXED: Implemented logic to check for existing username ---
        if (adminUserRepository.findByUsername(signUpRequest.getUsername()).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT) 
                    .body(Map.of("message", "Error: Username is already taken!"));
        }

        AdminUser user = new AdminUser();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPhone(signUpRequest.getPhone());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        adminUserRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "User registered successfully!"));
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody AdminUser loginRequest) {
        Optional<AdminUser> userOptional = adminUserRepository.findByUsername(loginRequest.getUsername());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid username or password."));
        }

        AdminUser user = userOptional.get();

        // --- FIXED: Use the encoder to check if passwords match ---
        if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            // Passwords match, login successful
            return ResponseEntity.ok(user); // Return user data on successful login
        } else {
            // Passwords do not match
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid username or password."));
        }
    }
}

