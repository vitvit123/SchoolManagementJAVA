package com.boostmytool.StudentManagement.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.boostmytool.StudentManagement.repositories.StudentRepository;
import com.boostmytool.StudentManagement.models.Student;
import java.util.Optional;


@RestController
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/Student")
    public List<Student> getStudents() {
        return studentRepository.findAll();
    }
    @GetMapping("/studentss/{studentId}")
    public ResponseEntity<Student> getStudentById(@PathVariable int studentId) {
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        if (studentOptional.isPresent()) {
            return ResponseEntity.ok(studentOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
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

    @DeleteMapping("/deleteStudent/{studentId}")
    public ResponseEntity<String> deleteStudent(@PathVariable int studentId) {
        try {
            studentRepository.deleteById(studentId);
            return ResponseEntity.ok("Student deleted successfully");
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete student");
        }
    }

    @PutMapping("/updateStudent/{studentId}")
    public ResponseEntity<String> updateStudent(@PathVariable int studentId, @RequestBody Student updatedStudent) {
        try {
            // Fetch the existing student record
            Optional<Student> existingStudentOptional = studentRepository.findById(studentId);

            if (existingStudentOptional.isPresent()) {
                Student existingStudent = existingStudentOptional.get();

                // Update the existing student record with the new data
                existingStudent.setFullname(updatedStudent.getFullname());
                existingStudent.setAddress(updatedStudent.getAddress());
                existingStudent.setDob(updatedStudent.getDob());
                existingStudent.setEmail(updatedStudent.getEmail());
                existingStudent.setParentName(updatedStudent.getParentName());
                existingStudent.setParentPhoneNumber(updatedStudent.getParentPhoneNumber());
                existingStudent.setPassword(updatedStudent.getPassword());
                existingStudent.setProfile(updatedStudent.getProfile());
                existingStudent.setStudentPhoneNumber(updatedStudent.getStudentPhoneNumber());

                studentRepository.save(existingStudent);

                return ResponseEntity.ok("Student updated successfully");
            } else {
                return ResponseEntity.notFound().build(); // Student not found with the given ID
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update student");
        }
    }



    
}
