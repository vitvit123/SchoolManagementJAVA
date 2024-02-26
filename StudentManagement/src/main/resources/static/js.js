$(document).ready(function() {


    function CloseTab(){
        $("#Container-Fluid-Student").css("display","none");
        $("#container-fluid-Dashboard").css("display","none");
        $("#Container-Fluid-Enrollment").css("display","none");
        $("#Container-Fluid-Lecture").css("display","none");
        $("#Container-Fluid-Course").css("display","none");

    }


    $('#sidebarCollapse').on('click', function() {
        $('.sidebar').toggleClass('active');
    });



    $("#DashboardTab").on("click", function() {
        CloseTab();
        $("#container-fluid-Dashboard").css("display","block");

    });




    $("#StudentTab").on("click", function() {
        CloseTab();
        $("#Container-Fluid-Student").css("display","block");
    });





    $("#CoursesTab").on("click", function() {
        CloseTab();
        $("#Container-Fluid-Course").css("display","block");
    });






    $("#TeachersTab").on("click", function() {
        CloseTab();
        $("#Container-Fluid-Lecture").css("display","block");
    });



    $('#addLectureBtn').on('click', function() {
        $('#addLectureModal').modal('show');
    });


    $("#EnrollmentTab").on("click", function() {
        CloseTab();
        $("#Container-Fluid-Enrollment").css("display","block");
    });

    $("#addCourseBtn").on("click",function(){
        $("#addCourseModal").modal("show");
    })
    $("#addStudentBtn").on("click",function(){
        $("#addStudentModal").modal("show");
    })
    

    $("#saveCourseBtn").on("click", function(){
        var courseName = $("#course-title").val();
        var courseData = {
            courseName: courseName
        };
        $.ajax({
            type: "POST",
            url: "/save-course",
            contentType: "application/json",
            data: JSON.stringify(courseData),
            success: function(response) {
                console.log(response)
                alert(response); 
            },
            error: function(xhr, status, error) {
                // Handle errors
                alert("An error occurred while saving the course: " + xhr.responseText);
            }
        });
    });
    



});