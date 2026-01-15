const container = document.getElementById("requestsContainer");
const message = document.getElementById("message");

// Get logged-in userId from localStorage
const currentUserId = localStorage.getItem("userId");

// If not logged in, redirect to login
if (!currentUserId) {
  window.location.href = "/login";
}

const loadRequests = async () => {
  try {
    const response = await fetch(`/api/requests?userId=${currentUserId}`);

    const requests = await response.json();

    container.innerHTML = "";
    if (requests.length === 0) {
      container.innerHTML = "<p>No requests available</p>";
      return;
    }

    requests.forEach((request) => {
      const div = document.createElement("div");

      div.innerHTML = `
        <h3>${request.title}</h3>
        <p><strong>Category:</strong> ${request.category}</p>
        <p>${request.description}</p>
      `;

      // CASE 1: NOT OWNER & OPEN → Accept
      if (request.status === "OPEN" && request.createdBy !== currentUserId) {
        const acceptBtn = document.createElement("button");
        acceptBtn.textContent = "Accept";

        acceptBtn.addEventListener("click", async () => {
          await acceptRequest(request._id);
        });
        div.appendChild(acceptBtn);
      }

      // CASE 2: OWNER & ACCEPTED → Show accepted user + Mark as Completed
      if (
        request.status === "ACCEPTED" &&
        request.createdBy === currentUserId
      ) {
        // Show who accepted the request
        if (request.acceptedBy && request.acceptedBy.name) {
          const acceptedInfo = document.createElement("p");
          acceptedInfo.innerHTML = `<strong>Accepted By:</strong> ${request.acceptedBy.name}`;
          div.appendChild(acceptedInfo);
        }

        // Mark as Completed button
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Mark as Completed";

        completeBtn.addEventListener("click", async () => {
          await completeRequest(request._id);
        });

        div.appendChild(completeBtn);
      }

      // Add a separator
      div.appendChild(document.createElement("hr"));

      container.appendChild(div);
    });
  } catch (error) {
    console.log(error);
    message.textContent = "Failed to load requests";
  }
};

const acceptRequest = async (requestId) => {
  try {
    const response = await fetch(`/api/requests/${requestId}/accept`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: currentUserId }),
    });

    const data = await response.json();

    if (response.ok) {
      message.textContent = "Request accepted";
      loadRequests();
    } else {
      message.textContent = data.message;
    }
  } catch (error) {
    message.textContent = "Error accepting request";
  }
};

const completeRequest = async (requestId) => {
  try {
    const response = await fetch(`/api/requests/${requestId}/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: currentUserId }),
    });

    const data = await response.json();

    if (response.ok) {
      message.textContent = "Request marked as completed";
      loadRequests();
    } else {
      message.textContent = data.message;
    }
  } catch (error) {
    message.textContent = "Error completing request";
  }
};

loadRequests();
