const form = document.getElementById("requestForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  // Prevent page reload
  e.preventDefault();

  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  // TEMPORARY userId (since no JWT)
  // Later this will come from logged-in user
  const userId = "695f42147f0a8a4c8b40a35f";

  try {
    const response = await fetch("/api/requests", {
      method: "POST",

      // Tell backend we are sending JSON
      headers: {
        "Content-Type": "application/json"
      },

      // Convert JS object to JSON string
      body: JSON.stringify({
        title,
        category,
        description,
        userId
      })
    });

    const data = await response.json();
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
