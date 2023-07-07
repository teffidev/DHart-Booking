package com.dhart.backend.service;

import com.dhart.backend.exceptions.NotFoundException;
import com.dhart.backend.exceptions.RegisteredResourceException;
import com.dhart.backend.model.Category;
import com.dhart.backend.model.dto.CategoryDTO;
import com.dhart.backend.repository.CategoryRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@SpringBootTest
class CategoryServiceTest {
    @InjectMocks
    CategoryService categoryService;
    @Mock
    CategoryRepository categoryRepository;


    @Test
    void testFindAllCategories() {
        List<Category> categories = new ArrayList<>();
        Mockito.when(categoryRepository.findAll()).thenReturn(categories);
        List<CategoryDTO> result = categoryService.findAllCategories();
        Assert.assertEquals(categories.size(), result.size());
    }

    @Test
    void testSaveCategory() throws RegisteredResourceException {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setTitle("Titulo");
        Mockito.when(categoryRepository.save(Mockito.any(Category.class))).thenAnswer(invocation -> invocation.getArgument(0));
        CategoryDTO result = categoryService.saveCategory(categoryDTO);
        Mockito.verify(categoryRepository).findByTitle(categoryDTO.getTitle());
        Mockito.verify(categoryRepository).save(Mockito.any(Category.class));
        Assert.assertEquals(categoryDTO, result);
    }

    @Test
    void testSaveCategoryWithCategoryAlreadyExists() throws RegisteredResourceException {
        CategoryDTO categoryDTO = new CategoryDTO();
        Mockito.when(categoryRepository.findByTitle(Mockito.anyString())).thenAnswer(invocation -> true);
        categoryService.saveCategory(categoryDTO);
    }

    @Test
    void testExistsCategoryByTitleTrue() {
        String title = "Titulo";
        Mockito.when(categoryRepository.findByTitle(title)).thenReturn(Optional.of(new Category()));
        boolean result = categoryService.existsCategoryByTitle(title);
        Assert.assertTrue(result);
    }

    @Test
    void testExistsCategoryByTitleFalse() {
        String title = "Titulo";
        Mockito.when(categoryRepository.findByTitle(title)).thenReturn(Optional.empty());
        boolean result = categoryService.existsCategoryByTitle(title);
        Assert.assertFalse(result);
    }

    @Test
    void testFindCategoryByIdValid() throws NotFoundException {
        Long categoryId = 1L;
        Category category = new Category();
        category.setId(categoryId);
        Mockito.when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(category));
        Optional<CategoryDTO> result = categoryService.findCategoryById(categoryId);
        Assert.assertTrue(result.isPresent());
        Assert.assertEquals(categoryId, result.get().getId());
    }

    @Test
    void testFindCategoryByIdInvalid() {
        Long categoryId = 1L;
        Mockito.when(categoryRepository.findById(categoryId)).thenReturn(Optional.empty());
        Assert.assertThrows(NotFoundException.class, () -> categoryService.findCategoryById(categoryId));
    }

    @Test
    void testFindCategoryByName() {
        String searchText = "Texto";
        Category category = new Category();
        category.setId(1L);
        List<Category> categoryList = new ArrayList<>();
        categoryList.add(category);
        Mockito.when(categoryRepository.findByName(searchText)).thenReturn(categoryList);
        List<CategoryDTO> result = categoryService.findCategoryByName(searchText);
        Assert.assertEquals(1, result.size());
        CategoryDTO resultCategory = result.get(0);
        Assert.assertEquals(category.getId(), resultCategory.getId());
    }

    @Test
    void testUpdateCategory() throws NotFoundException {
        Long categoryId = 1L;
        CategoryDTO updatedCategoryDTO = new CategoryDTO();
        updatedCategoryDTO.setTitle("Titulo nuevo");
        Category existingCategory = new Category();
        Mockito.when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(existingCategory));
        Mockito.when(categoryRepository.save(Mockito.any(Category.class))).thenAnswer(invocation -> invocation.getArgument(0));
        categoryService.updateCategory(categoryId, updatedCategoryDTO);
        Mockito.verify(categoryRepository).findById(categoryId);
        Mockito.verify(categoryRepository).save(Mockito.any(Category.class));
    }

    @Test
    void testDeleteCategory() throws NotFoundException {
        Long categoryId = 1L;
        Category category = new Category();
        Mockito.when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(category));
        categoryService.deleteCategory(categoryId);
        Mockito.verify(categoryRepository).findById(categoryId);
        Mockito.verify(categoryRepository).deleteById(categoryId);
    }

}
