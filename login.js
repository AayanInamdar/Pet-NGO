document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const signInForm = document.getElementById('signin-form');
    const signUpForm = document.getElementById('signup-form');
    const signInEmail = document.querySelector('.sign-in input[type="email"]');
    const signInPassword = document.querySelector('.sign-in input[type="password"]');
    const signUpEmail = document.querySelector('.sign-up input[type="email"]');
    const signUpPassword = document.querySelector('.sign-up input[type="password"]');
    const signUpName = document.querySelector('.sign-up input[type="text"]');

    // Load saved credentials if they exist (autocomplete for last used user)
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Auto-fill last logged-in user
    if (localStorage.getItem("lastUser")) {
        const lastUser = JSON.parse(localStorage.getItem("lastUser"));
        signInEmail.value = lastUser.email;
        signInPassword.value = lastUser.password;
    }

    // When clicking "Sign Up" -> Save details and switch to "Sign In"
    signUpForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page reload

        const name = signUpName.value.trim();
        const email = signUpEmail.value.trim();
        const password = signUpPassword.value.trim();

        if (name === "" || email === "" || password === "") {
            alert("Please fill in all fields.");
            return;
        }

        // Check if email already exists
        if (users.some(user => user.email === email)) {
            alert("This email is already registered. Please use another email.");
            return;
        }

        // Save new user to array and store in localStorage
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Account created successfully! Please sign in.");

        // Switch to Sign In section
        container.classList.remove("active");
    });

    // When clicking "Sign In" -> Validate and Redirect
    signInForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page reload

        const enteredEmail = signInEmail.value.trim();
        const enteredPassword = signInPassword.value.trim();

        // Find user by email
        const foundUser = users.find(user => user.email === enteredEmail);

        if (foundUser && foundUser.password === enteredPassword) {
            alert("Login successful!");

            // Save last logged-in user (for autofill next time)
            localStorage.setItem("lastUser", JSON.stringify(foundUser));

            // Redirect only if successful
            window.location.href = "index.html";
        } else {
            alert("Invalid email or password. Please try again.");
        }
    });

    // Toggle buttons to manually switch between sections
    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });
});



//backend js

document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = new FormData(this);

    fetch("signup.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || data.error);
        })
        .catch(error => console.error("Error:", error));
});




document.getElementById("signin-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = new FormData(this);

    fetch("signin.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert("Welcome, " + data.name);
            } else {
                alert(data.error);
            }
        })
        .catch(error => console.error("Error:", error));
});