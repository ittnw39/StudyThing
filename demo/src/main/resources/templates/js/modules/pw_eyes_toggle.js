function pw_eyes_toggle(){
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelector("#password-box i").addEventListener('click', function() {
            var input = document.querySelector('#password-box input');
            var Active = input.classList.toggle('active');
    
            this.setAttribute('class', Active ? "fa-regular fa-eye-slash" : "fa-regular fa-eye");
            input.setAttribute('type', Active ? 'text' : 'password');
        });
    });
    
    document.addEventListener('DOMContentLoaded', function() { /*re-password box*/
        document.querySelector("#re-password-box i").addEventListener('click', function() {
            var input = document.querySelector('#re-password-box input');
            var isActive = input.classList.toggle('active');
    
            this.setAttribute('class', isActive ? "fa-regular fa-eye-slash" : "fa-regular fa-eye");
            input.setAttribute('type', isActive ? 'text' : 'password');
        });
    });
}

export {pw_eyes_toggle};