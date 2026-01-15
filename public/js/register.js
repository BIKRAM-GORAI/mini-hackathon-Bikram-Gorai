// Get form and message elements
const form = document.getElementById("registerForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // stop page reload

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Send register request to backend
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (response.ok) 
        {
            message.textContent = "Registration successful! Redirecting to login...";
            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);
    } 
    else 
    {
      message.textContent = data.message;
    }
  } catch (error) {
    message.textContent = "Registration failed";
  }
});
