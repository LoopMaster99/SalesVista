package com.app.data;

import com.app.model.SalesRecord;
import com.app.repository.SalesRepository;
import com.app.util.CsvParser;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataLoader {

    @Autowired
    private CsvParser csvParser;

    @Autowired
    private SalesRepository salesRepository;

    @PostConstruct
    public void loadData() {
        // Only import CSV if database is empty
        long count = salesRepository.count();
        if (count == 0) {
            System.out.println("Database is empty. Loading sales data from CSV...");
            List<SalesRecord> salesRecords = csvParser.loadSalesData("data/sales.csv");

            System.out.println("Importing " + salesRecords.size() + " records to MongoDB...");
            System.out.println("This may take 2-5 minutes. Please wait...");

            // Save all records to MongoDB (batch insert)
            salesRepository.saveAll(salesRecords);

            System.out.println("Successfully imported " + salesRecords.size() + " records to MongoDB!");
        } else {
            System.out.println("Database already contains " + count + " records. Skipping CSV import.");
        }
    }
}
