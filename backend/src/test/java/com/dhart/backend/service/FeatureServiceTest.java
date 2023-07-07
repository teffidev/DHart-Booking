package com.dhart.backend.service;

import com.dhart.backend.exceptions.NotFoundException;
import com.dhart.backend.exceptions.RegisteredResourceException;
import com.dhart.backend.model.Feature;
import com.dhart.backend.model.dto.FeatureDTO;
import com.dhart.backend.repository.FeatureRepository;
import com.dhart.backend.utils.FeatureMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class FeatureServiceTest {

    @Mock
    private FeatureRepository featureRepository;

    @InjectMocks
    private FeatureService featureService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        featureService = new FeatureService(featureRepository);
    }

    @Test
    public void testSaveFeature() throws RegisteredResourceException {
        FeatureDTO featureDTO = new FeatureDTO();
        featureDTO.setId(1L);
        featureDTO.setName("Feature 1");

        Feature feature = FeatureMapper.featureDtoToFeature(null, featureDTO);

        when(featureRepository.save(any(Feature.class))).thenReturn(feature);

        assertDoesNotThrow(() -> featureService.saveFeature(featureDTO));

        verify(featureRepository, times(1)).save(any(Feature.class));
    }

    @Test
    public void testFindFeatureById() throws NotFoundException {
        Long featureId = 1L;
        Feature feature = new Feature();
        feature.setId(featureId);
        feature.setName("Feature 1");

        Optional<Feature> featureOptional = Optional.of(feature);

        when(featureRepository.findById(featureId)).thenReturn(featureOptional);

        Optional<FeatureDTO> resultOptional = featureService.findFeatureById(featureId);

        assertTrue(resultOptional.isPresent());
        assertEquals(featureId, resultOptional.get().getId());
        assertEquals("Feature 1", resultOptional.get().getName());

        verify(featureRepository, times(1)).findById(featureId);
    }

    @Test
    public void testFindFeatureByIdNotFound() {
        Long featureId = 1L;

        when(featureRepository.findById(featureId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> featureService.findFeatureById(featureId));

        verify(featureRepository, times(1)).findById(featureId);
    }

    @Test
    public void testFindAllFeatures() {
        List<Feature> features = new ArrayList<>();
        Feature feature1 = new Feature();
        feature1.setId(1L);
        feature1.setName("Feature 1");
        Feature feature2 = new Feature();
        feature2.setId(2L);
        feature2.setName("Feature 2");
        features.add(feature1);
        features.add(feature2);

        when(featureRepository.findAll()).thenReturn(features);

        List<FeatureDTO> result = featureService.findAllFeatures();

        assertEquals(2, result.size());
        assertEquals("Feature 1", result.get(0).getName());
        assertEquals("Feature 2", result.get(1).getName());

        verify(featureRepository, times(1)).findAll();
    }


    @Test
    public void testDeleteFeature() throws NotFoundException {
        Long featureId = 1L;
        Feature feature = new Feature();
        feature.setId(featureId);
        feature.setName("Feature 1");

        Optional<Feature> featureOptional = Optional.of(feature);

        when(featureRepository.findById(featureId)).thenReturn(featureOptional);
        doNothing().when(featureRepository).deleteById(featureId);

        assertDoesNotThrow(() -> featureService.deleteFeature(featureId));

        verify(featureRepository, times(1)).findById(featureId);
        verify(featureRepository, times(1)).deleteById(featureId);
    }

    @Test
    public void testDeleteFeatureNotFound() {
        Long featureId = 1L;

        when(featureRepository.findById(featureId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> featureService.deleteFeature(featureId));

        verify(featureRepository, times(1)).findById(featureId);
        verify(featureRepository, times(0)).deleteById(featureId);
    }
}

