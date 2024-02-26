package com.boostmytool.StudentManagement.controllers;

import com.boostmytool.StudentManagement.models.Course;
import com.boostmytool.StudentManagement.repositories.CourseRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CourseController {

    private final CourseRepository courseRepository;

    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @PostMapping("/save-course")
    public String saveCourse(@RequestBody Course course) {
        if (course != null) {
            courseRepository.save(course); // Save the course to the database
            return "Course saved successfully!";
        } else {
            return "Course object is null!";
        }
    }
}
