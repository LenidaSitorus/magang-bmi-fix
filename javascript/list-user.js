// Close modal when clicking outside the modal content
window.addEventListener("click", function (event) {
  const modals = ["createModal", "editModal", "HapusModal"];
  modals.forEach((modalId) => {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector(".modal-content");
    if (event.target === modal && !modalContent.contains(event.target)) {
      closeModal(modalId);
    }
  });
});

function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
}

function openModal(modalId) {
  document.getElementById(modalId).classList.remove("hidden");
}

function openEditModal(user) {
  document.getElementById("editUserId").value = user.userId;
  document.getElementById("editFirstName").value = user.firstName;
  document.getElementById("editLastName").value = user.lastName;
  document.getElementById("editEmail").value = user.email;
  document.getElementById("editMobile").value = user.mobile;
  document.getElementById("editRole").value = user.role;
  document.getElementById("editUsername").value = user.username;
  document.getElementById("editPassword").value = user.password; // Tambahkan ini

  // Open the modal
  document.getElementById("editModal").classList.remove("hidden");
}

const userData = {
  userId: "01",
  firstName: "Zeva",
  lastName: "Lorensia",
  email: "zeva@gmail.com",
  mobile: "1234567890",
  role: "team", // Pastikan role sudah diisi
  username: "zeva",
  password: "password123", // Tambahkan password di sini
};

// Call this function when the pencil icon is clicked
document.querySelector(".fa-edit").addEventListener("click", () => {
  openEditModal(userData);
});

const notificationButton = document.getElementById("notificationButton");
const notificationDropdown = document.getElementById("notificationDropdown");

// Toggle visibility of the notification dropdown
notificationButton.addEventListener("click", () => {
  notificationDropdown.classList.toggle("hidden");
});
