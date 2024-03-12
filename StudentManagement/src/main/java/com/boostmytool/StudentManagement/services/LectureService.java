package com.boostmytool.StudentManagement.services;

import com.boostmytool.StudentManagement.models.Lecture;

public interface LectureService {
    Lecture findById(String id);
}
