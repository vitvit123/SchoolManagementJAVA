package com.boostmytool.StudentManagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.boostmytool.StudentManagement.models.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
}