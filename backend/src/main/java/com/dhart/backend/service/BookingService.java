package com.dhart.backend.service;

import com.dhart.backend.exceptions.NotFoundException;
import com.dhart.backend.exceptions.RegisteredResourceException;
import com.dhart.backend.model.Booking;
import com.dhart.backend.model.MethodOfPayment;
import com.dhart.backend.model.Product;
import com.dhart.backend.model.Usuarios;
import com.dhart.backend.model.dto.BookingDTO;
import com.dhart.backend.repository.BookingRepository;
import com.dhart.backend.repository.IUsuariosRepository;
import com.dhart.backend.repository.ProductRepository;
import com.dhart.backend.utils.BookingMapper;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final EntityManager em;
    private final EmailService emailService;
    private final IUsuariosRepository usuariosRepository; // Inyecta o instancia el repositorio IUsuariosRepository
    private final ProductRepository productRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository, EntityManager em, EmailService emailService, IUsuariosRepository usuariosRepository, ProductRepository productRepository) {
        this.bookingRepository = bookingRepository;
        this.em = em;
        this.emailService = emailService;
        this.usuariosRepository = usuariosRepository;
        this.productRepository = productRepository;
    }


    public List<BookingDTO> findAllByProduct(Long productId) throws RegisteredResourceException {
        List<Booking> bookings = bookingRepository.findAllByProduct(productId);
        List<BookingDTO> bookingDTOList = new ArrayList<>();

        for (Booking booking : bookings) {
            BookingDTO bookingDTO = BookingMapper.bookingToBookingDto(booking);
            bookingDTOList.add(bookingDTO);
        }

        return bookingDTOList;
    }

    public List<BookingDTO> findAllByUser(Long usuarioId) throws RegisteredResourceException {
        List<Booking> bookings = bookingRepository.findAllByUser(usuarioId);
        List<BookingDTO> bookingDTOList = new ArrayList<>();

        for (Booking booking : bookings) {
            BookingDTO bookingDTO = BookingMapper.bookingToBookingDto(booking);
            bookingDTOList.add(bookingDTO);
        }

        return bookingDTOList;
    }


    public List<LocalDate> getAllDates(Booking booking)throws RegisteredResourceException {
        LocalDate dateStart = booking.getDateStart();
        LocalDate dateEnd = booking.getDateEnd();

        List<LocalDate> allDates = new ArrayList<>();
        LocalDate acurrentDate = dateStart;

        while (!acurrentDate.isAfter(dateEnd)){
            allDates.add(acurrentDate);
            acurrentDate = acurrentDate.plusDays(1);
        }

        return  allDates;
    }

    public List<LocalDate> getAllUnavailableDatesByProduct(Long id) throws RegisteredResourceException{
        List<Booking> bookings = bookingRepository.findAllByProduct(id);
        List<LocalDate> unavailableDates = new ArrayList<>();

        for (Booking booking : bookings) {
            List<LocalDate> bookingDates = getAllDates(booking);
            unavailableDates.addAll(bookingDates);

        }
        return unavailableDates;
    }

    private String getUserEmailById(Long userId) {
        Optional<Usuarios> usuarioOptional = usuariosRepository.findById(userId);
        if (usuarioOptional.isPresent()) {
            Usuarios usuario = usuarioOptional.get();
            return usuario.getEmail();
        }
        return null; // Manejo de usuario no encontrado
    }



    public void saveBooking(BookingDTO bookingDTO) throws RegisteredResourceException {
        Booking booking = BookingMapper.bookingDtoToBooking(null, bookingDTO);
        booking.setUsuario(em.getReference(Usuarios.class, bookingDTO.getUsuarioId()));

        try {
            Product product = productRepository.findById(bookingDTO.getProductId())
                    .orElseThrow(() -> new NotFoundException("Product not found with ID: " + bookingDTO.getProductId()));
            booking.setProductId(product);

            List<LocalDate> incomingDates = getAllDates(booking);
            Long productId = booking.getProductId().getId();
            List<LocalDate> existingBookings = getAllUnavailableDatesByProduct(productId);

            boolean areDatesDifferent = true;

            for (LocalDate incomingDate : incomingDates) {
                if (existingBookings.contains(incomingDate)) {
                    areDatesDifferent = false; // Se encontró una fecha que ya está reservada
                    break;
                }
            }

            if (areDatesDifferent) {
                bookingRepository.save(booking);

                // Obtén el correo electrónico del usuario utilizando el ID proporcionado en el BookingDTO
                String userMail = getUserEmailById(bookingDTO.getUsuarioId());

                // Envía el correo electrónico con el resumen de la reserva al usuario
                emailService.sendReservationDetailsEmail(bookingDTO, userMail);
            } else {
                throw new RegisteredResourceException("Dates are not available");
            }
        } catch (NotFoundException e) {
            // Manejo de la excepción NotFoundException
            // Puedes agregar el código de manejo de excepciones aquí, como registrar el error, enviar una respuesta de error, etc.
            e.printStackTrace(); // Ejemplo: Imprimir la traza de la excepción
            throw new RegisteredResourceException("Product not found"); // Ejemplo: Lanzar una nueva excepción
        }
    }


    public List<BookingDTO> findAllBookings() throws RegisteredResourceException{
        List<Booking> bookings = bookingRepository.findAll();
        List<BookingDTO> bookingDTOList = new ArrayList<BookingDTO>();
        for(Booking booking: bookings) {
            BookingDTO bookingDTO = BookingMapper.bookingToBookingDto(booking);
            bookingDTOList.add(bookingDTO);
        }
        return bookingDTOList;
    }

    public void updateBooking(Long bookingId, BookingDTO updatedBookingDTO) throws NotFoundException {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new NotFoundException("Booking" + bookingId + "was not found" ));

        booking.setDateStart(updatedBookingDTO.getDateStart());
        booking.setDateEnd(updatedBookingDTO.getDateEnd());
        booking.setTotalPrice(updatedBookingDTO.getTotalPrice());
        booking.setConfirmed(updatedBookingDTO.getConfirmed());

        bookingRepository.save(booking);
    }



    public void deleteBooking(Long id) throws NotFoundException {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found with id: " + id));
        bookingRepository.deleteById(id);
    }


}