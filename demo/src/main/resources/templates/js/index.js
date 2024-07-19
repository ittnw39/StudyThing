///all
/*
var userAgent = navigator.userAgent.toLowerCase();
var isMobile = /iphone|ipod|android|blackberry|opera mini|mobile/i.test(userAgent);
if (!isMobile) {
  window.location.href = "../err/desktop.html";
}
  */

///login페이지
$(document).ready(function(){
    $("#password-box i").on('click', function() {
        $('#password-box input').toggleClass('active');
        if($('#password-box input').hasClass('active')){
            $(this).attr('class',"fa-regular fa-eye-slash")
            .prev('#password-box input').attr('type','text');
        }else{
            $(this).attr('class',"fa-regular fa-eye")
            .prev('#password-box input').attr('type','password');
        }
    })
});

///register페이지

///main