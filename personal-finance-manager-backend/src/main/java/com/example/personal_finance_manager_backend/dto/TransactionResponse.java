package com.example.personal_finance_manager_backend.dto;

import com.example.personal_finance_manager_backend.model.Category;
import com.example.personal_finance_manager_backend.model.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionResponse(Long id, String description, BigDecimal amount, LocalDate date,
                                  String categoryName, TransactionType type) {
}
