package com.dhart.backend.model.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DtoLogin {
    private String email;
    private String password;
}
