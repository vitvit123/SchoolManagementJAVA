$(document).ready(function() {


    $("#BTNLogin").on("click",function(){
        var a=$("#username").val();
        var b=$("#password").val();

    })

    function CloseTab(){
        $("#Container-Fluid-Student").css("display","none");
        $("#container-fluid-Dashboard").css("display","none");
        $("#Container-Fluid-Enrollment").css("display","none");
        $("#Container-Fluid-Lecture").css("display","none");
        $("#Container-Fluid-Course").css("display","none");
        $("#Container-Fluid-Class").css("display","none");
    }

    $('#ClassTab').on('click', function() {
        CloseTab();
        $("#Container-Fluid-Class").css("display","block");
    });

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

    $("#LogoutTab").on("click",function(){
        $("#Login_Form").css("display","block");
        $(".sidebar").css("display","none");
        $(".content").css("display","none");
    })

    $('#addLectureBtn').on('click', function() {
        $('#addLectureModal').modal('show');
        $("#BtnGenerateLecture").css("display","block");
        $("#updateLectureBtn").css("display","none");
        $("#addLectureModalLabeltext").text("Add Lecture");

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
        $("#saveStudentBtn").css("display","block");
        $("#updateStudentBtn").css("display","none");
        $("#exampleModalLabelText").text("Add Student");
    })





    
// Function to fetch courses from the backend
function fetchCourses() {
    $.ajax({
        type: "GET",
        url: "/courses", 
        success: function(response) {
            $("#BoxTotallCourse").text(response.length);
            displayCourses(response); 
        var selectElement = $('#teacher-skill');
        if (selectElement.length === 0) {
            return;
        }
        selectElement.empty();
        response.forEach(function(course) {
        var option = $('<option>', {
            value: course.courseName, // Assuming 'id' is used as the value for the option
            text: course.courseName // Using 'courseName' as the text for the option
        });
        selectElement.append(option);
    });
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




    $("#addClassBtn").on("click",function(){
        $("#addClassModal").modal("show");
    });


    $("#saveClassBtn").on("click", function(){
        var className = $("#class-title").val();
        var classeData = {
            className: className
        };
        $.ajax({
            type: "POST",
            url: "/save-class",
            contentType: "application/json",
            data: JSON.stringify(classeData),
            success: function(response) {
                Swal.fire({
                    title: "success!",
                    text: "Class '" + className + "' added successfully",
                    icon: "success"
                  }).then(()=>{
                    fetchClasses();
                    $("#class-title").val("");
                    $("#addClassModal").modal("hide");
                  })
            },
            error: function(xhr, status, error) {
                alert("An error occurred while saving the course: " + xhr.responseText);
            }
        });
    });


        fetchClasses();

    
        function fetchClasses() {
            $.get("/classes", function(classes) {
                var classListDiv = $("#classList");
                classListDiv.empty(); // Clear previous content
        
                classes.forEach(function(classObj) {
                    // Create a box-like div for each class
                    var classBox = $("<div class='class-box'></div>");
        
                    // Display class name
                    var className = $("<p>" + classObj.className + "</p>");
                    classBox.append(className);
        
                    // Add update button with data-id attribute
                    var updateBtn = $("<button class='update-btn' data-id='" + classObj.classId + "'>Update</button>");
                    updateBtn.on("click", function() {
                        var classId = $(this).data("id");
                        // Handle update functionality here with classId
                        console.log("Update button clicked for class ID: " + classId);
                    });
                    classBox.append(updateBtn);
        
                    // Add delete button with data-id attribute
                    var deleteBtn = $("<button class='delete-btn' data-id='" + classObj.classId + "'>Delete</button>");
                    deleteBtn.on("click", function() {
                        var classId = $(this).data("id");
                        deleteClass(classId);
                    });
                    classBox.append(deleteBtn);
        
                    // Append the class box to the classListDiv
                    classListDiv.append(classBox);
                });
            });
        }
        
        function deleteClass(classId) {
            $.ajax({
                url: "/delete-class/" + classId,
                type: "DELETE",
                success: function(response) {
                    console.log(response);
                    // Optionally, you can update the UI after successful deletion
                    fetchClasses();
                },
                error: function(xhr, status, error) {
                    console.error("An error occurred while deleting the class: " + xhr.responseText);
                    // Handle error, display message to the user, etc.
                }
            });
        }
        
    

    














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
                        fetchCourses();
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


function fetchStudent() {
    $.ajax({
        type: "GET",
        url: "/Student",
        success: function(response) {
            $("#BoxTotallStudent").text(response.length);
            var studentTable = $('#studentTable').DataTable();
            if (studentTable) {
                studentTable.destroy(); 
            }
            var studentTableBody = $('#studentTable tbody');
            studentTableBody.empty(); 
            response.forEach(function(student) {
                studentTableBody.append(`
                    <tr>
                        <td>${student.studentId}</td>
                        <td>${student.fullname}</td>
                        <td>${student.email}</td>
                        <td>${student.dob}</td>
                        <td>
                        <center>                        
                        <input BtnDeletestudentID="${student.studentId}" type="button" value="Delete" class="btn btn-danger btndeletestudent" name="" id="">
                        <input BtnUpdateStudentID="${student.studentId}" type="button" value="Update" class="btn btn-primary btnupdateStudent" name="" id="">
                        </center>
                        </td>
                    </tr>
                `)               
            });
            $('#studentTable').DataTable({
                searching: true, 
                ordering: true, 
                paging: true,  
            });
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}

$(document).on("click", ".btnupdateStudent", function(){
    var studentId = $(this).attr('BtnUpdateStudentID'); 
    if (studentId) { 
        $.ajax({
            type: "GET",
            url: `/studentss/${studentId}`, 
            success: function(response) {
                $("#saveStudentBtn").css("display","none");
                $("#updateStudentBtn").css("display","block");
                $("#exampleModalLabelText").text("Update Student")
                $("#addStudentModal").modal("show");
                $("#updateStudentBtn").attr("updatestuid",studentId)
                $('#studentName').val(response.fullname);
                $('#studentAddress').val(response.address);
                $('#studentDOB').val(response.dob);
                $('#studentEmail').val(response.email);
                $('#studentPhoneNumber').val(response.studentPhoneNumber);
                $('#parentName').val(response.parentName);
                $('#parentPhoneNumber').val(response.parentPhoneNumber);
                $('#studentPassword').val(response.password);
                $('#studentProfile').attr('src', response.profile);
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
                alert("Failed to retrieve student data.");
            }
        });
    } else {
        console.error("Student ID is undefined or empty.");
    }
});

$(document).on("click", "#updateStudentBtn", function(){
    var studentId = $(this).attr('updatestuid'); 
    if (studentId) { 
        // Collect updated student data from the form fields
        var updatedStudentData = {
            fullname: $('#studentName').val(),
            address: $('#studentAddress').val(),
            dob: $('#studentDOB').val(),
            email: $('#studentEmail').val(),
            parentName: $('#parentName').val(),
            parentPhoneNumber: $('#parentPhoneNumber').val(),
            password: $('#studentPassword').val(),
            profile: $('#studentProfile').val(), // Assuming profile is a file path
            studentPhoneNumber: $('#studentPhoneNumber').val()
        };

        // Make a PUT request to update the student data
        $.ajax({
            type: "PUT",
            url: `/updateStudent/${studentId}`,
            contentType: "application/json",
            data: JSON.stringify(updatedStudentData),
            success: function(response) {
                Swal.fire({
                    title: "Success!",
                    text: "Student updated successfully!",
                    icon: "success"
                });
                $('#studentName').val("");
                $('#studentAddress').val("");
                $('#studentDOB').val("");
                $('#studentEmail').val("");
                $('#parentName').val("");
                $('#parentPhoneNumber').val("");
                $('#studentPassword').val("");
                $('#studentProfile').val("");
                $('#studentPhoneNumber').val("");
                $("#addStudentModal").modal("hide");
                fetchStudent();
            },  
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
                alert("Failed to update student data.");
            }
        });
    } else {
        console.error("Student ID is undefined or empty.");
    }
});












$(document).on("click", ".btndeletestudent", function() {
    var studentId = $(this).attr('btndeletestudentid');
    $.ajax({
        type: "DELETE",
        url: `/deleteStudent/${studentId}`,
        success: function(response) {
            Swal.fire({
                title: "Success!",
                text: "Your Data has deleted success",
                icon: "success"
            })
            fetchStudent();
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
            alert("Failed to delete student.");
        }
    });

});




fetchStudent();
$("#saveStudentBtn").click(function() {
    var formData = {
        fullname: $("#studentName").val(),
        email: $("#studentEmail").val(),
        dob: $("#studentDOB").val(),
        address: $("#studentAddress").val(),
        profile: $("#studentProfile").val().split('\\').pop(),
        studentPhoneNumber: $("#studentPhoneNumber").val(),
        parentName: $("#parentName").val(),
        parentPhoneNumber: $("#parentPhoneNumber").val(),
        password: $("#studentPassword").val()
    };
    $.ajax({
        type: "POST",
        url: "/saveStudent",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function(response) {
            Swal.fire({
                title: "Success",
                text: "Student data Added successfully",
                icon: "success"
            }).then(()=>{
                $("#addStudentModal").modal("hide");
                $("#studentName").val("");
                $("#studentEmail").val("");
                $("#studentDOB").val("");
                $("#studentAddress").val("");
                $("#studentProfile").val("");
                $("#studentPhoneNumber").val("");
                $("#parentName").val("");
                $("#parentPhoneNumber").val("");
                $("#studentPassword").val("");
            })
        },
        error: function(xhr, status, error) {
            console.error("Error saving student data:", error);
        }
    });
});



function fetchLectureData() {
    $.ajax({
        url: "/getAllLectures",
        type: "GET",
        dataType: "json",
    success: function(lectures) {
        $("#BoxTotallLecture").text(lectures.length)
    var lecturetable=$("#lectureTable").DataTable();
    if (lecturetable) {
        lecturetable.destroy(); 
    }
    var lectureTableBody=$("#lectureTable tbody");
    lectureTableBody.empty();
    lectures.forEach(function(lecture) {
       
        lectureTableBody.append(`
            <tr>
                <td>${lecture.lecturerId}</td>
                <td>${lecture.fullname}</td>
                <td>${lecture.email}</td>
                <td>${lecture.address}</td>
                <td>${lecture.dob}</td>
                <td>${lecture.skill}</td>
                <td>
                    <center style="display:flex;justify-content: center;">                        
                        <input style="margin-right:10px" BtnDeletelectureID="${lecture.lecturerId}" type="button" value="Delete" class="btn btn-danger btndeletelecture" name="" id="">
                        <input BtnUpdatelectureID="${lecture.lecturerId}" type="button" value="Update" class="btn btn-primary btnupdatelecture" name="" id="">
                    </center>
                </td>
            </tr>
        `);
    });

    
},

        error: function(xhr, status, error) {
            console.error("Error occurred while fetching lecture data: ", error);
        }
    });
}
fetchLectureData();

$("#BtnGenerateLecture").on("click", function () {
    var formData = {
        fullname: $("#teacher-name").val(),
        email: $("#teacher-email").val(),
        address: $("#teacher-address").val(),
        dob: $("#teacher-dob").val(),
        password: $("#teacher-password").val(),
        profile: $("#teacher-profile").val().split('\\').pop(),
        skill: $("#teacher-skill option:selected").text()
    };
    $.ajax({
        type: "POST",
        url: "/saveLecture",
        data: JSON.stringify(formData), 
        contentType: "application/json",
        success: function (response) {
            Swal.fire({
                title: "Success",
                text: "Lecture data Added successfully",
                icon: "success"
            }).then(()=>{
                fetchLectureData();
                $("#addLectureModal").modal("hide");
                $("#teacher-name").val("");
                $("#teacher-email").val("");
                $("#teacher-address").val("");
                $("#teacher-dob").val("");
                $("#teacher-password").val("");
                $("#teacher-profile").val("");
                $("#teacher-skill").val("");
            })
        },
        error: function (xhr, status, error) {
            console.error("Error occurred: ", xhr.responseText);
        }
    });
});

$(document).on("click", ".btndeletelecture", function() {
    var lectureid = $(this).attr('btndeletelectureid'); 
    $.ajax({
        type: "DELETE",
        url: `/deletelecture/${lectureid}`,
        success: function(response) {
            Swal.fire({
                title: "Success!",
                text: "Your Data has been deleted successfully",
                icon: "success"
            });
            fetchLectureData();
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
            alert("Failed to delete lecture.");
        }
    });
});
$(document).on("click", ".btnupdatelecture", function() {
    $('#addLectureModal').modal('show');
    $("#BtnGenerateLecture").css("display","none");
    $("#updateLectureBtn").css("display","block");
    $("#addLectureModalLabeltext").text("Update Lecture");
    var LectureUpdateID=$(this).attr("btnupdatelectureid");

    $.ajax({
        type: "GET",
        url: "/getLectureById/" + LectureUpdateID,
        success: function(response) {
            $("#updateLectureBtn").attr("IDUPDATELECTURE",LectureUpdateID)
            $("#teacher-name").val(response.fullname);
            $("#teacher-email").val(response.email);
            $("#teacher-address").val(response.address);
            $("#teacher-dob").val(response.dob); 
            $("#teacher-skill").val(response.skill).change();
            $("#teacher-password").val(response.password);
            $("#teacher-profile").attr('src',response.profile);
        },
        error: function(xhr, status, error) {

        }
    });

});
$("#updateLectureBtn").on("click", function() {
    var updateId = $(this).attr("IDUPDATELECTURE");

    var lectureData = {
        fullname: $("#teacher-name").val(),
        email: $("#teacher-email").val(),
        address: $("#teacher-address").val(),
        dob: $("#teacher-dob").val(),
        password: $("#teacher-password").val(),
        skill: $("#teacher-skill").val(),

    };
    
    $.ajax({
        type: "PUT",
        url: "/updateLecture/" + updateId,
        contentType: "application/json",
        data: JSON.stringify(lectureData),
        success: function(response) {
            Swal.fire({
                title: "Success!",
                text: "Your Data has been Updated successfully",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Reset the form fields to their initial state
                    $("#teacher-name").val("");
                    $("#teacher-email").val("");
                    $("#teacher-address").val("");
                    $("#teacher-dob").val("");
                    $("#teacher-password").val("");
                    $("#teacher-skill").val(""); // Assuming you want to clear the selected skill
                    
                    // Optionally, close the modal or perform any other actions
                    $('#addLectureModal').modal('hide');
                }
            });
            fetchLectureData();
        },
        error: function(xhr, status, error) {
            console.error("Failed to update lecture:", xhr.responseText);
        }
    });
});

})
