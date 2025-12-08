package com.app.model;

import lombok.Data;
import java.util.List;

@Data
public class SalesQueryParams {
    private String search; // matches name or phone

    // Filters (Multi-select)
    private List<String> regions;
    private List<String> genders;
    private List<String> categories;
    private List<String> paymentMethods;
    private List<String> tags;
    private List<String> ageRanges; // ["0-18", "19-30"]
    private List<String> dateRanges; // ["today", "last-month"]

    // Ranges
    private Integer minAge;
    private Integer maxAge;
    private String startDate; // yyyy-MM-dd
    private String endDate; // yyyy-MM-dd

    // Sorting
    private String sortBy; // date, quantity, customerName
    private String sortOrder; // asc, desc (default desc for date)

    // Pagination
    private int page = 1;
    private int limit = 10;
}
