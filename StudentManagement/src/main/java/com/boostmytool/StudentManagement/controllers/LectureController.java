package com.boostmytool.StudentManagement.controllers;

import com.boostmytool.StudentManagement.models.Lecture;
import com.boostmytool.StudentManagement.repositories.LectureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;



@RestController
public class LectureController {

    @Autowired
    private final LectureRepository lectureRepository;

    public LectureController(LectureRepository lectureRepository) {
        this.lectureRepository = lectureRepository;
    }
    @GetMapping("/getAllLectures")
    public List<Lecture> getAllLectures() {
        return lectureRepository.findAll();
    }
    @GetMapping("/getLectureById/{lectureId}")
    public ResponseEntity<Lecture> getLectureById(@PathVariable int lectureId) {
        Optional<Lecture> lectureOptional = lectureRepository.findById(lectureId);
        if (lectureOptional.isPresent()) {
            Lecture lecture = lectureOptional.get();
            return ResponseEntity.ok(lecture);
        } 
        else {
            return ResponseEntity.notFound().build();
        }
    }
    @SuppressWarnings("null")
    @PostMapping("/saveLecture")
    public String saveLecture(@RequestBody Lecture lecture) {
        try {
            lectureRepository.save(lecture);
            return "Lecture saved successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error occurred while saving lecture: " + e.getMessage();
        }
    }



@DeleteMapping("/deletelecture/{lectureid}")
public ResponseEntity<String> deleteLecture(@PathVariable int lectureid) {
    try {
        lectureRepository.deleteById(lectureid);
        return ResponseEntity.ok("Lecture deleted successfully");
    } catch (Exception e) {
        e.printStackTrace(); // Log the exception for debugging
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete student");
    }
}
    
@PutMapping("/updateLecture/{lectureId}")
    public ResponseEntity<String> updateLecture(@PathVariable int lectureId, @RequestBody Lecture updatedLecture) {
        try {
            // Retrieve the existing lecture from the database
            Optional<Lecture> optionalLecture = lectureRepository.findById(lectureId);
            
            // Check if the lecture exists
            if (optionalLecture.isPresent()) {
                Lecture existingLecture = optionalLecture.get();
                
                // Update the existing lecture with the data from the updatedLecture object
                existingLecture.setFullname(updatedLecture.getFullname());
                existingLecture.setEmail(updatedLecture.getEmail());
                existingLecture.setAddress(updatedLecture.getAddress());
                existingLecture.setDob(updatedLecture.getDob());
                existingLecture.setPassword(updatedLecture.getPassword());
                existingLecture.setSkill(updatedLecture.getSkill());
                // Update other fields as needed
                
                // Save the updated lecture to the database
                lectureRepository.save(existingLecture);
                
                return ResponseEntity.ok("Lecture updated successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update lecture");
        }
    }
    
}
