
const userDisplay = document.getElementById('username');
const logoutButton = document.getElementById('logout');
const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

// Retrieving the logged-in user data from sessionStorage

if (loggedInUser) {
    // Display the user's first name
    userDisplay.textContent = loggedInUser.firstname;
} else {
    // Redirect to login page if no session is active
    window.location.href = "login.html";
}

// Logging out

logoutButton.addEventListener('click', () => {
    sessionStorage.removeItem('loggedInUser');
    window.location.href = "login.html";
});






