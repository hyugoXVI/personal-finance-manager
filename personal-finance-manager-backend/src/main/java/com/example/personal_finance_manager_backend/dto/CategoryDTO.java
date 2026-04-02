package com.example.personal_finance_manager_backend.dto;

import jakarta.validation.constraints.NotNull;

public record CategoryDTO (@NotNull Long id, @NotNull String name) {
}
