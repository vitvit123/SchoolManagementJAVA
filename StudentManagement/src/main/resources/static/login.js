$(document).ready(function() {

    $("#loginForm").submit(function(event) {
        event.preventDefault(); 
    
        var formData = {
            username: $("#username").val(),
            password: $("#password").val()
        };
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/login",
            data: JSON.stringify(formData),
            success: function(response) {
                Swal.fire({
                    title: "Success!",
                    text: "Login successful",
                    icon: "success"
                }).then(() => {
                    if (response === "admin") {
                        window.location.href = "admin.html"; // Redirect to admin.html for admin
                    } else if (response === "student") {
                        window.location.href = "student.html"; // Redirect to student.html for student
                    } else if (response === "lecture") {
                        window.location.href = "lecture.html"; // Redirect to lecture.html for lecture
                    }
                });
            },
            
            error: function(xhr, status, error) {
                console.error("Login failed. Error: " + xhr.responseText);
            }
        });
    });
    

})