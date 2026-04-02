package com.example.personal_finance_manager_backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotNull(message = "Email is obligatory.")
        @Email(message = "Invalid email format.")
        String email,

        @NotNull(message = "Name is obligatory.")
        @NotBlank(message = "Invalid name.")
        String name,

        @NotNull(message = "Password is obligatory.")
        @Size(min = 8)
        String password) {
}
