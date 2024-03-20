package com.boostmytool.StudentManagement.controllers;

import com.boostmytool.StudentManagement.models.LeaveRequest;
import com.boostmytool.StudentManagement.repositories.LeaveRequestRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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



    @PostMapping("/approve-leave")
    public ResponseEntity<String> approveLeave(@RequestParam("leaveID") int leaveID) {
        try {
            Optional<LeaveRequest> leaveRequestOptional = leaveRequestRepository.findById(leaveID);
            if (leaveRequestOptional.isPresent()) {
                LeaveRequest leaveRequest = leaveRequestOptional.get();
                leaveRequest.setCompleted('1');
                leaveRequestRepository.save(leaveRequest);
                return ResponseEntity.ok("Leave request approved successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Leave request not found with ID: " + leaveID);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while approving leave request");
        }
    }

    @PostMapping("/reject-leave")
    public ResponseEntity<String> rejectLeave(@RequestParam("leaveID") int leaveID) {
        try {
            Optional<LeaveRequest> leaveRequestOptional = leaveRequestRepository.findById(leaveID);
            if (leaveRequestOptional.isPresent()) {
                LeaveRequest leaveRequest = leaveRequestOptional.get();
                leaveRequest.setCompleted('0'); // Set isCompleted to 0 for rejection
                leaveRequestRepository.save(leaveRequest);
                return ResponseEntity.ok("Leave request rejected successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Leave request not found with ID: " + leaveID);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while rejecting leave request");
        }
    }



    

    
    
}

