$(document).ready(function() {

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
      var studentName=(getCookie('student'));
      $("#studentname").text(studentName);
      $("#studentNamebox").val(studentName);


    var studentId;
      function fetchstudentData() {
        $.ajax({
            url: "/getAllstudent",
            type: "GET",
            dataType: "json",
        success: function(student) {
            var username = $("#studentNamebox").val();
            
            student.forEach(function(student) {
                if (student.fullname === username) {
                    studentId = student.studentId;
                    $("#studentNamebox").attr("StudentID",studentId);
                      console.log(studentId);  
                      $.ajax({
                        url: `/fetchrequestpermissionforstudent/${studentId}`,
                        type: "GET",
                        success: function(response) {
                            console.log(response);
                        },
                        error: function(xhr, status, error) {
                            console.error(xhr.responseText);
                        }
                    });


        }
    });
        },
        error: function(xhr, status, error) {
        }
        });
    }
    
    fetchstudentData();
    




    $('#LogoutBTN').on('click', function() {
        Swal.fire({
            title: 'Are you certain you desire to log out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout'
        }).then((result) => {
            // If user confirms, delete cookie and redirect
            if (result.isConfirmed) {
                document.cookie = "student=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
                window.location.href = "index.html";
            }
        });

    });

    function retrieveScores() {

        $.ajax({
            type: "GET",
            url: "/retrievescores",
            contentType: "application/json",
            success: function(response) {
                var response=response.reverse();


                for (var i = 0; i < response.length; i++) {
                    if (response[i].student.studentId == studentId) {
                        var midtermScore = response[i].midTerm;
                        var quizScore = response[i].quiz;
                        var finalScore = response[i].finalGrade;

                        var totalScore = (quizScore * 0.15 + midtermScore * 0.35 + finalScore * 0.50) / 100;
            

                        document.getElementById("midterm_score").innerText = midtermScore;
                        document.getElementById("quiz_score").innerText = quizScore;
                        document.getElementById("final_score").innerText = finalScore;
                        document.getElementById("total_score").innerText = (totalScore * 100).toFixed(2) + "%"; // Showing total score with 2 decimal places and percentage
                    
        
                        if (totalScore >= 0.6) {
                          document.getElementById("pass_fail_note").innerText = "Congratulations! You passed the course.";
                        } else {
                          document.getElementById("pass_fail_note").innerText = "Unfortunately, you did not pass the course.";
                        }
                    }
                }



            },
            error: function(xhr, status, error) {
                console.error("Error retrieving scores:", error);
            }
        });
    }

    retrieveScores();


    function closeAllTabs(){
        $("#Request-Permission-Contain").css("display", "none");
        $("#dashboard").css("display", "none");
        $("#courses").css("display", "none");
        $("#grades").css("display", "none");
        $("#profile").css("display", "none");
        $("#NotificationTab").css("display", "none");


    }


    $('#Request-Permission-Tab').on('click', function () {
        closeAllTabs();
        $("#Request-Permission-Contain").css("display", "block");
    });
    
    $('#dashboardtab').on('click', function () {
        closeAllTabs();
        $("#dashboard").css("display", "block");
    });
    

    $('#coursetab').on('click', function () {
        closeAllTabs();
        $("#courses").css("display", "block");
    });

    $('#gradetab').on('click', function () {
        closeAllTabs();
        $("#grades").css("display", "block");
    });
    

    $('#profiletab').on('click', function () {
        closeAllTabs();
        $("#profile").css("display", "block");
    });

    $('#notificationBell').on('click', function () {
        closeAllTabs();
        $("#NotificationTab").css("display", "block");
    });

});
