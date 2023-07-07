package com.dhart.backend.model.dto;

import lombok.*;

import java.time.Year;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProductDTO {

    private Long id;
    private String title;
    private String description;
    private String location;
    private String author;
    private String technique;
    private Year year;
    private Double priceHour;
    private Boolean available;
    private String imagePath;
    private String imageUrl;
    private Long idCategory;
    private List<FeatureDTO> features;
    private List<String> urlList;


}
