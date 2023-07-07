package com.dhart.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "usuario")
public class Usuarios {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long idUsuario;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private boolean emailConfirmed; // Nueva propiedad

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "usuarios_roles", joinColumns = @JoinColumn(name = "usuario_id", referencedColumnName = "id_usuario")
            ,inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id_role"))
    private List<Roles> roles = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "usuario")
    @JsonIgnore
    List<Score> scores;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "usuario")
    @JsonIgnore
    private List<Booking> bookings;


}

