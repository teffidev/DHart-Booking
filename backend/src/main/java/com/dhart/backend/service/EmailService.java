package com.dhart.backend.service;

import com.dhart.backend.exceptions.NotFoundException;
import com.dhart.backend.model.Product;
import com.dhart.backend.model.dto.BookingDTO;
import com.dhart.backend.model.dto.ProductDTO;
import com.dhart.backend.repository.ProductRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;


@Service
public class EmailService {

    private JavaMailSender mailSender;
    private ProductRepository productRepository;

    @Autowired
    public EmailService(JavaMailSender mailSender, ProductRepository productRepository) {
        this.mailSender = mailSender;
        this.productRepository = productRepository;
    }

    public void sendConfirmationEmail(String userMail, String token) {
        String subject = "Confirmación de registro";
        String from = "noreply@yourdomain.com";

        StringBuilder messageBuilder = new StringBuilder();
        messageBuilder.append("Para confirmar tu cuenta, por favor haz clic aquí: ")
                .append("http://localhost:8081/api/auth/confirm-account?token=").append(token);

        sendEmail(userMail, subject, from, messageBuilder.toString());
    }

    public void sendSuccessEmail(String userMail, String firstName) {
        String subject = "Registro exitoso";
        String from = "noreply@yourdomain.com";

        StringBuilder messageBuilder = new StringBuilder();
        messageBuilder.append("¡Hola ").append(firstName).append("!<br><br>")
                .append("¡Felicitaciones! Tu registro ha sido exitoso. Ahora puedes iniciar sesión en tu cuenta recién creada.<br>")
                .append("Haz clic en el siguiente enlace para iniciar sesión:<br>")
                .append("<a href=\"http://localhost:5173/Login\">Iniciar sesión</a><br><br>")
                .append("Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.<br><br>")
                .append("¡Gracias por unirte a nuestra aplicación!<br>")
                .append("Saludos,<br>")
                .append("El equipo de la aplicación");

        sendEmailWithHTML(userMail, subject, from, messageBuilder.toString());
    }

    public void sendReservationDetailsEmail(BookingDTO bookingDTO, String userMail) {
        String subject = "Detalles de la reserva";
        String from = "noreply@yourdomain.com";

        try {
            ClassPathResource resource = new ClassPathResource("templates/reservation_details.html");
            String htmlContent = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);

            // Reemplaza los marcadores de posición en el contenido HTML con los datos reales de la reserva
            htmlContent = htmlContent.replace("*|DATE_START|*", bookingDTO.getDateStart().toString());
            htmlContent = htmlContent.replace("*|DATE_END|*", bookingDTO.getDateEnd().toString());
            htmlContent = htmlContent.replace("*|PRECIO|*", bookingDTO.getTotalPrice().toString());

            // Obtén los datos del producto utilizando su ID
            Optional<Product> productOptional = productRepository.findById(bookingDTO.getProductId());
            if (productOptional.isPresent()) {
                Product product = productOptional.get();

                // Agrega los datos del producto al contenido del correo electrónico
                htmlContent = htmlContent.replace("*|PRODUCT_NAME|*", product.getTitle());
                htmlContent = htmlContent.replace("*|PRODUCT_DESCRIPTION|*", product.getDescription());
                htmlContent = htmlContent.replace("*|PRODUCT_LOCATION|*", product.getLocation());
                htmlContent = htmlContent.replace("*|PRODUCT_AUTHOR|*", product.getAuthor());
                htmlContent = htmlContent.replace("*|PRODUCT_TECHNIQUE|*", product.getTechnique());
                htmlContent = htmlContent.replace("*|PRODUCT_YEAR|*", String.valueOf(product.getYear()));

                // Verificar si hay imágenes disponibles en la lista urlList
                List<String> urlList = product.getUrlList();
                if (urlList != null && urlList.size() > 0) {
                    String imageUrl = urlList.get(0); // Obtén la URL de la imagen en la posición 0
                    if (imageUrl != null && !imageUrl.isEmpty()) {
                        htmlContent = htmlContent.replace("*|PRODUCT_IMAGE|*", imageUrl);
                    }
                }
            } else {
                throw new NotFoundException("Product not found with ID: " + bookingDTO.getProductId());
            }

            // Envía el correo electrónico al usuario
            sendEmailWithHTML(userMail, subject, from, htmlContent);
        } catch (IOException e) {
            e.printStackTrace();
            // Manejo de errores al cargar el template de detalles de reserva
        } catch (NotFoundException e) {
            e.printStackTrace();
            // Manejo de errores cuando no se encuentra el producto
        }
    }




    private void sendEmail(String to, String subject, String from, String message) {
        MimeMessage mailMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mailMessage);

        try {
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setFrom(from);
            helper.setText(message, false);
            mailSender.send(mailMessage);
        } catch (MessagingException e) {
            // Manejar la excepción de envío de correo
        }
    }


    private void sendEmailWithHTML(String to, String subject, String from, String message) {
        MimeMessage mailMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mailMessage, "utf-8");

        try {
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setFrom(from);
            helper.setText(message, true);
            mailSender.send(mailMessage);
        } catch (MessagingException e) {
            // Manejar la excepción de envío de correo
        }
    }
}
