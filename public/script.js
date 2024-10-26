

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("Login form submitted"); // Debugging log

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        console.log("Login response:", result); // Debugging log

        if (result.success) {
            // // alert('Login successful!');
            // // window.location.href = '/home.html';
            // document.getElementById('p-wait').innerHTML = '<p>Please Wait...</p>';
            // setTimeout(function() {
            // console.log("Logined succesfully");
            // window.location.href = '/home.html';
            // }, 2000);

            document.getElementById('myButton').addEventListener('click', function() {
                // Hide the button
                this.style.display = 'none';
                
                // Show the loader
                const loader = document.getElementById('p-wait');
                loader.style.display = 'flex';
            
                // Simulate login success
                setTimeout(function() {
                    console.log("Logged in successfully");
                    window.location.href = '/home.html';
                }, 2000);
            });
            
           
        } else {
            alert('Login failed!');
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
});

document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("Register form submitted"); // Debugging log

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        console.log("Register response:", result); // Debugging log

        if (result.success) {
            alert('Registration successful! now you are redirected to login');
            var element = document.getElementById('login');
            element.style.display="block";
            var element = document.getElementById('register');
            element.style.display="none";

        } else {
            alert('Registration failed!');
        }
    } catch (error) {
        console.error("Error during registration:", error);
    }
});

// Code for Swifting between login and register
function pageswift(){
    var element = document.getElementById('login');
    element.style.display="none";
    var element = document.getElementById('register');
    element.style.display="block";
}
