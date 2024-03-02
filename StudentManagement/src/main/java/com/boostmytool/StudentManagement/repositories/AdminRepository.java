package com.boostmytool.StudentManagement.repositories;

import com.boostmytool.StudentManagement.models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    // Admin findByUsernameAndPassword(String username, String password);
}
