package com.example.personal_finance_manager_backend.controller;

import com.example.personal_finance_manager_backend.dto.BalanceDTO;
import com.example.personal_finance_manager_backend.dto.TransactionDTO;
import com.example.personal_finance_manager_backend.service.TransactionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class TransactionDashboardController {

    private final TransactionService transactionService;

    public TransactionDashboardController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public BalanceDTO getBalance(){
        return transactionService.getBalance();
    }

    @GetMapping("/firstFiveTransactions")
    public List<TransactionDTO> getFirstFiveTransactions(){
        return transactionService.getFirstFiveTransactions();
    }

}
