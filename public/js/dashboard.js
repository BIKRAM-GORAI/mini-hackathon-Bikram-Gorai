// Get username from localStorage
const name = localStorage.getItem("userName");

// If user is not logged in, redirect to login
if (!name) {
  window.location.href = "/login";
}

// Show welcome message
document.getElementById("welcome").textContent = `Welcome, ${name}`;

// Navigation functions
function goCreate() {
  window.location.href = "/create-request";
}

function goBrowse() {
  window.location.href = "/browse-requests";
}

function goAccepted() {
  window.location.href = "/accepted-requests";
}
