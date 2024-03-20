package com.boostmytool.StudentManagement.controllers;

import com.boostmytool.StudentManagement.models.LeaveRequest;
import com.boostmytool.StudentManagement.repositories.LeaveRequestRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class LeaveRequestController {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;


    public LeaveRequestController(LeaveRequestRepository leaveRequestRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
    }


    @SuppressWarnings("null")
    @PostMapping("/leave-request")
    public ResponseEntity<String> submitLeaveRequest(@RequestBody LeaveRequest leaveRequest) {
        try {
            leaveRequestRepository.save(leaveRequest);
            System.err.println(leaveRequest);
            System.err.println(leaveRequest.course);
            System.err.println(leaveRequest.adminid);
            
            return ResponseEntity.ok("Leave request submitted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while submitting leave request");
        }
    }


    @GetMapping("/requestresultss")
    public ResponseEntity<List<LeaveRequest>> getAllLeaveRequests() {
        List<LeaveRequest> leaveRequests = leaveRequestRepository.findAll();
        return new ResponseEntity<>(leaveRequests, HttpStatus.OK);
    }

    
    
}

