package com.dhart.backend.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import com.dhart.backend.model.vm.Asset;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockMultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class S3ServiceTest {

    @Mock
    private AmazonS3Client s3Client;

    @InjectMocks
    private S3Service s3Service;

    @Captor
    private ArgumentCaptor<PutObjectRequest> putObjectRequestCaptor;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testPutObject() throws IOException {
        // Mock data
        String bucket = "dhart-loadimages";
        String contentType = "image/jpeg";
        byte[] fileContent = {1};

        InputStream inputStream = new ByteArrayInputStream(fileContent);
        MockMultipartFile multipartFile = new MockMultipartFile("file", "filename.jpg", contentType, inputStream);

        when(s3Client.putObject(any(PutObjectRequest.class)))
                .thenReturn(null);

        String result = s3Service.putObject(multipartFile);

        ArgumentCaptor<PutObjectRequest> captor = ArgumentCaptor.forClass(PutObjectRequest.class);
        verify(s3Client).putObject(captor.capture());
        PutObjectRequest capturedRequest = captor.getValue();
        assertEquals(bucket, capturedRequest.getBucketName());
        assertEquals(contentType, capturedRequest.getMetadata().getContentType());

    }
}
