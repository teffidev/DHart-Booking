package com.dhart.backend.controller;

import com.dhart.backend.exceptions.NotFoundException;
import com.dhart.backend.exceptions.RegisteredResourceException;
import com.dhart.backend.model.dto.BookingDTO;
import com.dhart.backend.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<BookingDTO>> getAllBookingsByProduct(@PathVariable Long productId){
        try{
            List<BookingDTO> bookings = bookingService.findAllByProduct(productId);
            return ResponseEntity.ok(bookings);
        } catch (RegisteredResourceException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/user/{usuarioId}")
    public ResponseEntity<List<BookingDTO>> getAllBookingsByUser(@PathVariable Long usuarioId){
        try{
            List<BookingDTO> bookings = bookingService.findAllByUser(usuarioId);
            return ResponseEntity.ok(bookings);
        } catch (RegisteredResourceException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/unavailable-dates/{productId}")
    public ResponseEntity<List<LocalDate>> getAllUnavailableDatesByProduct(@PathVariable Long productId) {
        try {
            List<LocalDate> unavailableDates = bookingService.getAllUnavailableDatesByProduct(productId);
            return ResponseEntity.ok(unavailableDates);
        } catch (RegisteredResourceException e) {
            throw new RuntimeException(e);
        }
    }
    @PostMapping
    public ResponseEntity<String> saveBooking(@RequestBody BookingDTO bookingDTO) {
        try {
            bookingService.saveBooking(bookingDTO);
            return ResponseEntity.ok("Booking saved successfully.");
        } catch (RegisteredResourceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Booking is not available");
        }
    }

    @GetMapping
    public List<BookingDTO> findAllBookings() throws RegisteredResourceException {
        return bookingService.findAllBookings();
    }

    @PutMapping("/{bookingId}")
    public ResponseEntity<String> updateBooking(@PathVariable Long bookingId,
                                                @RequestBody BookingDTO updatedBookingDTO) {
        try {
            bookingService.updateBooking(bookingId, updatedBookingDTO);
            return ResponseEntity.ok("Booking updated successfully");
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBooking(@PathVariable Long id) throws NotFoundException {
        bookingService.deleteBooking(id);
    }
}