package com.dhart.backend.service;

import com.dhart.backend.exceptions.NotFoundException;
import com.dhart.backend.model.Product;
import com.dhart.backend.model.dto.ScoreDTO;
import com.dhart.backend.repository.IUsuariosRepository;
import com.dhart.backend.repository.ProductRepository;
import com.dhart.backend.repository.ScoreRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ScoreServiceTest {

    private ScoreService scoreService;

    @Mock
    private ScoreRepository scoreRepository;

    @Mock
    private IUsuariosRepository usuariosRepository;

    @Mock
    private ProductRepository productRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        scoreService = new ScoreService(scoreRepository, usuariosRepository, productRepository);
    }


    @Test
    void saveScore_InvalidProduct_ShouldThrowNotFoundException() {
        ScoreDTO scoreDto = new ScoreDTO(1L, 4, 1L, 1L);
        scoreDto.setProductId(1L);
        scoreDto.setUserId(1L);
        scoreDto.setScore(4);

        when(productRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> scoreService.saveScore(scoreDto));
    }

    @Test
    void saveScore_InvalidUser_ShouldThrowNotFoundException() {
        // Arrange
        ScoreDTO scoreDto = new ScoreDTO(1L, 4, 1L, 1L);
        scoreDto.setProductId(1L);
        scoreDto.setUserId(1L);
        scoreDto.setScore(4);

        Product product = new Product();

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(usuariosRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> scoreService.saveScore(scoreDto));
    }


}

