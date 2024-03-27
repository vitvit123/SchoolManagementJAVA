package com.boostmytool.StudentManagement.repositories;

import com.boostmytool.StudentManagement.models.Score;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScoreRepository extends JpaRepository<Score, Integer> {
}
