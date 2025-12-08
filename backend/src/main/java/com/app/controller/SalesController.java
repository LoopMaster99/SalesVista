package com.app.controller;

import com.app.model.SalesQueryParams;
import com.app.service.SalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/sales")
public class SalesController {

    @Autowired
    private SalesService salesService;

    @GetMapping
    public Map<String, Object> getSales(@ModelAttribute SalesQueryParams params) {
        return salesService.getFilteredSales(params);
    }
}
