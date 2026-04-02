package com.example.personal_finance_manager_backend.service;

import com.example.personal_finance_manager_backend.dto.CategoryDTO;
import com.example.personal_finance_manager_backend.dto.CategoryRequest;
import com.example.personal_finance_manager_backend.exception.ResourceAlreadyExistsException;
import com.example.personal_finance_manager_backend.exception.ResourceNotFoundException;
import com.example.personal_finance_manager_backend.model.Category;
import com.example.personal_finance_manager_backend.model.User;
import com.example.personal_finance_manager_backend.repository.CategoryRepository;
import com.example.personal_finance_manager_backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;


    public CategoryService(CategoryRepository categoryRepository, UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    private User getAuthenticatedUser(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.isAuthenticated() && authentication != null){

            return userRepository.findByEmail(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("Expired/invalid token!"));
        }

        return null;
    }

    public List<CategoryDTO> getAllCategories(){
        return categoryRepository.findAllByUser_EmailOrderByIdAsc(getAuthenticatedUser().getEmail()).stream()
                .map(category -> new CategoryDTO(category.getId(),category.getName())
                ).toList();
    }

    public Category createCategory(CategoryRequest request){

        Category category = new Category(request.name(), getAuthenticatedUser());

        categoryRepository.findByNameAndUserEmail(request.name().trim(), getAuthenticatedUser().getEmail())
                .ifPresentOrElse(s ->{
                    throw new ResourceAlreadyExistsException("This category already exists.");
                    },
                        () -> categoryRepository.save(category));

        return category;
    }

    public CategoryDTO editCategory (Long id, CategoryRequest request) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found!"));

        String newName = request.name().trim();

        if (newName.equalsIgnoreCase(category.getName())){
            return new CategoryDTO(category.getId(), category.getName());
        }

        if (categoryRepository.existsByNameIgnoreCaseAndUser(newName, category.getUser())){
            throw new ResourceAlreadyExistsException("You already have this category!");
        }

        category.edit(request);
        categoryRepository.save(category);

        return new CategoryDTO(category.getId(), category.getName());
    }


    public void deleteCategory(Long id){

        Category category = categoryRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Category not found!"));

        categoryRepository.delete(category);
    }
}
