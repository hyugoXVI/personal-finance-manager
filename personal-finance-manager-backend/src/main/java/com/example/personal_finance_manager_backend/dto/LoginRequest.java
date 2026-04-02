package com.example.personal_finance_manager_backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record LoginRequest(
        @NotNull(message = "E-mail is obligatory.")
        @Email
        String email,

        @NotNull(message = "Password is obligatory")
        String password) {
}
