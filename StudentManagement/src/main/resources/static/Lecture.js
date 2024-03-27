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
                    
                var responsescore;
                $.ajax({
                    type: "GET",
                    url: "/retrievescores",
                    contentType: "application/json",
                    success: function(response) {
                        responsescore=response.reverse();
        
                    },
                });
                    console.log(lecturerId);
                    $.ajax({
                        url: `/enrollments/fetchrequestpermission/${lecturerId}`, 
                        type: "GET",
                        success: function(response) {
                            
                            var cardContainer = $('#Check-out-Contain');
                            
                            var cardCount = 0;
                            
                            
                            response.forEach(function(entry) {
                                if (cardCount % 3 === 0) {
                                    cardContainer.append('<div class="row"></div>');
                                }
                
                                var cardHtml = '<div class="col-md-4 mb-3" style="width: 100%;">';
                                cardHtml += '<div class="card">';
                                cardHtml += '<img src="img/students/' + entry.student.profile + '" class="card-img-top" alt="Student Image">';                                
                                cardHtml += '<div class="card-body">';
                                cardHtml += '<h5 class="card-title">' + entry.student.fullname + '</h5>';
                                cardHtml += '<p class="card-text">Student ID: ' + entry.student.studentId + '</p>';
                                cardHtml += '<div id="managebtnpermission" style="display: flex;">';
                                cardHtml += '<button style="width: 30%;height:40px" subject="'+entry.course.id+'" data-student-id="' + entry.student.studentId + '"  class="btn btn-warning permissionpermission"><i class="fa fa-wheelchair-alt" aria-hidden="true"></i></button>';
                                cardHtml += '<button style="width: 30%;margin-left:10px;" subject="'+entry.course.id+'" data-student-id="' + entry.student.studentId + '" style="margin-left: 10px;" class="btn btn-danger rejectpermission"><i class="fa fa-times-circle" aria-hidden="true"></i></button>';
                                cardHtml += '<button style="width: 30%;margin-left:10px;" subject="'+entry.course.id+'"  data-student-id="' + entry.student.studentId + '" style="margin-left: 10px;" class="btn btn-success approvepermission"><i class="fa fa-check-circle" aria-hidden="true"></i></button>';
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

                            console.log(responsescore);

                            

                            var html = '';
                            response.forEach(function(entry) {
                      

                                html += '<tr>';
                                html += '<td>' + entry.student.fullname + '</td>';
                                html += '<td>' + entry.startDate + '</td>';
                                html += '<td>' + entry.endDate + '</td>';
                                html += '<td>' + entry.studyTime.dayOfWeek + ' ' + entry.studyTime.startTime + ' - ' + entry.studyTime.endTime + '</td>';

                                var ddata;
                                var midTermFound = 0;
                                var quizTotal = 0;
                                var final=0;
                                var midtermScore = 0; 
                                var quizScore = 0; 
                                var total;
                                
                                for (var i = 0; i < responsescore.length; i++) {
                                    if (responsescore[i].student.fullname == entry.student.fullname) {
                                        ddata = responsescore[i];
                                        if (ddata && ddata.midTerm !== undefined) {
                                            html += '<td>' + ddata.midTerm + '</td>';
                                            midTermFound =  ddata.midTerm;
                                        }
                                        if (ddata && ddata.quiz !== undefined) {
                                            html += '<td>' + ddata.quiz + '</td>';
                                            quizTotal = ddata.quiz; 
                                        }
                                        if (ddata && ddata.finalGrade !== undefined) {
                                            html += '<td>' + ddata.finalGrade + '</td>';
                                            final = ddata.finalGrade; 
                                        }

                                        if(!midTermFound && !quizTotal  && !final){
                                            html += '<td>0</td>';
                                        }
                                        else{
                                            total = midTermFound*0.35+ quizTotal*0.15+final*0.50; 
                                            html += '<td>' + total +'%'+ '</td>';
                                        }
                                        if(total<60){
                                            html += '<td><b>Failed</b></td>';
                                        }
                                        else {
                                            html += '<td><b>Passed</b></td>';
                                        }



                                        break; 
                                    }
                                }
                                if (!midTermFound) {
                                    html += '<td>0</td>';
                                }
  
                                if (quizTotal === 0) {
                                    html += '<td>0</td>';
                                } 
                                if (final === 0) {
                                    html += '<td>0</td>';
                                } 
                                if (total == undefined) {
                                    html += '<td>0</td>';
                                    html += '<td><b>Data Pending</b></td>';
                                    html += '<td><button subjectname="' + entry.student.subject + '" subject="' + entry.course.id + '" data-student-id="' + entry.student.studentId + '"  class="btn btn-success ScoreStudent">Score</button></td>';                                html += '</tr>';
                                } 
                                else{
                                    html += '<td><button disabled subjectname="' + entry.student.subject + '" subject="' + entry.course.id + '" data-student-id="' + entry.student.studentId + '"  class="btn btn-success ScoreStudent">Score</button></td>';html += '</tr>';

                                }

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

    $(document).on("click", ".ScoreStudent", function() {
        var studentName = $(this).closest('tr').find('td:first').text();
        var subject = $(this).attr('subjectname');
        var subjectID=$(this).attr('subject');
        var stuid=$(this).attr("data-student-id");

        // Create modal dynamically
        var modalHtml = '<div class="modal fade" id="scoreModal" tabindex="-1" role="dialog" aria-labelledby="scoreModalLabel" aria-hidden="true">';
        modalHtml += '<div class="modal-dialog" role="document">';
        modalHtml += '<div class="modal-content">';
        modalHtml += '<div class="modal-header">';
        modalHtml += '<h5 class="modal-title" id="scoreModalLabel">Enter Scores for ';
        modalHtml += '<span id="ModelStudentName">' + studentName + '</span> - ';
        modalHtml += '<span id="ModelSubjectID">' + subjectID + '</span> ';
        modalHtml += '<span id="ModelSubject">' + subject + '</span>';
        modalHtml += '<span style="display:none" id="ModelStuID">' + stuid + '</span>';
        modalHtml += '</h5>';        modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
        modalHtml += '<span aria-hidden="true">&times;</span>';
        modalHtml += '</button>';
        modalHtml += '</div>';
        modalHtml += '<div class="modal-body">';
        modalHtml += '<div class="form-group">';
        modalHtml += '<label for="midtermScore">Midterm Score:</label>';
        modalHtml += '<input type="text" class="form-control" id="midtermScore">';
        modalHtml += '</div>';
        modalHtml += '<div class="form-group">';
        modalHtml += '<label for="finalScore">Final Score:</label>';
        modalHtml += '<input type="text" class="form-control" id="finalScore">';
        modalHtml += '</div>';
        modalHtml += '<div class="form-group">';
        modalHtml += '<label for="quizScore">Quiz Score:</label>';
        modalHtml += '<input type="text" class="form-control" id="quizScore">';
        modalHtml += '</div>';
        modalHtml += '</div>';
        modalHtml += '<div class="modal-footer">';
        modalHtml += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
        modalHtml += '<button type="button" class="btn btn-primary" id="saveScores">Save Scores</button>';
        modalHtml += '</div>';
        modalHtml += '</div>';
        modalHtml += '</div>';
        modalHtml += '</div>';
    
        // Append modal HTML to the body
        $('body').append(modalHtml);
    
        // Show modal dialog
        $('#scoreModal').modal('show');
    
    
        $('#scoreModal').on('hidden.bs.modal', function (e) {
            $(this).remove();
        });
    });
    
    $(document).on("click", "#saveScores", function() {

        var midtermScore = $('#midtermScore').val();
        var finalScore = $('#finalScore').val();
        var quizScore = $('#quizScore').val(); 
        

        $('#scoreModal').modal('hide');
        var course = $("#ModelSubjectID").text();
        var studentID = $("#ModelStuID").text();
        var midterm = $("#midtermScore").val();
        var finalGrade = $("#finalScore").val();
        var quiz = $("#quizScore").val();
    
        var scoreData = {
            student: { studentId: studentID },
            course: { id: course },
            midTerm: midterm,
            finalGrade: finalGrade,
            quiz: quiz
        };

    

        $.ajax({
            type: "POST",
            url: "/saveScores",
            contentType: "application/json",
            data: JSON.stringify(scoreData),
            success: function(response) {
                console.log(response);
                Swal.fire({
                    title: "Success!",
                    text: "Scores recorded successfully",
                    icon: "success"
                });
            },
            error: function(xhr, status, error) {
                console.error("Error saving scores:", error);
            }
        });
    });
    

    


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
            },
            error: function(xhr, status, error) {
                Swal.fire({
                    title: "Success!",
                    text: "Permission has been approve successfully!",
                    icon: "success"
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
                Swal.fire({
                    title: "Success!",
                    text: "Reject Permission",
                    icon: "error"
                })
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
            },
            error: function(xhr, status, error) {
                Swal.fire({
                    title: "Success!",
                    text: "Permission",
                    icon: "warning"
                })
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
