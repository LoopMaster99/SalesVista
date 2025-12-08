package com.app.repository;

import com.app.model.SalesRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesRepository extends MongoRepository<SalesRecord, String> {
    // Spring Data MongoDB will automatically implement basic CRUD operations
    // Custom query methods can be added here if needed
}
