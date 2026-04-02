package com.example.personal_finance_manager_backend.repository;

import com.example.personal_finance_manager_backend.model.Category;
import com.example.personal_finance_manager_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByNameAndUserEmail(String name, String email);

    boolean existsByNameIgnoreCaseAndUser(String name, User user);

    List<Category> findAllByUser_EmailOrderByIdAsc(String email);


}
