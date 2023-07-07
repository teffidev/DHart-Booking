package com.dhart.backend.model.dto;

import lombok.Data;

@Data
public class DtoAuthRespuesta {
    private String accessToken;
    private String tokenType = "Bearer";
    private String firstName;
    private String lastName;
    private String role;
    private String initials;
    private Long id;
    private String userEmail;

    public DtoAuthRespuesta(String accessToken, String firstName, String lastName, String role, String initials, Long id, String userEmail) {
        this.accessToken = accessToken;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.initials = initials;
        this.id = id;
        this.userEmail = userEmail;
    }

    // Constructor sin email
    public DtoAuthRespuesta(String accessToken, String firstName, String lastName, String role, String initials, Long id) {
        this.accessToken = accessToken;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.initials = initials;
        this.id = id;
    }
}
