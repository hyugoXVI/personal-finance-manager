package com.example.personal_finance_manager_backend.controller;

import com.example.personal_finance_manager_backend.dto.CategoryDTO;
import com.example.personal_finance_manager_backend.dto.CategoryRequest;
import com.example.personal_finance_manager_backend.model.Category;
import com.example.personal_finance_manager_backend.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<CategoryDTO> getCategories(){
        return categoryService.getAllCategories();
    }

    @PostMapping("/create")
    public CategoryDTO createCategory(@RequestBody @Valid CategoryRequest request){

        Category category = categoryService.createCategory(request);

        return new CategoryDTO(category.getId(),category.getName());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id){

        categoryService.deleteCategory(id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/edit/{id}")
    public CategoryDTO editCategory(@PathVariable Long id,
                                    @RequestBody @Valid CategoryRequest request){

        return categoryService.editCategory(id, request);
    }

}
