package com.boostmytool.StudentManagement.repositories;

import com.boostmytool.StudentManagement.models.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Integer> {
}
