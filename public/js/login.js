// Get form and message elements
const form = document.getElementById("loginForm");
const message = document.getElementById("message");

// Handle login form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent reload

  // Collect credentials
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Send login request
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Store user context in localStorage
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userName", data.name);

      window.location.href = "/dashboard";
    } else {
      message.textContent = data.message;
    }
  } catch (error) {
    message.textContent = "Login failed";
  }
});
