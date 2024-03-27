package com.boostmytool.StudentManagement.controllers;

import com.boostmytool.StudentManagement.models.Score;
import com.boostmytool.StudentManagement.repositories.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
public class ScoreController {

    private final ScoreRepository scoreRepository;

    @Autowired
    public ScoreController(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }

    @PostMapping("/saveScores")
    public void saveScores(@RequestBody Score score) {
        scoreRepository.save(score);
    }

    @GetMapping("/retrievescores")
    public List<Score> getAllScores() {
        return scoreRepository.findAll();
    }

}
