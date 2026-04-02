package com.example.personal_finance_manager_backend.controller;

import com.example.personal_finance_manager_backend.dto.TransactionDTO;
import com.example.personal_finance_manager_backend.dto.TransactionRequest;
import com.example.personal_finance_manager_backend.model.Transaction;
import com.example.personal_finance_manager_backend.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public Page<TransactionDTO> getAllTransactions(@PageableDefault(page = 0, size = 10, sort = "createdAt",
            direction = Sort.Direction.DESC)Pageable pageable){

        Page<Transaction> transactionPage = transactionService.findAllTransactions(pageable);

        return transactionPage.map(transaction -> new TransactionDTO(
                transaction.getId(), transaction.getType(),
                transaction.getDate(), transaction.getAmount(), transaction.getDescription(), transaction.getCategory(),
                transaction.getCreatedAt()
        ));

    }

    @PostMapping("/create")
    public TransactionDTO createTransaction(@RequestBody @Valid TransactionRequest request){

        Transaction transaction = transactionService.createTransaction(request);

        return new TransactionDTO(transaction.getId(), transaction.getType(), transaction.getDate(), transaction.getAmount(),
                transaction.getDescription(), transaction.getCategory() ,transaction.getCreatedAt());
    }

    @PutMapping("/edit/{id}")
    public TransactionDTO editTransaction(@PathVariable Long id, @RequestBody @Valid TransactionRequest request){

        return transactionService.editTransaction(id, request);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id){

        transactionService.deleteTransaction(id);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<Void> deleteAllTransactions(){
        transactionService.deleteAllTransactions();

        return ResponseEntity.noContent().build();
    }


}
