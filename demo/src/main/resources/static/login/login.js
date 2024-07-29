document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = loginForm.querySelector("input[type='email']").value;
        const password = loginForm.querySelector("input[type='password']").value;

        const user = {
            email: email,
            password: password
        };

        fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                alert('Invalid email or password.');
                throw new Error('Unauthorized');
            } else {
                throw new Error('An error occurred. Please try again.');
            }
        })
        .then(data => {
            // Handle successful login
            alert('Login successful');
            console.log('Logged in user:', data);
            // Redirect or update UI as needed
            window.location.href = '/index.html';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});