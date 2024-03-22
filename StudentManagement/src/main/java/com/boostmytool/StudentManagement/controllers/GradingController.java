package com.boostmytool.StudentManagement.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.boostmytool.StudentManagement.models.Course;
import com.boostmytool.StudentManagement.models.Grading;
import com.boostmytool.StudentManagement.models.Student;
import com.boostmytool.StudentManagement.repositories.CourseRepository;
import com.boostmytool.StudentManagement.repositories.GradingRepository;
import com.boostmytool.StudentManagement.repositories.StudentRepository;

@Controller
public class GradingController {

    @Autowired
    private GradingRepository gradingRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @PostMapping("/approvepermission")
    public double insertGradingWithAttendanceAndCourse(@RequestParam("studentId") Long studentId,
                                                     @RequestParam("subject") Long subject) {
        // Retrieve the Student and Course objects
        Student student = studentRepository.findById(studentId.intValue()).orElse(null);
        Course course = courseRepository.findById(subject).orElse(null);

        if (student != null && course != null) {
            // Create a new Grading object
            Grading grading = new Grading();
            grading.setAttendance(1.0); // Assuming default attendance
            grading.setStudent(student);
            grading.setCourse(course);

            // Save the Grading object
            gradingRepository.save(grading);
        } else {
         
        }
        return 0.1;
    }



    @PostMapping("/rejectpermission")
    public void rejectPermission(@RequestParam("studentId") Long studentId,
                                                     @RequestParam("subject") Long subject) {
        // Retrieve the Student and Course objects
        Student student = studentRepository.findById(studentId.intValue()).orElse(null);
        Course course = courseRepository.findById(subject).orElse(null);

        if (student != null && course != null) {
            // Create a new Grading object
            Grading grading = new Grading();
            grading.setAttendance(0.0); 
            grading.setStudent(student);
            grading.setCourse(course);
            gradingRepository.save(grading);
            
        } 
        else {
        
        }
        
    }



    @PostMapping("/permissionpermission")
    public void permissionpermission(@RequestParam("studentId") Long studentId,
                                                     @RequestParam("subject") Long subject) {
        // Retrieve the Student and Course objects
        Student student = studentRepository.findById(studentId.intValue()).orElse(null);
        Course course = courseRepository.findById(subject).orElse(null);

        if (student != null && course != null) {
            Grading grading = new Grading();
            grading.setAttendance(2.0); 
            grading.setStudent(student);
            grading.setCourse(course);

         
            gradingRepository.save(grading);
        } else {
           
        }
    }



}
