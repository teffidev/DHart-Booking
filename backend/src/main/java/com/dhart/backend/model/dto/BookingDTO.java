package com.dhart.backend.model.dto;

import com.dhart.backend.model.MethodOfPayment;
import com.dhart.backend.model.Product;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class BookingDTO {
    private Long id;
    private LocalDate dateStart;
    private LocalDate dateEnd;
    private Double totalPrice;
    private Product product; // Utiliza la clase Product en lugar de DTOproduct
    private Boolean confirmed;
    private Long productId;
    private Long usuarioId;
    private Long paymentMethodId;


}
