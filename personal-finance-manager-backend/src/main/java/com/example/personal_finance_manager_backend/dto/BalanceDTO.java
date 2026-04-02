package com.example.personal_finance_manager_backend.dto;

import java.math.BigDecimal;

public record BalanceDTO(BigDecimal balance, BigDecimal revenue, BigDecimal expense) {
}
