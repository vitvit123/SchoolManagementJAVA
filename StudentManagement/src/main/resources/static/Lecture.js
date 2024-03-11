$(document).ready(function() {


    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
      var LectureName=(getCookie('lecture'));
      $("#username").text(LectureName);

 $("#Logoutbotton").on("click",()=>{
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
            document.cookie = "lecture=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
            window.location.href = "index.html";
        }
    });
 })





 function CloseTab(){
    $("#DashboardContain").css("display","none");
    $("#Check-In-Contain").css("display","none");
    $("#Check-out-Contain").css("display","none");
}

$('#DashboardTab').on('click', function() {
    CloseTab();
    $("#DashboardContain").css("display","block");
});

$('#Check-In-Tab').on('click', function() {
    CloseTab();
    $("#Check-In-Contain").css("display","block");
});

$('#Check-out-Tab').on('click', function() {
    CloseTab();
    $("#Check-out-Contain").css("display","block");
});







});
