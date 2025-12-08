package com.app.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "sales")
public class SalesRecord {
    @Id
    private String id;
    @JsonProperty("Transaction ID")
    private String transactionId;

    @JsonProperty("Date")
    @Indexed
    private String date; // Keeping as String for simple sorting/parsing, can be LocalDate

    @JsonProperty("Customer ID")
    private String customerId;

    @JsonProperty("Customer Name")
    private String customerName;

    @JsonProperty("Phone Number")
    private String phoneNumber;

    @JsonProperty("Gender")
    @Indexed
    private String gender;

    @JsonProperty("Age")
    private Integer age;

    @JsonProperty("Customer Region")
    @Indexed
    private String customerRegion;

    @JsonProperty("Customer Type")
    private String customerType;

    @JsonProperty("Product ID")
    private String productId;

    @JsonProperty("Product Name")
    private String productName;

    @JsonProperty("Brand")
    private String brand;

    @JsonProperty("Product Category")
    @Indexed
    private String productCategory;

    @JsonProperty("Tags")
    private String tags;

    @JsonProperty("Quantity")
    private Integer quantity;

    @JsonProperty("Price per Unit")
    private Double pricePerUnit;

    @JsonProperty("Discount Percentage")
    private Double discountPercentage;

    @JsonProperty("Total Amount")
    private Double totalAmount;

    @JsonProperty("Final Amount")
    private Double finalAmount;

    @JsonProperty("Payment Method")
    @Indexed
    private String paymentMethod;

    @JsonProperty("Order Status")
    private String orderStatus;

    @JsonProperty("Delivery Type")
    private String deliveryType;

    @JsonProperty("Store ID")
    private String storeId;

    @JsonProperty("Store Location")
    private String storeLocation;

    @JsonProperty("Salesperson ID")
    private String salespersonId;

    @JsonProperty("Employee Name")
    private String employeeName;
}
