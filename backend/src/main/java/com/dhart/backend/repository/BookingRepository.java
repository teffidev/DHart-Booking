package com.dhart.backend.repository;

import com.dhart.backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {



    @Query("FROM Booking b WHERE b.productId.id = :productId")
    List<Booking> findAllByProduct(@Param("productId") Long id);

    @Query("SELECT b FROM Booking b WHERE b.usuario.idUsuario = :userId")
    List<Booking> findAllByUser(Long userId);

}