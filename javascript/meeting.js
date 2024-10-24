let currentRowIndex = -1; // To keep track of the row being edited

function openEditModal(rowIndex) {
  currentRowIndex = rowIndex; // Set the current row index to the one being edited
  const row = document.querySelectorAll("#projectTableBody tr")[rowIndex];

  // Populate modal fields with current row data
  document.getElementById("modalTitle").innerText = "Edit Meeting";
  document.getElementById("project").value = row.cells[1].textContent; // Update project name

  // Get users from the selected row
  const users = row.cells[2].textContent.split(", "); // Split users into an array
  updateUsers(); // Populate users

  // Check the appropriate user checkboxes
  const checkboxes = document.querySelectorAll("#userCheckboxes input");
  checkboxes.forEach((checkbox) => {
    checkbox.checked = users.includes(checkbox.value); // Mark checkbox as checked if user is in the list
  });

  document.getElementById("date").value = row.cells[3].textContent; // Update date
  document.getElementById("startTime").value = row.cells[4].textContent; // Update start time
  document.getElementById("keterangan").value = row.cells[5].textContent; // Update description

  openModal(); // Open the modal
}

function saveMeeting() {
  const projectSelect = document.getElementById("project");
  const projectText = projectSelect.options[projectSelect.selectedIndex].text; // Get selected project name
  const userCheckboxes = document.getElementById("userCheckboxes");
  const users = Array.from(
    userCheckboxes.querySelectorAll("input:checked")
  ).map((checkbox) => checkbox.value); // Get selected users
  const date = document.getElementById("date").value; // Get date
  const startTime = document.getElementById("startTime").value; // Get start time
  const keterangan = document.getElementById("keterangan").value; // Get description
  const fileInput = document.getElementById("uploadDaftarHadir");
  const file = fileInput.files[0]; // Get uploaded file

  const tableBody = document.getElementById("projectTableBody");

  if (currentRowIndex === -1) {
    // Create new row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td class="py-2 px-4">${tableBody.children.length + 1}</td>
        <td class="py-2 px-4">${projectText || "Tidak ada"}</td>
        <td class="py-2 px-4">${users.join(", ") || "Tidak ada"}</td>
        <td class="py-2 px-4">${date || "Tidak ada"}</td>
        <td class="py-2 px-4">${startTime || "Tidak ada"}</td>
        <td class="py-2 px-4">${keterangan || "Tidak ada"}</td>
        <td class="py-2 px-4">${file ? file.name : "Tidak ada"}</td>
        <td class="py-2 px-4">
            <i class="fas fa-edit text-blue-500 cursor-pointer" onclick="openEditModal(${
              tableBody.children.length
            })"></i>
            <i class="fas fa-trash-alt text-red-500 cursor-pointer" onclick="deleteRow(this)"></i>
        </td>
    `;
    tableBody.appendChild(newRow);
  } else {
    // Update existing row
    const row = tableBody.children[currentRowIndex];
    row.cells[1].textContent = projectText || "Tidak ada"; // Update project name
    row.cells[2].textContent = users.join(", ") || "Tidak ada"; // Update users
    row.cells[3].textContent = date || "Tidak ada"; // Update date
    row.cells[4].textContent = startTime || "Tidak ada"; // Update start time
    row.cells[5].textContent = keterangan || "Tidak ada"; // Update description
    row.cells[6].textContent = file ? file.name : "Tidak ada"; // Update file name
  }

  closeModal(); // Close modal
  currentRowIndex = -1; // Reset row index
}

// Toggle notification dropdown
document
  .getElementById("notificationButton")
  .addEventListener("click", function () {
    const dropdown = document.getElementById("notificationDropdown");
    dropdown.classList.toggle("hidden");
  });

// Close modal
function closeModal(event) {
  if (event) {
    event.stopPropagation(); // Stop propagation if needed
  }
  document.getElementById("modal").classList.add("hidden");
}

// Open modal
function openModal() {
  document.getElementById("modal").classList.remove("hidden");
}

// Function to update user list based on selected project
function updateUsers() {
  const projectSelect = document.getElementById("project");
  const userCheckboxes = document.getElementById("userCheckboxes");
  const selectedProject = projectSelect.value;

  const projectUsers = {
    1: ["User 1", "User 2"],
    2: ["User 3", "User 4"],
  };

  userCheckboxes.innerHTML = ""; // Clear user list

  const users = projectUsers[selectedProject] || [];
  users.forEach((user) => {
    const label = document.createElement("label");
    label.innerHTML = `
        <input type="checkbox" value="${user}" /> ${user}
    `;
    userCheckboxes.appendChild(label);
  });

  // Show message if no users for selected project
  if (users.length === 0) {
    userCheckboxes.innerHTML = `<p>Tidak ada pengguna untuk proyek ini.</p>`;
  }
}

// Delete row
function deleteRow(button) {
  const row = button.closest("tr");
  row.parentNode.removeChild(row);
}

// Filter function
function filterTable() {
  const searchProject = document
    .getElementById("searchProject")
    .value.toLowerCase();
  const searchUser = document.getElementById("searchUser").value.toLowerCase();
  const searchDate = document.getElementById("searchDate").value;

  const table = document.getElementById("projectTableBody");
  const rows = table.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const project = rows[i]
      .getElementsByTagName("td")[1]
      .textContent.toLowerCase();
    const user = rows[i]
      .getElementsByTagName("td")[2]
      .textContent.toLowerCase();
    const date = rows[i].getElementsByTagName("td")[3].textContent;

    if (
      (searchProject === "" || project.includes(searchProject)) &&
      (searchUser === "" || user.includes(searchUser)) &&
      (searchDate === "" || date.includes(searchDate))
    ) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}
function openEditModal(rowIndex) {
  currentRowIndex = rowIndex; // Set the current row index to the one being edited
  const row = document.querySelectorAll("#projectTableBody tr")[rowIndex];

  // Populate modal fields with current row data
  document.getElementById("modalTitle").innerText = "Edit Meeting";
  document.getElementById("project").value = Array.from(
    document.getElementById("project").options
  ).find((option) => option.text === row.cells[1].textContent).value; // Update project value

  // Get users from the selected row
  const users = row.cells[2].textContent.split(", "); // Split users into an array
  updateUsers(); // Populate users

  // Check the appropriate user checkboxes
  const checkboxes = document.querySelectorAll("#userCheckboxes input");
  checkboxes.forEach((checkbox) => {
    checkbox.checked = users.includes(checkbox.value); // Mark checkbox as checked if user is in the list
  });

  document.getElementById("date").value = row.cells[3].textContent; // Update date
  document.getElementById("startTime").value = row.cells[4].textContent; // Update start time
  document.getElementById("keterangan").value = row.cells[5].textContent; // Update description

  openModal(); // Open the modal
}
