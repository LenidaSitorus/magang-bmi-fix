function openModal(modalId) {
  document.getElementById(modalId).classList.remove("hidden");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
}
// Close Edit Modal on overlay click
document.getElementById("editModal").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closeModal("editModal");
  }
});

// Close Project Modal on overlay click
document.getElementById("projectModal").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closeModal("projectModal");
  }
});

function filterCards(status) {
  const rows = document.querySelectorAll("tbody tr"); // Cari elemen <tr> di dalam <tbody>

  rows.forEach((row) => {
    if (status === "all") {
      row.style.display = "table-row"; // Tampilkan semua row jika status 'all'
    } else {
      const statusElement = row.querySelector("td span"); // Cari elemen <span> yang mengandung status di dalam <td>

      if (statusElement && statusElement.textContent.toLowerCase() === status) {
        row.style.display = "table-row"; // Tampilkan row yang statusnya sesuai (exact match)
      } else {
        row.style.display = "none"; // Sembunyikan row yang statusnya tidak sesuai
      }
    }
  });
}

function closeDeleteModal() {
  const modal = document.getElementById("HapusModal");
  modal.classList.add("hidden");
  modal.style.removeProperty("display"); // Menghapus semua modifikasi pada properti display
}
// Close Delete Modal on overlay click
document.getElementById("HapusModal").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closeDeleteModal();
  }
});

// Tambahkan event.stopPropagation() pada elemen modal agar klik di dalamnya tidak menutup modal
document.querySelector(".bg-white").addEventListener("click", (event) => {
  event.stopPropagation();
});

const addAssigneeBtn = document.getElementById("addAssigneeBtn");
const assigneeDropdown = document.getElementById("assigneeDropdown");
const selectedUsers = document.getElementById("selectedUsers");

// Toggle the assignee dropdown visibility
addAssigneeBtn.addEventListener("click", () => {
  assigneeDropdown.classList.toggle("hidden");
});

// Handle user selection from the dropdown
const userButtons = assigneeDropdown.querySelectorAll("button");
userButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const userName = button.getAttribute("data-user");

    // Create a new element to display the selected user
    const userTag = document.createElement("div");
    userTag.className =
      "flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full";
    userTag.innerHTML = `${userName} <button type="button" class="ml-2 text-red-500 hover:text-red-700 removeUserBtn">&times;</button>`;

    // Append the selected user to the selectedUsers container
    selectedUsers.appendChild(userTag);

    // Hide the dropdown after selecting
    assigneeDropdown.classList.add("hidden");

    // Add event listener to remove the user when the close button is clicked
    userTag.querySelector(".removeUserBtn").addEventListener("click", () => {
      selectedUsers.removeChild(userTag);
    });
  });
});

const addRequestorBtn = document.getElementById("addRequestorBtn");
const requestorDropdown = document.getElementById("requestorDropdown");
const selectedRequestors = document.getElementById("selectedRequestors");

// Toggle dropdown visibility
addRequestorBtn.addEventListener("click", () => {
  requestorDropdown.classList.toggle("hidden");
});

// Handle user selection from dropdown
const requestorButtons = requestorDropdown.querySelectorAll("button");
requestorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const userName = button.getAttribute("data-user");

    // Create a new element to display the selected requestor
    const requestorTag = document.createElement("div");
    requestorTag.className =
      "flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full";
    requestorTag.innerHTML = `${userName} <button type="button" class="ml-2 text-red-500 hover:text-red-700 removeRequestorBtn">&times;</button>`;

    // Append the selected requestor to the selectedRequestors container
    selectedRequestors.appendChild(requestorTag);

    // Hide the dropdown after selecting
    requestorDropdown.classList.add("hidden");

    // Add event listener to remove the requestor when the close button is clicked
    requestorTag
      .querySelector(".removeRequestorBtn")
      .addEventListener("click", () => {
        selectedRequestors.removeChild(requestorTag);
      });
  });
});

function openEditModal(project) {
  // Populate the modal fields with project data
  document.getElementById("editProjectName").value = project.projectName;
  document.getElementById("editProjectStatus").value = project.projectStatus;
  document.getElementById("editProjectArea").value = project.projectArea;
  document.getElementById("editProjectDescription").value =
    project.projectDescription;

  // Populate assignees
  const editSelectedUsers = document.getElementById("editSelectedUsers");
  editSelectedUsers.innerHTML = ""; // Clear previous assignees
  project.assignees.forEach((assignee) => {
    const userTag = document.createElement("div");
    userTag.className =
      "flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full";
    userTag.innerHTML = `${assignee} <button type="button" class="ml-2 text-red-500 hover:text-red-700 removeUserBtn">&times;</button>`;

    // Append the user tag to the selectedUsers container
    editSelectedUsers.appendChild(userTag);

    // Add event listener to remove the user when the close button is clicked
    userTag.querySelector(".removeUserBtn").addEventListener("click", () => {
      editSelectedUsers.removeChild(userTag);
    });
  });

  // Populate requestors (similar to assignees)
  const editSelectedRequestors = document.getElementById(
    "editSelectedRequestors"
  );
  editSelectedRequestors.innerHTML = ""; // Clear previous requestors
  project.projectRequestor.forEach((requestor) => {
    const requestorTag = document.createElement("div");
    requestorTag.className =
      "flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full";
    requestorTag.innerHTML = `${requestor} <button type="button" class="ml-2 text-red-500 hover:text-red-700 removeRequestorBtn">&times;</button>`;

    // Append the requestor tag to the selectedRequestors container
    editSelectedRequestors.appendChild(requestorTag);

    // Add event listener to remove the requestor when the close button is clicked
    requestorTag
      .querySelector(".removeRequestorBtn")
      .addEventListener("click", () => {
        editSelectedRequestors.removeChild(requestorTag);
      });
  });

  // Populate existing URLs
  const urlList = document.getElementById("urlList");
  urlList.innerHTML = ""; // Clear previous URL list
  const editUrlInputs = document.getElementById("editUrlInputs");
  if (project.urls.length > 0) {
    project.urls.forEach((url) => {
      const listItem = document.createElement("li");
      listItem.textContent = url;
      urlList.appendChild(listItem);
    });
    editUrlInputs.classList.remove("hidden");
  } else {
    editUrlInputs.classList.add("hidden");
  }

  // Populate existing files
  const fileList = document.getElementById("fileList");
  fileList.innerHTML = ""; // Clear previous file list
  const editFileInputs = document.getElementById("editFileInputs");
  if (project.files.length > 0) {
    project.files.forEach((file) => {
      const listItem = document.createElement("li");
      listItem.textContent = file; // Assuming file is just a name or URL
      fileList.appendChild(listItem);
    });
    editFileInputs.classList.remove("hidden");
  } else {
    editFileInputs.classList.add("hidden");
  }

  // Open the modal
  document.getElementById("editModal").classList.remove("hidden");
}

// Example usage with sample project data
const projectData = {
  projectName: "Project X",
  projectStatus: "active",
  projectRequestor: ["User 3"],
  projectArea: "Development",
  projectDescription: "This is a sample project description.",
  assignees: ["User 1", "User 2"],
  urls: ["http://example.com", "http://another-example.com"], // Example URLs
  files: ["document1.pdf", "image1.png"], // Example documents
};

// Call this function when the pencil icon is clicked
document.querySelector(".fa-edit").addEventListener("click", () => {
  openEditModal(projectData);
});

document.addEventListener("DOMContentLoaded", () => {
  // Assignees
  const addAssigneeBtn = document.getElementById("editAddAssigneeBtn");
  const assigneeDropdown = document.getElementById("editAssigneeDropdown");
  const selectedUsers = document.getElementById("editSelectedUsers");

  // Toggle dropdown visibility for Assignees
  addAssigneeBtn.addEventListener("click", () => {
    assigneeDropdown.classList.toggle("hidden");
  });

  // Handle user selection for Assignees
  assigneeDropdown.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default action if needed
      const userName = button.getAttribute("data-user");

      // Check if user already selected
      const existingUser = Array.from(selectedUsers.children).some((userTag) =>
        userTag.textContent.includes(userName)
      );
      if (!existingUser) {
        // Create tag for selected user
        const userTag = document.createElement("div");
        userTag.className =
          "flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full";
        userTag.innerHTML = `${userName} <button type="button" class="ml-2 text-red-500 hover:text-red-700 removeUserBtn">&times;</button>`;

        // Append user tag to selectedUsers container
        selectedUsers.appendChild(userTag);

        // Add remove functionality
        userTag
          .querySelector(".removeUserBtn")
          .addEventListener("click", () => {
            selectedUsers.removeChild(userTag);
          });
      }

      // Hide dropdown after selection
      assigneeDropdown.classList.add("hidden");
    });
  });

  // Requestor
  const addRequestorBtn = document.getElementById("editAddRequestorBtn");
  const requestorDropdown = document.getElementById("editRequestorDropdown");
  const selectedRequestors = document.getElementById("editSelectedRequestors");

  // Toggle dropdown visibility for Requestors
  addRequestorBtn.addEventListener("click", () => {
    requestorDropdown.classList.toggle("hidden");
  });

  // Handle user selection for Requestors
  requestorDropdown.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default action if needed
      const userName = button.getAttribute("data-user");

      // Check if user already selected
      const existingRequestor = Array.from(selectedRequestors.children).some(
        (requestorTag) => requestorTag.textContent.includes(userName)
      );
      if (!existingRequestor) {
        // Create tag for selected requestor
        const requestorTag = document.createElement("div");
        requestorTag.className =
          "flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full";
        requestorTag.innerHTML = `${userName} <button type="button" class="ml-2 text-red-500 hover:text-red-700 removeRequestorBtn">&times;</button>`;

        // Append requestor tag to selectedRequestors container
        selectedRequestors.appendChild(requestorTag);

        // Add remove functionality
        requestorTag
          .querySelector(".removeRequestorBtn")
          .addEventListener("click", () => {
            selectedRequestors.removeChild(requestorTag);
          });
      }

      // Hide dropdown after selection
      requestorDropdown.classList.add("hidden");
    });
  });
});

//notif
const notificationButton = document.getElementById("notificationButton");
const notificationDropdown = document.getElementById("notificationDropdown");

// Toggle visibility of the notification dropdown
notificationButton.addEventListener("click", () => {
  notificationDropdown.classList.toggle("hidden");
});

//search bar
function filterTable() {
  const searchValue = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const rows = document.querySelectorAll("#projectTable tbody tr");

  rows.forEach((row) => {
    const rowText = row.innerText.toLowerCase();
    if (rowText.includes(searchValue)) {
      row.style.display = ""; // Tampilkan baris jika cocok
    } else {
      row.style.display = "none"; // Sembunyikan baris jika tidak cocok
    }
  });
}
