package com.dhart.backend.controller;

import com.dhart.backend.exceptions.NotFoundException;
import com.dhart.backend.exceptions.RegisteredResourceException;
import com.dhart.backend.model.dto.CategoryDTO;
import com.dhart.backend.model.dto.FeatureDTO;
import com.dhart.backend.service.CategoryService;
import com.dhart.backend.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/features")
@CrossOrigin(origins = "*")
public class FeatureController {

    private final FeatureService featureService;

    @Autowired
    public FeatureController(FeatureService featureService) {
        this.featureService = featureService;
    }

    @GetMapping
    public List<FeatureDTO> findAllFeatures() {
        return featureService.findAllFeatures();
    }

    @PostMapping
    public ResponseEntity<?> saveFeature (@RequestBody FeatureDTO featureDTO)
            throws RegisteredResourceException {

        featureService.saveFeature(featureDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Feature has been successfully registered");
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeatureDTO> findFeatureById (@PathVariable Long id) throws NotFoundException {
        Optional<FeatureDTO> feature = featureService.findFeatureById(id);
        if (feature.isPresent()) {
            return ResponseEntity.ok(feature.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFeature (@PathVariable Long id) throws NotFoundException {
        Optional<FeatureDTO> feature = featureService.findFeatureById(id);
        if(feature.isPresent()){
            featureService.deleteFeature(id);
            return ResponseEntity.ok("Feature is successfully removed");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource not found");
        }
    }

}
