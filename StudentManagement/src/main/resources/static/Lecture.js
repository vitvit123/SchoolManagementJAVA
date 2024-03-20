$(document).ready(function () {
    
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
                    lecturerId = lecture.lecturerId;
                    $("#lecturerName").attr("lectureid",lecturerId);
                    $("#username").attr("lectureid",lecturerId);
                    
                    
                $.ajax({
                    url: `/requestresultss`, 
                    type: 'GET',
                    success: function(response) {
                        // response.reverse();
                        response.reverse();

                        responseData = response;
                        console.log(response);
                        
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
                            if (response.length > 0) {
                                var course = response[0].course;
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
                        $("#ResponseText").text("Your request was Pending");
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
