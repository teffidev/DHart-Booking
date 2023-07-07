package com.dhart.backend.utils;

import com.dhart.backend.model.Booking;
import com.dhart.backend.model.MethodOfPayment;
import com.dhart.backend.model.dto.BookingDTO;
import com.dhart.backend.model.dto.MethodOfPaymentDTO;

public class MethodOfPaymentMapper {

    public static MethodOfPayment paymentDTOToPayment (Long id, MethodOfPaymentDTO methodOfPaymentDTO){



        MethodOfPayment methodOfPayment= MethodOfPayment.builder()
                .id(id)
                .name(methodOfPaymentDTO.getName())
                .build();

        return methodOfPayment;
    }

    public static MethodOfPaymentDTO paymentToPaymentDTO (MethodOfPayment methodOfPayment){

        MethodOfPaymentDTO methodOfPaymentDTO = MethodOfPaymentDTO.builder()
                .id(methodOfPayment.getId())
                .name(methodOfPayment.getName())
                .build();
        return methodOfPaymentDTO;
    }
}
