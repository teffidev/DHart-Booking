package com.dhart.backend.service;

import com.dhart.backend.exceptions.NotFoundException;
import com.dhart.backend.exceptions.RegisteredResourceException;
import com.dhart.backend.model.MethodOfPayment;
import com.dhart.backend.model.dto.MethodOfPaymentDTO;
import com.dhart.backend.repository.MethodOfPaymentRepository;
import com.dhart.backend.utils.MethodOfPaymentMapper;
import org.springframework.stereotype.Service;

@Service
public class MethodOfPaymentService {
    private final MethodOfPaymentRepository methodOfPaymentRepository;

    public MethodOfPaymentService(MethodOfPaymentRepository methodOfPaymentRepository) {
        this.methodOfPaymentRepository = methodOfPaymentRepository;
    }

    public void saveMethodOfPayment(MethodOfPaymentDTO paymentDTO) throws RegisteredResourceException {
        MethodOfPayment payment = MethodOfPaymentMapper.paymentDTOToPayment(null, paymentDTO);
        methodOfPaymentRepository.save(payment);
        System.out.println(payment);
    }

    public MethodOfPaymentDTO getMethodOfPayment(Long id) throws NotFoundException {
        MethodOfPayment methodOfPayment = methodOfPaymentRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Method of payment not found with id: " + id));

        return MethodOfPaymentMapper.paymentToPaymentDTO(methodOfPayment);
    }

    public void deleteMethodOfPayment(Long id) throws NotFoundException {
        MethodOfPayment methodOfPayment = methodOfPaymentRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Method of payment not found with id: " + id));

        methodOfPaymentRepository.deleteById(id);
    }
}

