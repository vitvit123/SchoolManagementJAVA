$(document).ready(function () {
    // Function to get lecture name from cookie
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Retrieve lecture name from cookie and display it
    var lectureName = getCookie('lecture');
    $("#username").text(lectureName);
    $("#lectureName").text(lectureName);

    // Retrieve lecture profile from cookie and display it
    var lectureProfile = getCookie('Profile');
    $("#lectureProfile").attr("src", "/img/lectures/" + lectureProfile);

    // Handle logout button click
    $("#Logoutbotton").on("click", () => {
        Swal.fire({
            title: 'Are you sure you want to log out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout'
        }).then((result) => {
            // If user confirms, delete cookie and redirect
            if (result.isConfirmed) {
                document.cookie = "lecture=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
                window.location.href = "index.html";
            }
        });
    });

    // Function to close all tabs
    function closeAllTabs() {
        $("#DashboardContain, #Check-In-Contain, #Check-out-Contain, #Request-Permission-Contain").css("display", "none");
    }


    $('#DashboardTab').on('click', function () {
        closeAllTabs();
        $("#DashboardContain").css("display", "block");
    });


    $('#Check-In-Tab').on('click', function () {
        closeAllTabs();
        $("#Check-In-Contain").css("display", "block");
    });


    $('#Check-out-Tab').on('click', function () {
        closeAllTabs();
        $("#Check-out-Contain").css("display", "block");
    });


    $('#Request-Permission-Tab').on('click', function () {
        closeAllTabs();
        $("#Request-Permission-Contain").css("display", "block");

        
        $.get("/lecture-id", function (data) {
            $("#lecturerId").val(data);
        });
    });



});
