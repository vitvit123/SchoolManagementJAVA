package com.boostmytool.StudentManagement.repositories;

import com.boostmytool.StudentManagement.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    Student findByFullnameAndPassword(String fullname, String password);
    
}
