package com.example.personal_finance_manager_backend.repository;

import com.example.personal_finance_manager_backend.model.Transaction;
import com.example.personal_finance_manager_backend.model.TransactionType;
import com.example.personal_finance_manager_backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query("select sum(t.amount) from Transaction t where t.type = :type and t.user = :user")
    BigDecimal sumByTypeAndUser(@Param("type") TransactionType type, @Param("user") User user);

    List<Transaction> findAllByUserEmailOrderByCreatedAtDesc(String email);

    Page<Transaction> findAllByUserEmail(Pageable pageable, String email);
}
