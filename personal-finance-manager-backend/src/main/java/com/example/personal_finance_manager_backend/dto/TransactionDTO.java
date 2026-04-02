package com.example.personal_finance_manager_backend.dto;

import com.example.personal_finance_manager_backend.model.Category;
import com.example.personal_finance_manager_backend.model.TransactionType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record TransactionDTO(Long id,
                             @Enumerated(EnumType.STRING) TransactionType type,
                             LocalDate date,
                             BigDecimal amount,
                             String description,
                             Category category,
                             LocalDateTime createdAt) {
}
