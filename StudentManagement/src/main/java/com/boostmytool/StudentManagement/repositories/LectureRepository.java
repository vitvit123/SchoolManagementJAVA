package com.boostmytool.StudentManagement.repositories;

import com.boostmytool.StudentManagement.models.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LectureRepository extends JpaRepository<Lecture, Integer> {
    // You can add custom query methods here if needed
}
