package com.boostmytool.StudentManagement.controllers;

// import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import com.boostmytool.StudentManagement.repositories.StudentRepository;
import com.boostmytool.StudentManagement.models.Student;
import java.util.List;

@RestController
public class StudentController<models> {

    @Autowired
    private StudentRepository studentRepository;


    @GetMapping("/Student")
    public List<Student> getStudents() {
        return studentRepository.findAll();
    }

    @PostMapping("/saveStudent")
    @ResponseBody
    public ResponseEntity<String> saveStudent(@RequestBody Student student) {
        if (student != null && isStudentValid(student)) {
            try {
                studentRepository.save(student);
                return ResponseEntity.ok("Student data saved successfully");
            } catch (Exception e) {
                e.printStackTrace(); // Log the exception for debugging
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save student data");
            }
        } else {
            return ResponseEntity.badRequest().body("Invalid student data. Please ensure all fields are filled.");
        }
    }
    private boolean isStudentValid(Student student) {
        return student.getFullname() != null &&
                !student.getFullname().isEmpty() &&
                student.getEmail() != null &&
                !student.getEmail().isEmpty() &&
                student.getDob() != null &&
                !student.getDob().isEmpty() &&
                student.getAddress() != null &&
                !student.getAddress().isEmpty() &&
                student.getProfile() != null &&
                !student.getProfile().isEmpty() &&
                student.getStudentPhoneNumber() != null &&
                !student.getStudentPhoneNumber().isEmpty() &&
                student.getParentName() != null &&
                !student.getParentName().isEmpty() &&
                student.getParentPhoneNumber() != null &&
                !student.getParentPhoneNumber().isEmpty() &&
                student.getPassword() != null &&
                !student.getPassword().isEmpty();
    }

}
