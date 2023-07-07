package com.dhart.backend.utils;

import com.dhart.backend.model.Feature;
import com.dhart.backend.model.dto.FeatureDTO;

public class FeatureMapper {

    public static Feature featureDtoToFeature(Long id, FeatureDTO featureDTO){
            Feature feature = Feature.builder()
                    .id(id)
                    .name(featureDTO.getName())
                    .icon(featureDTO.getIcon())
                    .state(featureDTO.getState())
                    .build();
            return feature;
        }

        public static FeatureDTO featureToFeatureDto (Feature feature){

            FeatureDTO featureDTO = FeatureDTO.builder()
                   .id(feature.getId())
                    .name(feature.getName())
                    .icon(feature.getIcon())
                    .state(feature.getState())
                    .build();
            return featureDTO;
    }
}
