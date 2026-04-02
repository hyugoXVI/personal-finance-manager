package com.example.personal_finance_manager_backend.controller;

import com.example.personal_finance_manager_backend.dto.LoginRequest;
import com.example.personal_finance_manager_backend.dto.TokenResponse;
import com.example.personal_finance_manager_backend.dto.RegisterRequest;
import com.example.personal_finance_manager_backend.service.AuthService;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public TokenResponse register(@RequestBody @Valid RegisterRequest request){

       return authService.registerUser(request);
    }

    @PostMapping("/login")
    public TokenResponse login(@RequestBody @Valid LoginRequest request){

        return authService.loginUser(request);
    }




}
