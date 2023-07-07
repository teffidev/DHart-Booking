package com.dhart.backend.controller;

import com.dhart.backend.model.Roles;
import com.dhart.backend.model.Usuarios;
import com.dhart.backend.model.dto.DtoRegistro;
import com.dhart.backend.model.dto.RoleDTO;
import com.dhart.backend.repository.IRolesRepository;
import com.dhart.backend.repository.IUsuariosRepository;

import com.dhart.backend.security.JwtGenerador;
import com.dhart.backend.security.email.VerificationToken;
import com.dhart.backend.security.email.VerificationTokenRepository;
import com.dhart.backend.service.EmailService;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.*;



import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(
        controllers = RestControllerAuth.class,
        excludeAutoConfiguration = {
                SecurityAutoConfiguration.class
        })
class RestControllerAuthTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper mapper;

    @MockBean
    IRolesRepository rolesRepository;
    @MockBean
    private IUsuariosRepository usuariosRepository;
    @MockBean
    private VerificationToken verificationToken;
    @MockBean
    private VerificationTokenRepository tokenRepository;
    @MockBean
    private AuthenticationManager authenticationManager;
    @MockBean
    private PasswordEncoder passwordEncoder;
    @MockBean
    private JwtGenerador jwtGenerador;
    @MockBean
    private EmailService emailService;


    private Usuarios user;
    private DtoRegistro registroDTO;
    private Roles roles;
    private RoleDTO newRole;

    @BeforeEach
    public void init() {
        registroDTO = DtoRegistro.builder()
                .email("user@dhart.com")
                .firstName("Anne")
                .lastName("Peterson")
                .password("2432dhart")
                .build();

        user = Usuarios.builder()
                .idUsuario(21L)
                .email(registroDTO.getEmail())
                .password(passwordEncoder.encode((registroDTO.getPassword())))
                .firstName(registroDTO.getFirstName())
                .lastName(registroDTO.getLastName())
                .build();

        newRole = new RoleDTO();
        newRole.setRoleName("Gestor de contenido");

        verificationToken = new VerificationToken();
        verificationToken.setToken(UUID.randomUUID().toString());
        verificationToken.setUser(user);
        verificationToken.setExpiryDate(new Date(System.currentTimeMillis() + (24 * 60 * 60 * 1000)));
    }

    @Test
    void should_ReturnASuccessMessage_When_RegisterAUser() throws Exception {
        roles = Roles.builder().idRole(1L).name("USER").build();
        user.setRoles(Collections.singletonList(roles));

        when(rolesRepository.findByName(roles.getName())).thenReturn(Optional.ofNullable(roles));
        when(usuariosRepository.save(any(Usuarios.class))).thenReturn(user);
        when(tokenRepository.save(any(VerificationToken.class))).thenReturn(verificationToken);
        doNothing().when(emailService).sendConfirmationEmail(anyString(), anyString());

        MvcResult response = this.mockMvc.perform(post("/api/auth/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(mapper.writeValueAsString(registroDTO)))
                .andExpect(status().isOk())
                .andReturn();

        assertEquals(response.getResponse().getContentAsString(), "EL USUARIO HA SIDO REGISTRADO EXITOSAMENTE");
    }

    @Test
    void should_ReturnATextPlainContentType_When_ConfirmUserAccount() throws Exception {
        when(tokenRepository.findByToken(anyString())).thenReturn(verificationToken);

        user.setEmailConfirmed(true);
        when(usuariosRepository.save(any(Usuarios.class))).thenReturn(user);

        doNothing().when(emailService).sendSuccessEmail(anyString(), anyString());

        MvcResult response = this.mockMvc.perform(get("/api/auth//confirm-account")
                        .param("token", verificationToken.getToken()))
                .andExpect(status().isOk())
                .andReturn();
        assertEquals(response.getResponse().getContentType(), "text/plain;charset=UTF-8");
    }

    @Test
    void should_ReturnASuccessMessage_When_RegisterAnAdmin() throws Exception {
        roles = Roles.builder().idRole(2L).name("ADMIN").build();
        registroDTO.setEmail("admin@dhart.com");
        user.setRoles(Collections.singletonList(roles));
        user.setEmailConfirmed(true);

        when(usuariosRepository.existsByEmail(anyString())).thenReturn(false);
        when(rolesRepository.findByName(roles.getName())).thenReturn(Optional.ofNullable(roles));
        when(usuariosRepository.save(any(Usuarios.class))).thenReturn(user);

        MvcResult response = this.mockMvc.perform(post("/api/auth/registerAdm")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(registroDTO)))
                .andExpect(status().isOk())
                .andReturn();

        assertEquals(response.getResponse().getContentAsString(), "El usuario administrador ha sido registrado exitosamente");
    }

    @Test
    void should_ReturnAListWith1Element_When_GetAllUsers() throws Exception {
        List<Usuarios> usersList = new ArrayList<>();
        usersList.add(user);
        when(usuariosRepository.findAll()).thenReturn(usersList);

        this.mockMvc.perform(get("/api/auth/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andReturn();
    }

    @Test
    void should_ReturnAListWith2Elements_When_GetAllRoles() throws Exception {
        List<Roles> rolesList = new ArrayList<>();

        Roles roles1 = Roles.builder().idRole(1L).name("USER").build();
        Roles roles2 = Roles.builder().idRole(1L).name("ADMIN").build();

        rolesList.add(roles1);
        rolesList.add(roles2);

        when(rolesRepository.findAll()).thenReturn(rolesList);

        this.mockMvc.perform(get("/api/auth/roles"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andReturn();
    }

    @Test
    void should_ReturnASuccessMessage_When_CreateRole() throws Exception {
        roles = Roles.builder().idRole(3L).name(newRole.getRoleName()).build();

        when(rolesRepository.existsByName(anyString())).thenReturn(false);
        when(rolesRepository.save(any(Roles.class))).thenReturn(roles);

        MvcResult response = this.mockMvc.perform(post("/api/auth/roles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(newRole)))
                .andExpect(status().isOk())
                .andReturn();

        assertEquals(response.getResponse().getContentAsString(), "Rol creado exitosamente");
    }

    @Test
    void should_ReturnAUser_When_GetUserByEmail() throws Exception {
        when(usuariosRepository.findByEmail(anyString())).thenReturn(Optional.ofNullable(user));

        MvcResult response = this.mockMvc.perform(get("/api/auth//email/{email}", user.getEmail()))
                .andExpect(status().isOk())
                .andReturn();

        assertNotNull(response.getResponse().getContentAsString());
    }
}