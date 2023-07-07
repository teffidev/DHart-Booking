package com.dhart.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name= "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;
    @FutureOrPresent
    private LocalDate dateStart;
    private LocalDate dateEnd;
    private Double totalPrice;
    private Boolean confirmed;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false, referencedColumnName = "id")
    @JsonIgnore
    private Product productId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnore
    private Usuarios usuario;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_method_id")
    private MethodOfPayment paymentMethodId;

}