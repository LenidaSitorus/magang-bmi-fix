function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      // Update both profile picture previews
      document.getElementById("profilePreview").src = e.target.result;
      document.getElementById("mainProfilePreview").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

const notificationButton = document.getElementById("notificationButton");
const notificationDropdown = document.getElementById("notificationDropdown");

// Toggle visibility of the notification dropdown
notificationButton.addEventListener("click", () => {
  notificationDropdown.classList.toggle("hidden");
});
