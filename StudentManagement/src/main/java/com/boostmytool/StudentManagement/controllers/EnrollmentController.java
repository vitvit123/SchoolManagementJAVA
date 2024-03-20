package com.boostmytool.StudentManagement.controllers;

import com.boostmytool.StudentManagement.models.Enrollment;
import com.boostmytool.StudentManagement.models.StudySchedule;
import com.boostmytool.StudentManagement.models.Course;
import com.boostmytool.StudentManagement.repositories.EnrollmentRepository;
import com.boostmytool.StudentManagement.repositories.CourseRepository;
import com.boostmytool.StudentManagement.repositories.StudyScheduleRepository;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/enrollments")
public class EnrollmentController {

    private final EnrollmentRepository enrollmentRepository;
    private final StudyScheduleRepository studyScheduleRepository;
    private final CourseRepository courseRepository;


    public EnrollmentController(EnrollmentRepository enrollmentRepository,
                                 StudyScheduleRepository studyScheduleRepository,
                                 CourseRepository courseRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.studyScheduleRepository = studyScheduleRepository;
        this.courseRepository = courseRepository;
    }

    @SuppressWarnings("null")
    @PostMapping
    public ResponseEntity<String> createEnrollment(@RequestBody Enrollment enrollment) {
        try {
            // Save study schedule
            StudySchedule studyTime = enrollment.getStudyTime();
            studyScheduleRepository.save(studyTime);

            // Check if course is associated with enrollment
            Course course = enrollment.getCourse();
            if (course != null && course.getId() == null) {
                // If the course ID is null, save the course explicitly
                course = courseRepository.save(course);
                enrollment.setCourse(course);
            }

            // Save enrollment
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


    @GetMapping("/fetchrequestpermission/{lecturerId}")
    public ResponseEntity<List<Enrollment>> getPermissionsByLecturerId(@PathVariable int lecturerId) {
        List<Enrollment> enrollments = enrollmentRepository.findByLecturerLecturerId(lecturerId);
        if (!enrollments.isEmpty()) {
            return ResponseEntity.ok(enrollments);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    // @GetMapping("/fetchrequestpermissionforstudent/{studentId}")
    // public ResponseEntity<List<Enrollment>> getPermissionsByStudentID(@PathVariable int studentId){
    //     List<Enrollment> enrollments = enrollmentRepository.findByStudentStudentID(studentId);
    //         return ResponseEntity.ok(enrollments);
    // }

    
    
    

    
    
    
}