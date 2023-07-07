package com.dhart.backend.service;

import com.dhart.backend.exceptions.NotFoundException;
import com.dhart.backend.exceptions.RegisteredResourceException;
import com.dhart.backend.model.Category;
import com.dhart.backend.model.Product;
import com.dhart.backend.model.dto.FeatureDTO;
import com.dhart.backend.model.dto.ProductDTO;
import com.dhart.backend.repository.CategoryRepository;
import com.dhart.backend.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


@SpringBootTest
class ProductServiceTest {
    @InjectMocks
    ProductService productService;

    @Mock
    ProductRepository productRepository;

    @Mock
    CategoryRepository categoryRepository;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveProduct() throws RegisteredResourceException, NotFoundException {
        Category category = new Category();
        category.setId(1L);
        when(categoryRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(category));

        ProductDTO productDTO = new ProductDTO();
        productDTO.setIdCategory(1L);
        productDTO.setFeatures(new ArrayList<>());
        List<String> imageUrls = new ArrayList<>();
        imageUrls.add("image1");
        productDTO.setUrlList(imageUrls);
        FeatureDTO feature1 = new FeatureDTO();
        feature1.setName("Feature 1");
        productDTO.getFeatures().add(feature1);
        productService.saveProduct(productDTO);
        verify(productRepository).save(Mockito.any(Product.class));
    }



}