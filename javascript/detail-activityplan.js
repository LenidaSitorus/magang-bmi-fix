const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const saveButton = document.getElementById("saveButton");
const modal = document.getElementById("modal");
const activityPlanBody = document.getElementById("activityPlanBody");
let editingRow = null; // Track the row being edited
let rowToDelete = null; // Track the row to be deleted

// Open modal for creating a new entry
openModalBtn.addEventListener("click", () => {
  clearForm(); // Clear form when creating a new entry
  editingRow = null; // Reset editingRow for new entry
  modal.classList.remove("hidden");
});

// Close modal
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Close modal when clicking outside of the modal content
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

// Save data to table
saveButton.addEventListener("click", () => {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const description = document.getElementById("description").value;

  // Validate input
  if (startDate && endDate && description) {
    if (editingRow) {
      // Update the row if we are editing
      editingRow.cells[0].textContent = startDate;
      editingRow.cells[1].textContent = endDate;
      editingRow.cells[4].textContent = description;
    } else {
      // Create a new row if we are not editing
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td class="border px-4 py-2">${startDate}</td>
        <td class="border px-4 py-2">${endDate}</td>
        <td class="border px-4 py-2">-</td>
        <td class="border px-4 py-2">-</td>
        <td class="border px-4 py-2">${description}</td>
        <td class="border px-4 py-2 text-center">
          <i class="fas fa-edit text-blue-500 cursor-pointer" onclick="openEditModal(this)"></i>
          <i class="fas fa-trash-alt text-red-500 cursor-pointer" onclick="openDeleteModal(this.closest('tr'))"></i>
        </td>
      `;
      activityPlanBody.appendChild(newRow);
    }
    modal.classList.add("hidden"); // Close the modal after saving
  } else {
    alert("Please fill out all fields");
  }
});

// Open the modal to edit a row
function openEditModal(editIcon) {
  editingRow = editIcon.closest("tr"); // Store the row being edited
  document.getElementById("startDate").value = editingRow.cells[0].textContent;
  document.getElementById("endDate").value = editingRow.cells[1].textContent;
  document.getElementById("description").value =
    editingRow.cells[4].textContent;
  modal.classList.remove("hidden");
}

// Open the delete modal for a specific row
function openDeleteModal(row) {
  rowToDelete = row; // Set the row to be deleted
  document.getElementById("HapusModal").classList.remove("hidden");
}

// Close modal
function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
}

// Close the delete modal when clicking outside of its content
const deleteModal = document.getElementById("HapusModal");
deleteModal.addEventListener("click", (event) => {
  if (event.target === deleteModal) {
    closeModal("HapusModal");
  }
});

// Confirm delete
document.getElementById("confirmDelete").addEventListener("click", () => {
  if (rowToDelete) {
    rowToDelete.remove(); // Remove the selected row
    rowToDelete = null; // Reset after deletion
  }
  closeModal("HapusModal"); // Close the delete modal after deletion
});

// Clear the form
function clearForm() {
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
  document.getElementById("description").value = "";
}

//notif
const notificationButton = document.getElementById("notificationButton");
const notificationDropdown = document.getElementById("notificationDropdown");

// Toggle visibility of the notification dropdown
notificationButton.addEventListener("click", () => {
  notificationDropdown.classList.toggle("hidden");
});
