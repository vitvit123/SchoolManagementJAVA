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
    
// Function to fetch courses from the backend
function fetchCourses() {
    $.ajax({
        type: "GET",
        url: "/courses", // Update the URL to match your backend endpoint
        success: function(response) {
            displayCourses(response); // Call function to display courses
        },
        error: function(xhr, status, error) {
            console.error("Error fetching courses:", error);
        }
    });
}

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
                Swal.fire({
                    title: "success!",
                    text: "Course '" + courseName + "' added successfully",
                    icon: "success"
                  }).then(()=>{
                    fetchCourses();
                    $("#addCourseModal").modal("hide");
                  })
            },
            error: function(xhr, status, error) {
                alert("An error occurred while saving the course: " + xhr.responseText);
            }
        });
    });
    



// Function to display courses in HTML cards
function displayCourses(courses) {
    var cardContainer = $("#course-container");
    cardContainer.empty(); // Clear existing cards

    courses.forEach(function(course) {
        var card = `
        <div class="container" id="course-container">
        <div class="card mb-3">
            <div style="display: flex;justify-content: space-between;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" class="card-body">
                <h5 class="card-title" th:text="">${course.courseName}</h5>
                <div>
                <button class="btn btn-danger btn-sm float-end BtnCourseIDDelete" data-deleteid="${course.id}" >Delete</button>
                <button class="btn btn-primary btn-sm float-end me-2 BtnCourseIDUpdate" data-updateid="${course.id}">Update</button>
                </div>
            </div>
        </div>
    </div>
    `;
        cardContainer.append(card); 
    });
}
    fetchCourses();


    $(document).on("click", ".BtnCourseIDDelete", function() {
        var courseId = $(this).data("deleteid"); 
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this course!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: "DELETE",
                    url: "/delete-course/" + courseId,
                    success: function(response) {
                        fetchCourses();
                    },
                    error: function(xhr, status, error) {
                        alert("An error occurred while deleting the course: " + xhr.responseText);
                    }
                });
            }
        });
    });
    


// Event handler for clicking the "Update" button
$(document).on("click", ".BtnCourseIDUpdate", function() {
    var courseId = $(this).data("updateid"); // Get the course ID
    var currentCourseName = $(this).closest(".card-body").find(".card-title").text(); // Get the current course name
    $("#updateCourseModal").modal("show"); // Show the modal popup
    $("#updateCourseModal #courseName").val(currentCourseName); // Populate the modal with the current course name

    // Event handler for submitting the update form inside the modal
    $("#updateCourseForm").off("submit").on("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
        var updatedCourseName = $("#updateCourseModal #courseName").val(); // Get the updated course name
        $.ajax({
            type: "POST",
            url: "/update-course/" + courseId,
            contentType: "application/json", // Set the Content-Type header to application/json
            data: JSON.stringify({ courseName: updatedCourseName }), // Send the updated course name as JSON data
            success: function(response) {
                Swal.fire({
                    title: "Success!",
                    text: "Course updated successfully!",
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        // Fetch and display the updated data
                        fetchCourses();
                        // Hide the modal after successful update
                        $("#updateCourseModal").modal("hide");
                    }
                });
            },
            error: function(xhr, status, error) {
                alert("An error occurred while updating the course: " + xhr.responseText);
            }
        });
        
    });
});


    
    



});