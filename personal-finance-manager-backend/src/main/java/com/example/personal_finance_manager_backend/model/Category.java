package com.example.personal_finance_manager_backend.model;

import com.example.personal_finance_manager_backend.dto.CategoryDTO;
import com.example.personal_finance_manager_backend.dto.CategoryRequest;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "TB_CATEGORIES")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotNull
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private Category(){}

    public Category(String name){
        this.name = name;
    }
    public Category(String name, User user) {
        this.name = name;
        this.user = user;
    }


    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public User getUser() {
        return user;
    }

    public void edit(CategoryRequest request){

        this.name = request.name();
    }
}
