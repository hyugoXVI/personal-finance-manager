package com.example.personal_finance_manager_backend.model;

import com.example.personal_finance_manager_backend.dto.TransactionRequest;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "TB_TRANSACTIONS")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull
    private TransactionType type;

    @Column(nullable = false)
    @NotNull
    @Positive
    private BigDecimal amount;

    @Column(nullable = false)
    @NotNull
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @NotNull
    private Category category;

    @Column(nullable = false)
    @NotNull
    private LocalDate date;

    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public Transaction() {
    }

    public Transaction(TransactionType type, BigDecimal amount, String description, Category category, LocalDate date,
                       User user) {
        this.type = type;
        this.amount = amount;
        this.description = description;
        this.category = category;
        this.date = date;
        this.user = user;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public TransactionType getType() {
        return type;
    }

    public Category getCategory() {
        return category;
    }

    public LocalDate getDate() {
        return date;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public User getUser() {
        return user;
    }

    public String getDescription() {
        return description;
    }

    public void edit(TransactionRequest request, Category category){

        this.type = request.type();
        this.amount = request.amount();
        this.description = request.description();
        this.category = category;
        this.date = request.date();
    }
}
