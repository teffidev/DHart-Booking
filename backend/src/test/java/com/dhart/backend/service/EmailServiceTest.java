package com.dhart.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EmailServiceTest {

    @Mock
    private JavaMailSender mailSender;

    @InjectMocks
    private EmailService emailService;

    @BeforeEach
    public void setup() {
        emailService = new EmailService(mailSender);
    }

    @Test
    public void testSendConfirmationEmail() {
        String userMail = "test@example.com";
        String token = "testToken";

        emailService.sendConfirmationEmail(userMail, token);

        String expectedSubject = "Confirmación de registro";
        String expectedFrom = "noreply@yourdomain.com";
        String expectedMessage = "Para confirmar tu cuenta, por favor haz clic aquí: http://localhost:8081/api/auth/confirm-account?token=testToken";
        verify(mailSender, times(1)).send(any(SimpleMailMessage.class));

    }
    @Test
    public void testSendSuccessEmail() {
        String userMail = "test@example.com";
        String firstName = "John";

        emailService.sendSuccessEmail(userMail, firstName);

        String expectedSubject = "Registro exitoso";
        String expectedFrom = "noreply@yourdomain.com";
        String expectedMessage = "¡Hola John!\n\n¡Felicitaciones! Tu registro ha sido exitoso. Ahora puedes iniciar sesión en tu cuenta recién creada.\n" +
                "Haz clic en el siguiente enlace para iniciar sesión:\n" +
                "http://localhost:5173/Login\n\n" +
                "Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.\n\n" +
                "¡Gracias por unirte a nuestra aplicación!\n" +
                "Saludos,\n" +
                "El equipo de la aplicación";
        verify(mailSender, times(1)).send(any(SimpleMailMessage.class));

    }
}
