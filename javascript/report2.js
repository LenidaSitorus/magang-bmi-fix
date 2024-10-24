function openModal() {
  document.getElementById("myModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

// Tambahkan event listener untuk menutup modal jika mengklik di luar modal-content
document.getElementById("myModal").addEventListener("click", function (event) {
  if (event.target === this) {
    // Jika klik di luar modal-content
    closeModal(); // Tutup modal
  }
});

function openEditPanel() {
  const editPanel = document.getElementById("editPanel");
  const overlay = document.getElementById("overlay"); // Dapatkan elemen overlay

  overlay.classList.add("show"); // Tampilkan overlay
  editPanel.classList.add("show"); // Tampilkan panel edit
}

function closeEditPanel() {
  const editPanel = document.getElementById("editPanel");
  const overlay = document.getElementById("overlay"); // Dapatkan elemen overlay

  overlay.classList.remove("show"); // Sembunyikan overlay
  editPanel.classList.remove("show"); // Sembunyikan panel edit
}

// Tambahkan event listener agar bisa menutup panel ketika overlay diklik
document.getElementById("overlay").addEventListener("click", closeEditPanel);
// Function to handle row deletion
let deleteButtonReference = null; // Variabel untuk menyimpan referensi tombol hapus

// Fungsi untuk membuka modal hapus dan menyimpan referensi tombol yang diklik
function openHapusModal(button) {
  deleteButtonReference = button; // Simpan referensi tombol hapus
  document.getElementById("HapusModal").classList.remove("hidden"); // Buka modal hapus
}

// Fungsi untuk menutup modal hapus
function closeHapusModal() {
  document.getElementById("HapusModal").classList.add("hidden");
}

// Tambahkan event listener untuk menutup modal jika mengklik di luar modal
document
  .getElementById("HapusModal")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      closeHapusModal(); // Tutup modal hapus
    }
  });

// Fungsi untuk menghapus baris tabel setelah konfirmasi
document
  .getElementById("confirmDeleteButton")
  .addEventListener("click", function () {
    if (deleteButtonReference) {
      deleteTableRow(deleteButtonReference); // Hapus baris tabel yang terkait dengan tombol hapus
      deleteButtonReference = null; // Reset referensi tombol setelah dihapus
    }
    closeHapusModal(); // Tutup modal setelah penghapusan
  });

// Fungsi untuk menghapus baris tabel
function deleteTableRow(button) {
  const row = button.closest("tr"); // Temukan elemen <tr> terdekat dari tombol
  if (row) {
    row.remove(); // Hapus baris
  }
}

// Function to open the edit modal
function openEditActivityModal() {
  document.getElementById("editModal").classList.remove("hidden");
}

// Function to close the edit modal
function closeEditModal() {
  document.getElementById("editModal").classList.add("hidden");
}

// Optionally, you can close the modal by clicking outside of it
window.onclick = function (event) {
  const modal = document.getElementById("editModal");
  if (event.target === modal) {
    closeEditModal();
  }
};
function openEditActivityModal() {
  console.log("Modal opened"); // Untuk debugging
  const modal = document.getElementById("editModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeEditModal() {
  const modal = document.getElementById("editModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}
