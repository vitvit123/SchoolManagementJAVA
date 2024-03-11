package com.boostmytool.StudentManagement.repositories;

import com.boostmytool.StudentManagement.models.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LectureRepository extends JpaRepository<Lecture, Integer> {
    Lecture findByFullnameAndPassword(String fullname, String password);
    List<Lecture> findBySkill(String skill);
}
