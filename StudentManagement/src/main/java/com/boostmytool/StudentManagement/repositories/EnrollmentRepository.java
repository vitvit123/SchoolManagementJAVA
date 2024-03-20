package com.boostmytool.StudentManagement.repositories;

import com.boostmytool.StudentManagement.models.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
    List<Enrollment> findByLecturerLecturerId(int lecturerId);
    // List<Enrollment> findByStudentStudentID(int studentId);
}
