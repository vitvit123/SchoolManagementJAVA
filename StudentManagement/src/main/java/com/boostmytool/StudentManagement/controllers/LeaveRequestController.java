package com.boostmytool.StudentManagement.controllers;

import com.boostmytool.StudentManagement.models.LeaveRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import javax.servlet.http.HttpServletRequest;

@Controller
public class LeaveRequestController {

    @GetMapping("/leave-request")
    public String showLeaveRequestForm(Model model, HttpServletRequest request) {
        // Retrieve lecturer ID from the cookie
        String lecturerId = getCookieValue(request, "lecture");

        // Set the lecturer ID in the model attribute
        model.addAttribute("lecturerId", lecturerId);

        // Add a new LeaveRequest object to the model
        model.addAttribute("leaveRequest", new LeaveRequest());

        return "leave-request-form";
    }

    // Helper method to retrieve cookie value
    private String getCookieValue(HttpServletRequest request, String cookieName) {
        javax.servlet.http.Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (javax.servlet.http.Cookie cookie : cookies) {
                if (cookie.getName().equals(cookieName)) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    @PostMapping("/leave-request")
    public String submitLeaveRequest(@ModelAttribute LeaveRequest leaveRequest) {
        // Process the leave request (save to database, etc.)
        // For example:
        System.out.println("Submitted Leave Request: " + leaveRequest.toString());
        // Redirect to a confirmation page or show a success message
        return "redirect:/leave-request-confirmation";
    }

    @GetMapping("/leave-request-confirmation")
    public String showLeaveRequestConfirmation() {
        return "leave-request-confirmation";
    }
}
