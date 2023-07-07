package com.dhart.backend.controller;

import com.dhart.backend.exceptions.NotFoundException;
import com.dhart.backend.exceptions.RegisteredResourceException;
import com.dhart.backend.model.dto.CategoryDTO;
import com.dhart.backend.service.CategoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class CategoryControllerTest {

    private MockMvc mockMvc;

    @Mock
    private CategoryService categoryService;

    @InjectMocks
    private CategoryController categoryController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(categoryController).build();
    }


    @Test
    public void findCategoryById_NonExistingCategory_ShouldReturnNotFoundStatus() throws Exception {
        // Arrange
        when(categoryService.findCategoryById(anyLong())).thenReturn(Optional.empty());

        // Act
        mockMvc.perform(get("/api/categories/{id}", 1))
                .andExpect(status().isNotFound());

        // Assert
        verify(categoryService, times(1)).findCategoryById(eq(1L));
    }


    @Test
    public void updateCategory_NonExistingCategory_ShouldReturnNotFoundStatus() throws Exception {
        // Arrange
        when(categoryService.findCategoryById(anyLong())).thenReturn(Optional.empty());

        // Act
        mockMvc.perform(put("/api/categories/{id}", 1)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\": 1, \"name\": \"Updated Category\"}"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Resource not found"));

        // Assert
        verify(categoryService, times(1)).findCategoryById(eq(1L));
    }

    @Test
    public void deleteCategory_ExistingCategory_ShouldReturnOkStatus() throws Exception {
        // Arrange
        CategoryDTO categoryDTO = new CategoryDTO(1L,"Tittle", "Description",
                "5410c710-1975-4b6b-b7ac-b2d30e44b904.jpeg",
                "https://dhart-loadimages.s3.amazonaws.com/5410c710-1975-4b6b-b7ac-b2d30e44b904.jpeg");

        when(categoryService.findCategoryById(anyLong())).thenReturn(Optional.of(categoryDTO));

        // Act
        mockMvc.perform(delete("/api/categories/{id}", 1))
                .andExpect(status().isOk())
                .andExpect(content().string("Category is successfully removed"));

        // Assert
        verify(categoryService, times(1)).deleteCategory(eq(1L));
    }

    @Test
    public void deleteCategory_NonExistingCategory_ShouldReturnNotFoundStatus() throws Exception {
        // Arrange
        when(categoryService.findCategoryById(anyLong())).thenReturn(Optional.empty());

        // Act
        mockMvc.perform(delete("/api/categories/{id}", 1))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Resource not found"));

        // Assert
        verify(categoryService, times(1)).findCategoryById(eq(1L));
    }
}
