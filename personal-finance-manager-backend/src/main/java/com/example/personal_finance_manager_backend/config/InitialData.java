package com.example.personal_finance_manager_backend.config;

import com.example.personal_finance_manager_backend.model.Category;
import com.example.personal_finance_manager_backend.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class InitialData implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    public InitialData(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    private void initCategory(List<Category> categories){
        categoryRepository.saveAll(categories);
    }

    @Override
    public void run(String... args) throws Exception {

        if (categoryRepository.count() == 0){
            initCategory(List.of(new Category("Food"),
                    new Category("Leisure"), new Category("Transport"),
                    new Category("Health"), new Category("Investment")));
        }
    }
}
