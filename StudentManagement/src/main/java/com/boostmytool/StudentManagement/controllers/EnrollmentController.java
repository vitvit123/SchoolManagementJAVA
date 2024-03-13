package com.boostmytool.StudentManagement.controllers;

import com.boostmytool.StudentManagement.models.Enrollment;
import com.boostmytool.StudentManagement.models.StudySchedule;
import com.boostmytool.StudentManagement.models.Course;
import com.boostmytool.StudentManagement.repositories.EnrollmentRepository;
import com.boostmytool.StudentManagement.repositories.CourseRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.boostmytool.StudentManagement.repositories.StudyScheduleRepository; // Import StudyScheduleRepository

@RestController
@RequestMapping("/enrollments")
public class EnrollmentController {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final StudyScheduleRepository studyScheduleRepository; // Add StudyScheduleRepository

    public EnrollmentController(EnrollmentRepository enrollmentRepository, 
                                 CourseRepository courseRepository,
                                 StudyScheduleRepository studyScheduleRepository) { // Modify constructor
        this.enrollmentRepository = enrollmentRepository;
        this.courseRepository = courseRepository;
        this.studyScheduleRepository = studyScheduleRepository; // Initialize StudyScheduleRepository
    }

    @SuppressWarnings("null")
    @PostMapping
    public ResponseEntity<String> createEnrollment(@RequestBody Enrollment enrollment) {
        try {

            Course course = enrollment.getCourse();
            if (course != null && course.getId() == null) {
                courseRepository.save(course);
            }

            StudySchedule studyTime = enrollment.getStudyTime();
                studyScheduleRepository.save(studyTime);
            

            enrollmentRepository.save(enrollment);

            // Return a success response
            return ResponseEntity.ok("Enrollment created successfully");
        } catch (Exception e) {
            // Log the exception for debugging
            e.printStackTrace();

            // Return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while creating enrollment: " + e.getMessage());
        }
    }
}
