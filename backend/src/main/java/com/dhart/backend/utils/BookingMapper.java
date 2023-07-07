package com.dhart.backend.utils;

import com.dhart.backend.model.Booking;
import com.dhart.backend.model.MethodOfPayment;
import com.dhart.backend.model.Product;
import com.dhart.backend.model.Usuarios;
import com.dhart.backend.model.dto.BookingDTO;
import com.dhart.backend.model.dto.MethodOfPaymentDTO;

public class BookingMapper {
    public static Booking bookingDtoToBooking(Long id, BookingDTO bookingDTO){
        Product product = Product.builder()
                .id(bookingDTO.getProductId())
                .build();

        Usuarios usuario = Usuarios.builder()
                .idUsuario(bookingDTO.getUsuarioId())
                .build();

        MethodOfPayment payment = MethodOfPayment.builder()
                .id(bookingDTO.getPaymentMethodId())
                .build();


        Booking booking = Booking.builder()
                .id(id)
                .dateStart(bookingDTO.getDateStart())
                .dateEnd(bookingDTO.getDateEnd())
                .totalPrice(bookingDTO.getTotalPrice())
                .confirmed(bookingDTO.getConfirmed())
                .productId(product)
                .usuario(usuario)
                .paymentMethodId(payment)
                .build();
        return booking;
    }

    public static BookingDTO bookingToBookingDto(Booking booking){
        BookingDTO bookingDTO = BookingDTO.builder()
                .id(booking.getId())
                .dateStart(booking.getDateStart())
                .dateEnd(booking.getDateEnd())
                .totalPrice(booking.getTotalPrice())
                .confirmed(booking.getConfirmed())
                .productId(booking.getProductId().getId())
                .usuarioId(booking.getUsuario().getIdUsuario())
                .paymentMethodId(booking.getPaymentMethodId().getId())
                .build();
        return bookingDTO;
    }
}
