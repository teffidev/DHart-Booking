package com.dhart.backend.controller;

import com.dhart.backend.model.Roles;
import com.dhart.backend.model.Usuarios;
import com.dhart.backend.model.dto.DtoLogin;
import com.dhart.backend.model.dto.DtoRegistro;
import com.dhart.backend.model.dto.RoleDTO;
import com.dhart.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/auth/")
@CrossOrigin(origins = "*")
public class RestControllerAuth {
    private AuthService authService;

    @Autowired
    public RestControllerAuth(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("register")
    // Registra un nuevo usuario
    public ResponseEntity<String> register(@RequestBody DtoRegistro dtoRegistro) {
        return authService.register(dtoRegistro);
    }

    @GetMapping("/confirm-account")
    // Confirma la cuenta de un usuario mediante un token
    public ResponseEntity<String> confirmUserAccount(@RequestParam("token") String token) {
        return authService.confirmUserAccount(token);
    }

    @PostMapping("registerAdm")
    // Registra un nuevo usuario con rol de administrador
    public ResponseEntity<String> registrarAdmin(@RequestBody DtoRegistro dtoRegistro) {
        return authService.registrarAdmin(dtoRegistro);
    }

    @PostMapping("login")
    // Inicia sesión y devuelve un token de autenticación
    public ResponseEntity<?> login(@RequestBody DtoLogin dtoLogin) {
        return authService.login(dtoLogin);
    }

    @PostMapping("validateToken")
    // Valida un token de autenticación
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String token) {
        return authService.validateToken(token);
    }

    @GetMapping("users")
    // Obtiene todos los usuarios registrados
    public ResponseEntity<List<Usuarios>> getAllUsers() {
        return authService.getAllUsers();
    }

    @GetMapping("roles")
    // Obtiene todos los roles disponibles
    public ResponseEntity<List<Roles>> getAllRoles() {
        return authService.getAllRoles();
    }

    @PostMapping("roles")
    // Crea un nuevo rol
    public ResponseEntity<String> createRole(@RequestBody RoleDTO roleDTO) {
        return authService.createRole(roleDTO);
    }

    @PutMapping("users/{id}/role")
    // Actualiza el rol de un usuario
    public ResponseEntity<String> updateUserRole(@PathVariable Long id, @RequestBody RoleDTO roleDTO) {
        return authService.updateUserRole(id, roleDTO);
    }

    @GetMapping("/email/{email}")
    // Obtiene un usuario por su dirección de correo electrónico
    public ResponseEntity<Usuarios> getUserByEmail(@PathVariable String email) {
        return authService.getUserByEmail(email);
    }
}
