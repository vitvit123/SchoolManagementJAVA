$(document).ready(function() {

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
      var studentName=(getCookie('student'));
      $("#studentname").text(studentName);
      $("#studentNamebox").val(studentName);





      function fetchstudentData() {
        $.ajax({
            url: "/getAllstudent",
            type: "GET",
            dataType: "json",
        success: function(student) {
            var username = $("#studentNamebox").val();
            var studentId;
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




            //         $.ajax({
            //             url: `/requestresult/${lecturerId}`, 
            //             type: 'GET',
            //             success: function(response) {
            //                 console.log('Leave requests received from server:', response);
            //             },
            //             error: function(xhr, status, error) {
            //                 console.error('Error:', xhr.status, xhr.statusText, error);
            //             }
            //         });




            
            
            
            //         $.ajax({
            //             url: "/admins",
            //             type: "GET",
            //             dataType: "json",
            //             success: function(response) {
            //                 var approverSelect = $("#Approver");
            //                 approverSelect.empty();
            //                 $.each(response, function(index, admin) {
            //                     approverSelect.append($("<option>", {
            //                         value: admin.adminId,
            //                         text: admin.username 
            //                     }));
            //                 });
            //             },
            //             error: function(xhr, status, error) {
            //             }
            //         });

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
