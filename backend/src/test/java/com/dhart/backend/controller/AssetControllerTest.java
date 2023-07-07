package com.dhart.backend.controller;

import com.dhart.backend.model.vm.Asset;
import com.dhart.backend.service.S3Service;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class AssetControllerTest {

    private MockMvc mockMvc;

    @Mock
    private S3Service s3Service;

    @InjectMocks
    private AssetController assetController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(assetController).build();
    }



    @Test
    public void getObject_ShouldReturnByteArrayResource() throws Exception {
        // Arrange
        String key = "example-key";
        byte[] content = "Hello, World!".getBytes();
        String contentType = "text/plain";

        when(s3Service.getObject(any())).thenReturn(new Asset(content, contentType));

        // Act
        mockMvc.perform(get("/api/assets/get-object")
                        .param("key", key))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(content().bytes(content));
    }

    @Test
    public void deleteObject_ShouldCallDeleteObject() throws Exception {
        // Arrange
        String key = "example-key";

        // Act
        mockMvc.perform(delete("/api/assets/delete-object")
                .param("key", key))
                .andExpect(status().isOk());

        // Assert
        verify(s3Service, times(1)).deleteObject(key);
    }
}
