///all
/*
var userAgent = navigator.userAgent.toLowerCase();
var isMobile = /iphone|ipod|android|blackberry|opera mini|mobile/i.test(userAgent);
if (!isMobile) {
  window.location.href = "../err/desktop.html";
}
*/


//PASSWORD EYES TOGGLE
$(document).ready(function() { /*password box*/
    $("#password-box i").on('click', function() {
        var $input = $('#password-box input');
        var Active = $input.toggleClass('active').hasClass('active');

        $(this).attr('class', Active ? "fa-regular fa-eye-slash" : "fa-regular fa-eye");
        $input.attr('type', Active ? 'text' : 'password');
    });
});

$(document).ready(function() { /*re-password box*/
    $("#re-password-box i").on('click', function() {
        var $input = $('#re-password-box input');
        var isActive = $input.toggleClass('active').hasClass('active');

        $(this).attr('class', isActive ? "fa-regular fa-eye-slash" : "fa-regular fa-eye");
        $input.attr('type', isActive ? 'text' : 'password');
    });
});

///register-validation

$(document).ready(function() {
    /*비밀번호 일치 검증*/
    let pw_checked = false;
    
    $('#re-password-box input').on('change', function() {
        $('#ns-pw-match-error').hide();
        var pw_raw = $('#password-box input').val();
        if($('#re-password-box input').val() == pw_raw){
            $(this).css('border','1px solid green');
            pw_checked = true;
        }else{
            $(this).css('border','1px solid red');
            $('#ns-pw-match-error').show();
        }
    });

    $('#register').on('submit', function(event) {
        let validated = true;  
         
        const email = $('#textbox-email').val();
        const email_pattern = new RegExp('[a-zA-Z0-9._-]+@mju.ac.kr');
        if (email === ""){  
            validated = false;
            $('#email-validation-error').text("이메일을 입력해주세요.");
            $('#email-validation-error').show();
        }else if( !email_pattern.test(email)){ 
            validated = false;
            $('#email-validation-error').text("유효한 이메일을 입력해주세요.");
            $('#email-validation-error').show();
        }else{
            $('#email-validation-error').hide();
        }

        const name = $('#textbox-name').val();
        if (name === ""){ 
            validated = false;
            $('#name-validation-error').text("이름을 입력해주세요.");
            $('#name-validation-error').show();
        }else{
            $('#name-validation-error').hide();
        }

        /*비밀번호 유효성 규칙*/
        const pw_pattern = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$');

        const pw = $('#textbox-pw-raw').val();
        if (pw === ""){
            validated = false;
            $('#pw-validation-checked-error').text("비밀번호를 입력해주세요.");
            $('#pw-validation-checked-error').show();
        }else if(!pw_pattern.test(pw)){
            validated = false;
            $('#pw-validation-checked-error').text("비밀번호는 8자 이상, 영문자, 숫자, 특수문자를 포함해야 합니다.");
            $('#pw-validation-checked-error').show();
        }else if(!pw_checked){
            validated = false;
            $('#pw-validation-checked-error').text("비밀번호 확인을 해주세요.");
            $('#pw-validation-checked-error').show();
        }else{
            $('#pw-validation-checked-error').hide();
        }

        if(!validated) {
            event.preventDefault();
            console.log('submit blocked.');
        }
    });
});