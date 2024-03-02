// package com.boostmytool.StudentManagement.controllers;

// import com.boostmytool.StudentManagement.models.Admin;
// import com.boostmytool.StudentManagement.models.LoginRequest;
// import com.boostmytool.StudentManagement.models.Student;
// import com.boostmytool.StudentManagement.repositories.AdminRepository;
// import com.boostmytool.StudentManagement.repositories.StudentRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RestController;

// @RestController
// public class LoginController {

//     @Autowired
//     private AdminRepository adminRepository;

//     @Autowired
//     private StudentRepository studentRepository;

//     @PostMapping("/login")
//     public String login(@RequestBody LoginRequest loginRequest) {
//         String username = loginRequest.getUsername();
//         String password = loginRequest.getPassword();

//         // Check if user exists in Admin table
//         Admin admin = adminRepository.findByUsernameAndPassword(username, password);
//         if (admin != null) {
//             return "admin";
//         }

//         // Check if user exists in Student table
//         Student student = studentRepository.findByUsernameAndPassword(username, password);
//         if (student != null) {
//             return "student";
//         }

//         // If user not found in any table, return error message
//         return "User not found";
//     }
// }
