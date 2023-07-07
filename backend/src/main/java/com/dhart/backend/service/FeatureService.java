package com.dhart.backend.service;

import com.dhart.backend.exceptions.NotFoundException;
import com.dhart.backend.exceptions.RegisteredResourceException;
import com.dhart.backend.model.Feature;
import com.dhart.backend.model.dto.FeatureDTO;
import com.dhart.backend.repository.FeatureRepository;
import com.dhart.backend.utils.FeatureMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FeatureService {

    private final FeatureRepository featureRepository;

    @Autowired
    public FeatureService(FeatureRepository featureRepository)
    {
        this.featureRepository = featureRepository;
    }

    public void saveFeature(FeatureDTO featureDTO) throws RegisteredResourceException {
        Feature feature = FeatureMapper.featureDtoToFeature(null, featureDTO);
        featureRepository.save(feature);
    }


    public Optional<FeatureDTO> findFeatureById(Long id) throws NotFoundException {
        Optional<FeatureDTO> featureDTOOptional = null;
        Optional<Feature> feature = featureRepository.findById(id);
        if(feature.isPresent()){
            FeatureDTO featureDTO =FeatureMapper.featureToFeatureDto(feature.get());
            featureDTOOptional = Optional.of(featureDTO);
        }
        else{
            throw new NotFoundException("This feature doesn't exists");
        }
        return featureDTOOptional;

    }

    public List<FeatureDTO> findAllFeatures(){

        List<Feature> features = featureRepository.findAll();
        List<FeatureDTO> featureDTOList = new ArrayList<FeatureDTO>();
        for (Feature feature: features) {
            FeatureDTO featureDTO = FeatureMapper.featureToFeatureDto(feature);
            featureDTOList.add(featureDTO);
        }
        return featureDTOList;
    }

    public void deleteFeature (Long id) throws NotFoundException {
        findFeatureById(id);
        featureRepository.deleteById(id);
    }

}
