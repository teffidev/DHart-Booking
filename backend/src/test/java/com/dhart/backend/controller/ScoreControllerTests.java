package com.dhart.backend.controller;

import com.dhart.backend.model.dto.ScoreDTO;
import com.dhart.backend.service.ScoreService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(
        controllers = ScoreController.class,
        excludeAutoConfiguration = {
               SecurityAutoConfiguration.class
        })
class ScoreControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    ObjectMapper mapper;

    @MockBean
    private ScoreService scoreService;

    private ScoreDTO scoreDTO;

    @BeforeEach
    public void init() {
        scoreDTO = ScoreDTO.builder()
                .Id(1L)
                .score(5)
                .productId(2L)
                .userId(1L)
                .build();
    }

    @Test
    void should_ReturnASuccessMessage_When_SaveScore() throws Exception {
        doNothing().when(scoreService).saveScore(any(ScoreDTO.class));


        MvcResult response = this.mockMvc.perform(post("/api/scores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(scoreDTO)))
                .andExpect(status().isCreated())
                .andReturn();

        assertEquals(response.getResponse().getContentAsString(), "successfully registered score");
    }

    @Test
    void should_ReturnADouble_When_GetAvgByProductId() throws Exception {
        when(scoreService.getAvgByProductId(anyLong())).thenReturn(Optional.of(4.5));

        MvcResult response = this.mockMvc.perform(get("/api/scores/average/{id}", scoreDTO.getProductId()))
                .andExpect(status().isOk())
                .andReturn();
        assertEquals(response.getResponse().getContentAsString(), String.valueOf(4.5));
    }

    @Test
    void should_ReturnAnInteger_When_FindScoreByProductIdAndUserId() throws Exception {
        when(scoreService.findScoreNumByProductAndUser(anyLong(), anyLong())).thenReturn(Optional.ofNullable(scoreDTO.getScore()));

        MvcResult response = this.mockMvc.perform(get("/api/scores/product/{idProduct}/user/{idUser}", scoreDTO.getProductId(), scoreDTO.getUserId()))
                .andExpect(status().isOk())
                .andReturn();

        assertEquals(response.getResponse().getContentAsString(), String.valueOf(scoreDTO.getScore()));
    }

    @Test
    void should_ReturnASuccessMessage_When_DeleteScoreByProductId() throws Exception {
        doNothing().when(scoreService).deleteScoreByProductId(anyLong());

        MvcResult response = this.mockMvc.perform(delete("/api/scores/scores/{idProduct}/delete", scoreDTO.getProductId()))
                .andExpect(status().isOk())
                .andReturn();

        assertEquals(response.getResponse().getContentAsString(), "Product Score Delete Successfully");
    }

    @Test
    void should_ReturnAScoreDTO_When_FindScoreByIdScore() throws Exception {
        when(scoreService.findScoreByIdScore(anyLong())).thenReturn(Optional.ofNullable(scoreDTO));

        MvcResult response = this.mockMvc.perform(get("/api/scores/scores/{idScore}/", scoreDTO.getId()))
                .andExpect(status().isOk())
                .andReturn();

        assertEquals(response.getResponse().getContentAsString(), mapper.writeValueAsString(scoreDTO));
    }
}