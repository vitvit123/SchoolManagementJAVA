$(document).ready(function () {


    var classfetch;
    function fetchClasses() {
        $.get("/classes", function(classes) {
            classfetch=classes;
            console.log(classes);
            
        });
    }
    fetchClasses();
    
    var responseData;

    function fetchLectureData() {
        $.ajax({
            url: "/getAllLectures",
            type: "GET",
            dataType: "json",
        success: function(lectures) {
            var username = $("#username").text();
            var lecturerId;
        
  
            lectures.forEach(function(lecture) {
                if (lecture.fullname === username) {
                    console.log(lecture);
                    console.log(classfetch);


                    lecturerId = lecture.lecturerId;
                    $("#lecturerName").attr("lectureid",lecturerId);
                    $("#username").attr("lectureid",lecturerId);

                    
                    
                $.ajax({
                    url: `/requestresultss`, 
                    type: 'GET',
                    success: function(response) {
                        // response.reverse();
                        response.reverse();
                        console.log(response);
                        responseData = response;
                        
                        for (var i = 0; i < response.length; i++) {
                            if (response[i].lecturer.lecturerId === lecturerId) {
                                
                               
                                var notificationDiv = $('<div>').addClass('notification');

                                var icon = $('<i>').addClass('fa-regular fa-pen-to-square');
                            
                                var message = $('<p>').text("You have committed a Leave Request");

                                var fromDate = $('<p>').html("On: <span style='color: #C37C06;'>" + response[i].date.split("T")[0] + "</span>");

                                var containtext = $('<div>').addClass('notification-content');

                                var containt = $('<div>').addClass('notification-contain-icontext');

                                containtext.append(message,fromDate);
                                containt.append(icon,containtext)

                                var button = $('<button>').text('View').addClass('view-button').attr('leaveID',response[i].leaveId);

                                notificationDiv.append(containt,button);
                          

                                $("#NotificationTab").append(notificationDiv);
                                

                            }
                            

                            
                        }
                       

                    },
                    error: function(xhr, status, error) {
                        console.error('Error:', xhr.status, xhr.statusText, error);
                    }
                });
                    

                    $.ajax({
                        url: `/enrollments/fetchrequestpermission/${lecturerId}`, // Updated endpoint
                        type: "GET",
                        success: function(response) {
                            var cardContainer = $('#Check-out-Contain');

                            var cardCount = 0;
                    
                            response.forEach(function(entry) {
                                if (cardCount % 3 === 0) {
                                    cardContainer.append('<div class="row"></div>');
                                }
                
                                var cardHtml = '<div class="col-md-4 mb-3">';
                                cardHtml += '<div class="card">';
                                cardHtml += '<img src="img/students/' + entry.student.profile + '" class="card-img-top" alt="Student Image">';                                cardHtml += '<div class="card-body">';
                                cardHtml += '<h5 class="card-title">' + entry.student.fullname + '</h5>';
                                cardHtml += '<p class="card-text">Student ID: ' + entry.student.studentId + '</p>';
                                cardHtml += '<div id="managebtnpermission">';
                                cardHtml += '<button subject="'+entry.course.id+'" data-student-id="' + entry.student.studentId + '"  class="btn btn-warning permissionpermission">Permission</button>';
                                cardHtml += '<button subject="'+entry.course.id+'" data-student-id="' + entry.student.studentId + '" style="margin-left: 10px;" class="btn btn-danger rejectpermission">Reject</button>';
                                cardHtml += '<button subject="'+entry.course.id+'"  data-student-id="' + entry.student.studentId + '" style="margin-left: 10px;" class="btn btn-success approvepermission">Approve</button>';
                                cardHtml += '</div>';
                                cardHtml += '</div>';
                                cardHtml += '</div>';
                                cardHtml += '</div>';
                    
                                cardContainer.find('.row').last().append(cardHtml);

                                cardCount++;
                            });
                            cardContainer.show();


                            $("#classname").text(response[0].myClass.className);
                            $("#Majorname").text(response[0].course.courseName);

                            
                            var html = '';
                            response.forEach(function(entry) {

                                html += '<tr>';
                                html += '<td>' + entry.student.fullname + '</td>';
                                html += '<td>' + entry.startDate + '</td>';
                                html += '<td>' + entry.endDate + '</td>';
                                html += '<td>' + entry.studyTime.dayOfWeek + ' ' + entry.studyTime.startTime + ' - ' + entry.studyTime.endTime + '</td>';
                                html += '</tr>';
                            });
                            $('#enrollmentTableBody').html(html); 
                            $('#enrollmentTable').DataTable({
                                "paging": true, 
                                "searching": true 
                            });



                            if (response.length > 0) {
                                console.log(response);
                                var course = response[0].course;
                                console.log(course);
                                var classs = response[0].myClass;
                                var time = response[0].studyTime;
                                
                                var courseIdSelect = $("#courseId");
                                courseIdSelect.empty();
                                courseIdSelect.append($("<option>").attr("value", course.id).text(course.courseName));
            
                                var classIdSelect = $("#classId");
                                classIdSelect.empty();
                                classIdSelect.append($("<option>").attr("value", classs.classId).text(classs.className));
            
                                var TimeIdSelect = $("#time");
                                TimeIdSelect.empty();
                                TimeIdSelect.append($("<option>").attr("value", time.timeId).text("Start Time: "+time.startTime +"End Time: "+time.endTime+"Day Of Week: "+time.dayOfWeek));
                            }
                            else {
                            }
                        },
                        error: function(xhr, status, error) {
                        }
                    });
            
            
            
                    $.ajax({
                        url: "/admins",
                        type: "GET",
                        dataType: "json",
                        success: function(response) {
                            var approverSelect = $("#Approver");
                            approverSelect.empty();
                            $.each(response, function(index, admin) {
                                approverSelect.append($("<option>", {
                                    value: admin.adminId,
                                    text: admin.username 
                                }));
                            });
                        },
                        error: function(xhr, status, error) {
                        }
                    });

                }
            });
        },
        error: function(xhr, status, error) {
        }
        });
    }
    
    fetchLectureData();


    $(document).on("click", ".approvepermission", function() {
        

        var studentID = $(this).attr("data-student-id");
        var subject = $(this).attr("subject");
        
        $.ajax({
            type: "POST",
            url: "approvepermission",
            data: {
                studentId: studentID,
                subject: subject
            },
            success: function(response) {
               console.log(response);
            },
            error: function(xhr, status, error) {
                Swal.fire({
                    title: "Success!",
                    text: "Permission has been approve successfully!",
                    icon: "success"
                }).then(function(){
                    $("#managebtnpermission").css("display", "none");
                    
                    setTimeout(function() {
                    $("#managebtnpermission").css("display", "block");

                    }, 0.1 * 60 * 1000);                    
                })
            }
        });
    });


    $(document).on("click", ".rejectpermission", function() {
        var studentID = $(this).attr("data-student-id");
        var subject = $(this).attr("subject");
        
        $.ajax({
            type: "POST",
            url: "rejectpermission",
            data: {
                studentId: studentID,
                subject: subject
            },
            success: function(response) {
                Swal.fire({
                    title: "Success!",
                    text: "Reject Permission",
                    icon: "error"
                })
            },
            error: function(xhr, status, error) {
                alert("reject");
            }
        });
    });


    $(document).on("click", ".permissionpermission", function() {
        var studentID = $(this).attr("data-student-id");
        var subject = $(this).attr("subject");
        
        $.ajax({
            type: "POST",
            url: "permissionpermission",
            data: {
                studentId: studentID,
                subject: subject
            },
            success: function(response) {
                Swal.fire({
                    title: "Success!",
                    text: "Permission",
                    icon: "warning"
                })
            },
            error: function(xhr, status, error) {
                // Handle error response if needed
            }
        });
    });


    
    

    $(document).on("click", ".view-button", function() {
        $('#Request-Permission-Tab').click();
        var buttonattr=$(this).attr("leaveid");
        $(".textleave").text("Request Information");
        $("#backlist").css("display","block");
        $("#leavebtn").css("display","none");

        for (var i = 0; i < responseData.length; i++) {
            if (responseData[i].leaveId == buttonattr) {
                    console.log(responseData[i].reason);
                    var d=responseData[i];
                    var dateString=d.date;
                    var convertdate=dateString.split("T")[0];
                    $("#date").val(convertdate);
                    $("#reason").val(d.reason);
                    $("#Approver").val(d.adminid.adminId);
                    $("#classId").val(d.myClass.classId);
                    $("#time").val(d.studyTime.timeId);



                    if(d.isCompleted == '0'){
                        $("#ResponseText").css({
                            "display": "block",
                            "color": "red"
                        });
                        $("#ResponseText").text("Your request was Rejected");
                    }
                    else if(d.isCompleted=='1'){
                        $("#ResponseText").css({
                            "display": "block",
                            "color": "green"
                        });
                        $("#ResponseText").text("Your request was Approved");
                    }
                    else{
                        $("#ResponseText").css({
                            "display": "block",
                            "color": "darkgrey"
                        });
                        $("#ResponseText").text("Your request is Pending");
                    }

            }
        }

    });




    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    var lectureName = getCookie('lecture');
    $("#username").text(lectureName);
    $("#lectureName").text(lectureName);
    $("#lecturerName").val(lectureName);

    $("#Logoutbotton").on("click", () => {
        Swal.fire({
            title: 'Are you sure you want to log out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout'
        }).then((result) => {
            if (result.isConfirmed) {
                document.cookie = "lecture=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
                window.location.href = "index.html";
            }
        });
    });


    function closeAllTabs() {
        $("#NotificationTab,#DashboardContain, #Check-In-Contain, #Check-out-Contain, #Request-Permission-Contain , #classcontain").css("display", "none");
    }
    
    $('#ClassTab').on('click', function () {
        closeAllTabs();
        $("#classcontain").css("display", "block");
    });

    $('#notificationBell').on('click', function () {
        closeAllTabs();
        $("#NotificationTab").css("display", "block");
    });

    $('#DashboardTab').on('click', function () {
        closeAllTabs();
        $("#DashboardContain").css("display", "block");
    });


    $('#Check-In-Tab').on('click', function () {
        closeAllTabs();
        $("#Check-In-Contain").css("display", "block");
    });

    $("#backlist").on("click",()=>{
        closeAllTabs();
        $("#NotificationTab").css("display", "block");
    })
    $('#Check-out-Tab').on('click', function () {
        closeAllTabs();
        $("#Check-out-Contain").css("display", "block");
    });


    $('#Request-Permission-Tab').on('click', function () {
        closeAllTabs(); 
        $("#Request-Permission-Contain").css("display", "block");
        $(".textleave").text("Leave Request Form");
        $("#backlist").css("display","none");
        $("#leavebtn").css("display","block");
        $("#ResponseText").css("display","none");

    });


    


    function retrieveLectureProfileByUsername() {
        var fullname = $("#username").text(); 
        
        $.ajax({
            type: "GET",
            url: "/getLectureByFullname/" + fullname,
            success: function(response) {
                $("#lectureProfile").attr("src","img/lectures/" + response.profile);
            },
            error: function(xhr, status, error) {
            }
        });
    }
        retrieveLectureProfileByUsername();
    

    $("#leavebtn").on("click", () => {
        
        event.preventDefault();
        var lecturerId = parseInt($("#lecturerName").attr("lectureid"));
        var course = parseInt($("#courseId").val());
        var classId = parseInt($("#classId").val());
        var time = parseInt($("#time").val());
        var date = $("#date").val();
        var reason = $("#reason").val();
        var adminId =$("#Approver").val();


        var requestData = {
            lecturer: {lecturerId:lecturerId},
            course: { id: course },
            myClass: { classId: classId },
            studyTime: { timeId: time },
            date: date, 
            reason: reason,
            approver: {adminId: adminId}
        };

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to submit this leave request?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, submit it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/leave-request",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(requestData),  
                    success: function(response) {
                        $("#lecturerName").val("");
                        $("#courseId").val("");
                        $("#classId").val("");
                        $("#time").val("");
                        $("#date").val("");
                        $("#reason").val("");
                        $("#Approver").val("");
    
                        Swal.fire(
                            'Submitted!',
                            'Leave request submitted successfully!',
                            'success'
                        );
                    },
                    error: function(xhr, status, error) {
                    }
                });
            }
        })

        
    });
    


});
