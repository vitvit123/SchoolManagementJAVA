package com.boostmytool.StudentManagement.repositories;

import com.boostmytool.StudentManagement.models.Grading;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GradingRepository extends JpaRepository<Grading, Integer> {
    // You can define custom query methods here if needed
}
