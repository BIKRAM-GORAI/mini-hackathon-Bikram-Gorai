const container = document.getElementById("requestsContainer");
const message = document.getElementById("message");

const userId = localStorage.getItem("userId");
if (!userId) window.location.href = "/login";

const loadAcceptedRequests = async () => {
  try {
    const response = await fetch(`/api/requests/accepted/${userId}`);
    const requests = await response.json();

    container.innerHTML = "";

    if (requests.length === 0) {
      container.innerHTML = "<p>No accepted requests</p>";
      return;
    }

    requests.forEach((request) => {
      const div = document.createElement("div");

      div.innerHTML = `
        <p><strong>Service Title:</strong> ${request.title}</p>
        <p><strong>Service category:</strong> ${request.category}</p>
        <p><strong>Description:</strong> ${request.description}</p>
        <p><strong>Accepted By:</strong> ${request.acceptedBy.name}</p>
        `;

      const completeBtn = document.createElement("button");
      completeBtn.textContent = "Mark as Completed";

      completeBtn.onclick = async () => {
        await fetch(`/api/requests/${request._id}/complete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
        loadAcceptedRequests();
      };

      div.appendChild(completeBtn);
      container.appendChild(div);
    });
  } catch (error) {
    message.textContent = "Error loading accepted requests";
  }
};

loadAcceptedRequests();
