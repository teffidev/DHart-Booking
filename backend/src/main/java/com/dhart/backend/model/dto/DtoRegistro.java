package com.dhart.backend.model.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DtoRegistro {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
}
