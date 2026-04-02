package com.example.personal_finance_manager_backend.dto;

import com.example.personal_finance_manager_backend.model.TransactionType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionRequest(
                                 @NotNull(message = "Transaction type cannot be null.")
                                 @Enumerated(EnumType.STRING)
                                 TransactionType type,

                                 @NotNull(message = "Amount cannot be null.")
                                 @Positive (message = "Amount must be higher than 0(zero).")
                                 BigDecimal amount,

                                 @NotNull(message = "Description cannot be null.")
                                 @NotBlank(message = "Invalid description.")
                                 String description,

                                 @NotNull(message = "Category cannot be null.")
                                 Long categoryId,

                                 @NotNull(message = "Date is obligatory.")
                                 LocalDate date) {
}
