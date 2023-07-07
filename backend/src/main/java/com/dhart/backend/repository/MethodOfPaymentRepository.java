package com.dhart.backend.repository;

import com.dhart.backend.model.MethodOfPayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MethodOfPaymentRepository extends JpaRepository<MethodOfPayment, Long> {
}
