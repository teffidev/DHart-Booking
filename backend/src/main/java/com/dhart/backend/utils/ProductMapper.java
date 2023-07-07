package com.dhart.backend.utils;

import com.dhart.backend.model.Category;
import com.dhart.backend.model.Feature;
import com.dhart.backend.model.Product;
import com.dhart.backend.model.dto.FeatureDTO;
import com.dhart.backend.model.dto.ProductDTO;

import java.util.ArrayList;
import java.util.List;

public class ProductMapper {

    public static Product productDtoToProduct(Long id, ProductDTO productDTO){
        Category category = Category.builder()
                .id(productDTO.getIdCategory())
                .build();

        List<Feature> features = new ArrayList<>();
        for (FeatureDTO featureDTO: productDTO.getFeatures()) {
            Feature feature = Feature.builder()
                    .id(featureDTO.getId())
                    .icon(featureDTO.getIcon())
                    .name(featureDTO.getName())
                    .state(featureDTO.getState())
                    .build();

            features.add(feature);
        }

        Product product = Product.builder()
                .id(id)
                .title(productDTO.getTitle())
                .description(productDTO.getDescription())
                .author(productDTO.getAuthor())
                .location(productDTO.getLocation())
                .technique(productDTO.getTechnique())
                .year(productDTO.getYear())
                .priceHour(productDTO.getPriceHour())
                .available(productDTO.getAvailable())
                .imagePath(productDTO.getImagePath())
                .imageUrl(productDTO.getImageUrl())
                .urlList(productDTO.getUrlList())
                .features(features)
                .category(category)
                .build();

        return product;
    }

    public static ProductDTO productToProductDto(Product product){


        List<FeatureDTO> featureDTOS = new ArrayList<>();
        for (Feature feature: product.getFeatures()) {
            FeatureDTO featureDTO = FeatureDTO.builder()
                    .id(feature.getId())
                    .icon(feature.getIcon())
                    .name(feature.getName())
                    .state(feature.getState())
                    .build();

            featureDTOS.add(featureDTO);
        }

        ProductDTO productDTO = ProductDTO.builder()
                .id(product.getId())
                .title(product.getTitle())
                .description(product.getDescription())
                .author(product.getAuthor())
                .location(product.getLocation())
                .technique(product.getTechnique())
                .year(product.getYear())
                .priceHour(product.getPriceHour())
                .available(product.getAvailable())
                .imagePath(product.getImagePath())
                .imageUrl(product.getImageUrl())
                .urlList(product.getUrlList())
                .idCategory(product.getCategory().getId())
                .features(featureDTOS)
                .build();

        return productDTO;

    }

}
