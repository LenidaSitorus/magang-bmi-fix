// Global variable untuk menyimpan PIC yang dipilih
let selectedUsers = new Set();
let editingRow = null; // To keep track of the row being edited
let rowToDelete = null; // To keep track of the row to be deleted

// Toggle modal visibility
const openModal = (id) =>
  document.getElementById(id).classList.remove("hidden");
const closeModal = (id) => document.getElementById(id).classList.add("hidden");

// Event listener untuk menutup modal saat mengklik di luar konten modal
document.getElementById("modal").addEventListener("click", (event) => {
  // Cek apakah klik terjadi di luar konten modal
  if (event.target === document.getElementById("modal")) {
    closeModal("modal");
  }
});

// Event listener untuk tombol buat baru
document.getElementById("openModalBtn")?.addEventListener("click", () => {
  editingRow = null; // Reset editingRow when opening modal for new entry
  closeModal("modal"); // Close modal to clear previous edits
  document.getElementById("activityForm").reset();
  selectedUsers.clear();
  updateSelectedUsersDisplay();
  openModal("modal");
});

// Event listener untuk tombol close modal
document
  .getElementById("closeModalBtn")
  .addEventListener("click", () => closeModal("modal"));

// Event listener untuk tombol PIC dropdown
document.getElementById("addAssigneeBtn").addEventListener("click", () => {
  const dropdown = document.getElementById("assigneeDropdown");
  dropdown.classList.toggle("hidden");
});

// Event delegation untuk pilihan user dalam dropdown
document.getElementById("assigneeDropdown").addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-user")) {
    const userName = e.target.getAttribute("data-user");
    if (!selectedUsers.has(userName)) {
      selectedUsers.add(userName);
      updateSelectedUsersDisplay(); // Update the display of selected users
    }
  }
});

// Update tampilan user yang dipilih
function updateSelectedUsersDisplay() {
  const container = document.getElementById("selectedUsers");
  container.innerHTML = ""; // Clear current display
  selectedUsers.forEach((user) => {
    const userTag = document.createElement("div");
    userTag.className =
      "bg-gray-200 px-2 py-1 rounded-full flex items-center gap-2";
    userTag.innerHTML = `
      <span>${user}</span>
      <button type="button" class="text-red-500 hover:text-red-700" onclick="removeUser('${user}')">
        <i class="fas fa-times"></i>
      </button>
    `;
    container.appendChild(userTag); // Append the user tag to the container
  });
}

// Remove user from selection
function removeUser(userName) {
  selectedUsers.delete(userName); // Remove the user from the set
  updateSelectedUsersDisplay(); // Update the display
}

// Event listener untuk tombol save
document.getElementById("saveButton").addEventListener("click", function () {
  const projectName = document.getElementById("projectName").value;
  const scope = document.getElementById("scope").value;
  const duration = document.getElementById("duration").value;
  const notes = document.getElementById("notes").value;
  const startSchedule = document.getElementById("startSchedule").value;
  const endSchedule = document.getElementById("endSchedule").value;
  const startRealization = document.getElementById("startRealization").value;
  const endRealization = document.getElementById("endRealization").value;
  const requester = document.getElementById("requester").value; // Get requester value

  // Form validation
  if (
    !projectName ||
    !scope ||
    !duration ||
    !notes ||
    !requester || // Validate requester
    !startSchedule ||
    !endSchedule ||
    !startRealization ||
    !endRealization
  ) {
    alert("Silakan isi semua field yang diperlukan");
    return;
  }

  // Append the new row to the table body or edit the existing row
  const tableBody = document.getElementById("activityTableBody");
  // Edit existing row
  if (editingRow) {
    editingRow.innerHTML = `
    <td style="border: 1px solid #D1D5DB;" class="text-center">${
      Array.from(tableBody.children).indexOf(editingRow) + 1
    }</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">${projectName}</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">${Array.from(
      selectedUsers
    ).join(", ")}</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">${requester}</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">${scope}</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">${duration}</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">${notes}</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">${startSchedule}</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">${endSchedule}</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">${startRealization}</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">${endRealization}</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">
      <button class="edit-btn text-blue-600"><i class="fas fa-edit"></i></button>
      <button class="delete-btn text-red-600"><i class="fas fa-trash"></i></button>
    </td>
    <td class="border 1px solid #D1D5DB px-4 py-2 text-center">
      <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" />
    </td>
  `;
  } else {
    // Create a new row
    const row = document.createElement("tr");
    row.innerHTML = `
    <td style="border: 1px solid #D1D5DB;" class="text-center">${
      tableBody.children.length + 1
    }</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">
      <a href="detail-activityplan.html?projectName=${encodeURIComponent(
        projectName
      )}" class="text-blue-600 hover:underline">${projectName}</a>
    </td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">${Array.from(
      selectedUsers
    ).join(", ")}</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">${requester}</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">${scope}</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">${duration}</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">${notes}</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">${startSchedule}</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">${endSchedule}</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">${startRealization}</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">${endRealization}</td>
    <td style="border: 1px solid #D1D5DB;" class="text-center">
      <button class="edit-btn text-blue-600"><i class="fas fa-edit"></i></button>
      <button class="delete-btn text-red-600"><i class="fas fa-trash"></i></button>
    </td>
    <td class="border 1px solid #D1D5DB px-4 py-2 text-center">
      <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" />
    </td>
  `;
    tableBody.appendChild(row); // Append the new row to the table body
  }

  // Reset form after saving
  document.getElementById("activityForm").reset();
  selectedUsers.clear();
  updateSelectedUsersDisplay(); // Clear selected users display
  closeModal("modal"); // Close the modal
});

// Event delegation for edit buttons
document.getElementById("activityTableBody").addEventListener("click", (e) => {
  if (e.target.closest(".edit-btn")) {
    const row = e.target.closest("tr"); // Get the row to edit
    editingRow = row; // Set the row being edited

    // Populate the modal with the existing row data
    const cells = row.getElementsByTagName("td");
    document.getElementById("projectName").value = cells[1].innerText;
    document.getElementById("scope").value = cells[4].innerText;
    document.getElementById("duration").value = cells[5].innerText;
    document.getElementById("notes").value = cells[6].innerText;
    document.getElementById("startSchedule").value = cells[7].innerText;
    document.getElementById("endSchedule").value = cells[8].innerText;
    document.getElementById("startRealization").value = cells[9].innerText;
    document.getElementById("endRealization").value = cells[10].innerText;
    document.getElementById("requester").value = cells[3].innerText; // Populate requester

    selectedUsers.clear(); // Clear current selection
    const assignees = cells[2].innerText.split(", ");
    assignees.forEach((user) => selectedUsers.add(user)); // Add existing users to selection
    updateSelectedUsersDisplay(); // Update display
    openModal("modal"); // Open the modal
  }
});

// Event delegation untuk delete button
document
  .getElementById("activityTableBody")
  .addEventListener("click", (event) => {
    if (event.target.closest(".delete-btn")) {
      rowToDelete = event.target.closest("tr");
      openModal("HapusModal"); // Panggil fungsi untuk membuka modal hapus
    }
  });

// Konfirmasi hapus
document.getElementById("confirmDelete").addEventListener("click", () => {
  if (rowToDelete) {
    rowToDelete.remove(); // Hapus baris dari tabel
    rowToDelete = null; // Reset untuk baris yang akan dihapus
    closeModal("HapusModal"); // Tutup modal
  }
});
// Event listener untuk menutup modal saat mengklik di luar konten modal
document.getElementById("HapusModal").addEventListener("click", (event) => {
  // Cek apakah klik terjadi di luar konten modal
  if (event.target === document.getElementById("HapusModal")) {
    closeModal("HapusModal");
  }
});

// Fungsi untuk memfilter tabel berdasarkan kata kunci
document.getElementById("searchInput").addEventListener("input", function () {
  const searchValue = this.value.toLowerCase();
  const rows = document.querySelectorAll("#activityTableBody tr");

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const rowText = Array.from(cells)
      .map((cell) => cell.textContent.toLowerCase())
      .join(" ");

    if (rowText.includes(searchValue)) {
      row.style.display = ""; // Tampilkan baris jika cocok
    } else {
      row.style.display = "none"; // Sembunyikan baris jika tidak cocok
    }
  });
});
// Toggle visibility of the notification dropdown
notificationButton.addEventListener("click", () => {
  notificationDropdown.classList.toggle("hidden");
});
