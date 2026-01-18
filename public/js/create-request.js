const form = document.getElementById("requestForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  // Prevent page reload
  e.preventDefault();

  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  // Get logged-in userId from localStorage
  const userId = localStorage.getItem("userId");

  // If user is not logged in, redirect to login
  if (!userId) {
    window.location.href = "/login";
  }

  try {
    const response = await fetch("/api/requests", {
      method: "POST",

      // Tell backend we are sending JSON
      headers: {
        "Content-Type": "application/json",
      },

      // Convert JS object to JSON string
      body: JSON.stringify({
        title,
        category,
        description,
        userId,
      }),
    });

    const data = await response.json(); //what does this line do? //It parses the JSON response from the server into a JavaScript object.
    if (response.ok) {
      message.textContent = "Request created successfully";
      form.reset();
    } else {
      message.textContent = data.message;
    }
  } catch (error) {
    message.textContent = "Something went wrong";
  }
});
