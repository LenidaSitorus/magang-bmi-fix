function navigateToPage(selectElement) {
  const selectedValue = selectElement.value;
  console.log("Selected Value: ", selectedValue); // Debugging
  switch (
    selectedValue.toLowerCase() // Ensuring case insensitivity
  ) {
    case "support":
      window.location.href = "lt_support.html";
      break;
    case "troubleshooting":
      window.location.href = "lt_trouble.html";
      break;
    case "modification":
      window.location.href = "lt_modification.html";
      break;
    case "development":
      window.location.href = "lt_development.html";
      break;
    case "training":
      window.location.href = "lt_training.html";
      break;
    default:
      console.log("No matching case for selected value.");
      break;
  }
}

// Fungsi untuk membuka modal create
function openModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");
  modal.style.display = "flex"; // Mengatur display ke flex saat modal dibuka
}

// Fungsi untuk menutup modal create
function closeCreateModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
  modal.style.removeProperty("display"); // Menghapus semua modifikasi pada properti display
}

// Close Create Modal on overlay click
document.getElementById("modal").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closeCreateModal();
  }
});

// Fungsi untuk membuka modal edit
function openEditModal() {
  const modal = document.getElementById("editModal");
  modal.classList.remove("hidden");

  // Populate data for editing example
  const category = "support"; // ini sesuai dengan value dropdown
  const complexity = "Medium";
  const leadtime = 5;

  document.getElementById("editCategory").value = category;
  document.getElementById("editComplexity").value = complexity;
  document.getElementById("editLeadtime").value = leadtime;

  // Set selected for dropdown
  const selectElement = document.getElementById("editCategory");
  Array.from(selectElement.options).forEach((option) => {
    option.selected = option.value === category;
  });
}

// Fungsi untuk menutup modal edit
function closeEditModal() {
  document.getElementById("editModal").classList.add("hidden");
}

// Close Edit Modal on overlay click
document.getElementById("editModal").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closeEditModal();
  }
});

// Fungsi untuk membuka modal delete
function openDeleteModal(projectID) {
  window.projectToDelete = projectID;
  document.getElementById("hapusModal").classList.remove("hidden");
}

// Fungsi untuk menutup modal delete
function closeDeleteModal() {
  document.getElementById("hapusModal").classList.add("hidden");
}

// Close Delete Modal on overlay click
document.getElementById("hapusModal").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closeDeleteModal();
  }
});

// Fungsi untuk submit form create
function submitForm() {
  const category = document.getElementById("category").value;
  const complexity = document.getElementById("complexity").value;
  const leadtime = document.getElementById("leadtime").value;

  console.log({
    category,
    complexity,
    leadtime,
  });
  closeCreateModal();
}

// Fungsi untuk submit form edit
function submitEditForm() {
  const editCategory = document.getElementById("editCategory").value;
  const editComplexity = document.getElementById("editComplexity").value;
  const editLeadtime = document.getElementById("editLeadtime").value;

  console.log({
    editCategory,
    editComplexity,
    editLeadtime,
  });

  closeEditModal();
}

// Fungsi untuk konfirmasi hapus
function confirmDelete() {
  closeDeleteModal();
}

// Fungsi untuk mengganti select menjadi input text saat memilih "Create New"
function toggleEditable(selectElement, field) {
  const selectedValue = selectElement.value;
  if (selectedValue === "new") {
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.name = field;
    inputField.id = field;
    inputField.className = "block w-full px-4 py-2 mb-4 border rounded-lg";
    inputField.placeholder = "Enter new ";
    selectElement.parentNode.replaceChild(inputField, selectElement);
  }
}

const notificationButton = document.getElementById("notificationButton");
const notificationDropdown = document.getElementById("notificationDropdown");

// Toggle visibility of the notification dropdown
notificationButton.addEventListener("click", () => {
  notificationDropdown.classList.toggle("hidden");
});
