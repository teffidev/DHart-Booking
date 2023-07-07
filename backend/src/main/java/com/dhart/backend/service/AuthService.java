package com.dhart.backend.service;

import com.dhart.backend.model.Roles;
import com.dhart.backend.model.Usuarios;
import com.dhart.backend.model.dto.DtoAuthRespuesta;
import com.dhart.backend.model.dto.DtoLogin;
import com.dhart.backend.model.dto.DtoRegistro;
import com.dhart.backend.model.dto.RoleDTO;
import com.dhart.backend.repository.IRolesRepository;
import com.dhart.backend.repository.IUsuariosRepository;
import com.dhart.backend.security.JwtGenerador;
import com.dhart.backend.security.email.VerificationToken;
import com.dhart.backend.security.email.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {
    private AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder;
    private IRolesRepository rolesRepository;
    private IUsuariosRepository usuariosRepository;
    private JwtGenerador jwtGenerador;
    private EmailService emailService;
    private VerificationTokenRepository tokenRepository;

    @Autowired
    public AuthService(
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            IRolesRepository rolesRepository,
            IUsuariosRepository usuariosRepository,
            JwtGenerador jwtGenerador,
            EmailService emailService,
            VerificationTokenRepository tokenRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.rolesRepository = rolesRepository;
        this.usuariosRepository = usuariosRepository;
        this.jwtGenerador = jwtGenerador;
        this.emailService = emailService;
        this.tokenRepository = tokenRepository;
    }

    // Método para registrar un usuario
    public ResponseEntity<String> register(DtoRegistro dtoRegistro) {
        if (usuariosRepository.existsByEmail(dtoRegistro.getEmail())) {
            return new ResponseEntity<>("El usuario ya existe, intenta con otro", HttpStatus.BAD_REQUEST);
        }

        Usuarios usuarios = new Usuarios();
        usuarios.setEmail(dtoRegistro.getEmail());
        usuarios.setPassword(passwordEncoder.encode(dtoRegistro.getPassword()));
        usuarios.setFirstName(dtoRegistro.getFirstName());
        usuarios.setLastName(dtoRegistro.getLastName());
        Roles roles = rolesRepository.findByName("USER").get();
        usuarios.setRoles(Collections.singletonList(roles));
        usuariosRepository.save(usuarios);

        // Genera un token de verificación
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(usuarios);
        verificationToken.setExpiryDate(new Date(System.currentTimeMillis() + (24 * 60 * 60 * 1000))); // Expira en 24 horas
        tokenRepository.save(verificationToken);

        // Envia un correo electrónico de confirmación
        emailService.sendConfirmationEmail(usuarios.getEmail(), token);

        return new ResponseEntity<>("EL USUARIO HA SIDO REGISTRADO EXITOSAMENTE", HttpStatus.OK);
    }

    // Método para confirmar la cuenta de usuario
    public ResponseEntity<String> confirmUserAccount(String token) {
        VerificationToken verificationToken = tokenRepository.findByToken(token);
        if (verificationToken == null) {
            return new ResponseEntity<>("El enlace es inválido o ha expirado.", HttpStatus.BAD_REQUEST);
        }

        Usuarios user = verificationToken.getUser();
        user.setEmailConfirmed(true);
        usuariosRepository.save(user);

        // Enviar el correo de registro exitoso
        emailService.sendSuccessEmail(user.getEmail(), user.getFirstName());

        try {
            ClassPathResource resource = new ClassPathResource("templates/verification_success.html");
            String htmlContent = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
            return ResponseEntity.ok().body(htmlContent);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error al cargar el template de verificación exitosa.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Método para registrar un usuario administrador
    public ResponseEntity<String> registrarAdmin(DtoRegistro dtoRegistro) {
        if (usuariosRepository.existsByEmail(dtoRegistro.getEmail())) {
            return new ResponseEntity<>("El usuario ya existe, intenta con otro", HttpStatus.BAD_REQUEST);
        }

        Usuarios usuarios = new Usuarios();
        usuarios.setEmail(dtoRegistro.getEmail());
        usuarios.setPassword(passwordEncoder.encode(dtoRegistro.getPassword()));
        usuarios.setFirstName(dtoRegistro.getFirstName());
        usuarios.setLastName(dtoRegistro.getLastName());
        Roles roles = rolesRepository.findByName("ADMIN").orElseThrow(() -> new RuntimeException("El rol ADMIN no existe"));
        usuarios.setRoles(Collections.singletonList(roles));
        usuarios.setEmailConfirmed(true); // Marcar el correo como confirmado
        usuariosRepository.save(usuarios);

        return new ResponseEntity<>("El usuario administrador ha sido registrado exitosamente", HttpStatus.OK);
    }

    // Método para iniciar sesión y obtener un token
    public ResponseEntity<?> login(DtoLogin dtoLogin) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(dtoLogin.getEmail(), dtoLogin.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Buscar al usuario en la base de datos
            String email = authentication.getName();
            Usuarios usuarios = usuariosRepository.findByEmail(email).orElse(null);

            if (usuarios != null) {
                if (!usuarios.isEmailConfirmed()) {
                    return new ResponseEntity<>("Debes confirmar tu correo electrónico antes de iniciar sesión", HttpStatus.UNAUTHORIZED);
                }

                String token = jwtGenerador.generarToken(authentication);

                Long id = usuarios.getIdUsuario();
                String firstName = usuarios.getFirstName();
                String lastName = usuarios.getLastName();
                String role = usuarios.getRoles().get(0).getName();  // suponiendo que un usuario tiene solo un rol

                // Extraer las iniciales
                String initials = (firstName.substring(0, 1) + lastName.substring(0, 1)).toUpperCase();
                String userEmail = usuarios.getEmail();

                DtoAuthRespuesta respuesta = new DtoAuthRespuesta(token, firstName, lastName, role, initials, id);
                respuesta.setUserEmail(userEmail);

                return new ResponseEntity<>(respuesta, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Usuario no encontrado", HttpStatus.UNAUTHORIZED);
            }
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>("Credenciales incorrectas", HttpStatus.UNAUTHORIZED);
        }
    }

    // Método para validar un token de autenticación
    public ResponseEntity<?> validateToken(String token) {
        // Removiendo el prefijo "Bearer " del token
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // Validar el token
        Boolean tokenValido = jwtGenerador.validarToken(token);
        if (!tokenValido) {
            return new ResponseEntity<>("Token inválido", HttpStatus.UNAUTHORIZED);
        }

        // Autenticar el usuario basado en el token
        String email = jwtGenerador.obtenerUsernameDeJwt(token);
        Usuarios usuarios = usuariosRepository.findByEmail(email).orElse(null);

        if (usuarios != null) {
            Long id = usuarios.getIdUsuario();
            String firstName = usuarios.getFirstName();
            String lastName = usuarios.getLastName();
            String role = usuarios.getRoles().get(0).getName();  // suponiendo que un usuario tiene solo un rol
            String initials = (firstName.substring(0, 1) + lastName.substring(0, 1)).toUpperCase();

            String userEmail = usuarios.getEmail();
            DtoAuthRespuesta respuesta = new DtoAuthRespuesta(token, firstName, lastName, role, initials, id);
            respuesta.setUserEmail(userEmail); // Agregar el email a la respuesta

            return new ResponseEntity<>(respuesta, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Usuario no encontrado", HttpStatus.UNAUTHORIZED);
        }
    }

    // Método para obtener todos los usuarios
    public ResponseEntity<List<Usuarios>> getAllUsers() {
        List<Usuarios> usuarios = usuariosRepository.findAll();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    // Método para obtener todos los roles
    public ResponseEntity<List<Roles>> getAllRoles() {
        List<Roles> roles = rolesRepository.findAll();
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }

    // Método para crear un nuevo rol
    public ResponseEntity<String> createRole(RoleDTO roleDTO) {
        String roleName = roleDTO.getRoleName();
        if (rolesRepository.existsByName(roleName)) {
            return new ResponseEntity<>("El rol ya existe, intenta con otro", HttpStatus.BAD_REQUEST);
        }
        Roles role = new Roles();
        role.setName(roleName);
        rolesRepository.save(role);
        return new ResponseEntity<>("Rol creado exitosamente", HttpStatus.OK);
    }

    // Método para actualizar el rol de un usuario
    public ResponseEntity<String> updateUserRole(Long id, RoleDTO roleDTO) {
        Usuarios user = usuariosRepository.findById(id).orElse(null);
        if (user == null) {
            return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }
        Roles role = rolesRepository.findByName(roleDTO.getRoleName()).orElse(null);
        if (role == null) {
            return new ResponseEntity<>("Rol no encontrado", HttpStatus.NOT_FOUND);
        }
        user.getRoles().clear(); // Limpia los roles existentes
        user.getRoles().add(role); // Agrega el nuevo rol
        usuariosRepository.save(user);
        return new ResponseEntity<>("Rol de usuario actualizado exitosamente", HttpStatus.OK);
    }

    // Método para obtener un usuario por su correo electrónico
    public ResponseEntity<Usuarios> getUserByEmail(String email) {
        Optional<Usuarios> user = usuariosRepository.findByEmail(email);
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
