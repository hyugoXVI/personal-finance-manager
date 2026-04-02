package com.example.personal_finance_manager_backend.service;

import com.example.personal_finance_manager_backend.dto.BalanceDTO;
import com.example.personal_finance_manager_backend.dto.TransactionDTO;
import com.example.personal_finance_manager_backend.dto.TransactionRequest;
import com.example.personal_finance_manager_backend.exception.ResourceNotFoundException;
import com.example.personal_finance_manager_backend.model.Category;
import com.example.personal_finance_manager_backend.model.Transaction;
import com.example.personal_finance_manager_backend.model.TransactionType;
import com.example.personal_finance_manager_backend.model.User;
import com.example.personal_finance_manager_backend.repository.CategoryRepository;
import com.example.personal_finance_manager_backend.repository.TransactionRepository;
import com.example.personal_finance_manager_backend.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public TransactionService(TransactionRepository transactionRepository, CategoryRepository categoryRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public BalanceDTO getBalance(){

        BigDecimal revenue = transactionRepository.sumByTypeAndUser(TransactionType.REVENUE, getAuthenticatedUser());

        BigDecimal expense = transactionRepository.sumByTypeAndUser(TransactionType.EXPENSE, getAuthenticatedUser());

        if (revenue == null) revenue = BigDecimal.ZERO;
        if (expense == null) expense = BigDecimal.ZERO;

        BigDecimal balance = revenue.subtract(expense);

        return new BalanceDTO(balance, revenue, expense);
    }

    public List<TransactionDTO> getFirstFiveTransactions(){
        return  (transactionRepository.findAllByUserEmailOrderByCreatedAtDesc(getAuthenticatedUser().getEmail()).stream()
                .limit(5)
                .map(transaction -> new TransactionDTO(transaction.getId(), transaction.getType(), transaction.getDate(),
                        transaction.getAmount(), transaction.getDescription(), transaction.getCategory(),
                        transaction.getCreatedAt())).toList());
    }

    public Page<Transaction> findAllTransactions(Pageable pageable){

        return transactionRepository.findAllByUserEmail(pageable, getAuthenticatedUser().getEmail());
    }

    public Transaction createTransaction(TransactionRequest request){

        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() ->
                new ResourceNotFoundException("Category not found!"));


        return transactionRepository.save(new Transaction(request.type(), request.amount(), request.description(),
                category, request.date(), getAuthenticatedUser()));
    }

    public void deleteTransaction(Long id){

        transactionRepository.findById(id)
                .ifPresentOrElse(transactionRepository::delete,
                        () -> {
                    throw new ResourceNotFoundException("Transaction not found.");
                });
    }

    public TransactionDTO editTransaction(Long id, TransactionRequest request){

        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found!"));

        Category category = categoryRepository.findById(request.categoryId())
                        .orElseThrow(() -> new ResourceNotFoundException("Category not found!"));

        transaction.edit(request, category);
        transactionRepository.save(transaction);

        return new TransactionDTO(transaction.getId(), transaction.getType(), transaction.getDate(),
                transaction.getAmount(), transaction.getDescription(), transaction.getCategory(),
                transaction.getCreatedAt());

    }

    public void deleteAllTransactions(){

        if (transactionRepository.findAll().isEmpty()) throw new RuntimeException("There's no transaction(s) to delete!");

        transactionRepository.deleteAll();
    }

    private User getAuthenticatedUser(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.isAuthenticated() && authentication != null){
            return userRepository.findByEmail(authentication.getName())
                    .orElseThrow(() -> new BadCredentialsException("Invalid e-mail."));
        }
        return null;
    }


}
