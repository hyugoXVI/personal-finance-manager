package com.example.personal_finance_manager_backend.controller;

import com.example.personal_finance_manager_backend.dto.UserDTO;
import com.example.personal_finance_manager_backend.service.AuthService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final AuthService authService;

    public UserController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/me")
    public UserDTO getAuthenticatedUserData(){
        return authService.getUserData();
    }
}
