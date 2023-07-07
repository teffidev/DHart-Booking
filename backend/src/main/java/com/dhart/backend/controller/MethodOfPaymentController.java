package com.dhart.backend.controller;

import com.dhart.backend.exceptions.NotFoundException;
import com.dhart.backend.exceptions.RegisteredResourceException;
import com.dhart.backend.model.dto.MethodOfPaymentDTO;
import com.dhart.backend.service.MethodOfPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/method-of-payments")
public class MethodOfPaymentController {
    private final MethodOfPaymentService methodOfPaymentService;
    @Autowired
    public MethodOfPaymentController(MethodOfPaymentService methodOfPaymentService) {
        this.methodOfPaymentService = methodOfPaymentService;
    }

    @PostMapping
    public ResponseEntity<Void> createMethodOfPayment(@RequestBody MethodOfPaymentDTO methodOfPaymentDTO) throws RegisteredResourceException {
        methodOfPaymentService.saveMethodOfPayment(methodOfPaymentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MethodOfPaymentDTO> getMethodOfPayment(@PathVariable Long id) throws NotFoundException {
        MethodOfPaymentDTO methodOfPaymentDTO = methodOfPaymentService.getMethodOfPayment(id);
        return ResponseEntity.ok(methodOfPaymentDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMethodOfPayment(@PathVariable Long id) throws NotFoundException {
        methodOfPaymentService.deleteMethodOfPayment(id);
        return ResponseEntity.noContent().build();
    }
}

