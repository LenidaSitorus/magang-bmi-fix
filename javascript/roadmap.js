const projectFilter = document.getElementById("projectFilter");
const userProjectRows = document.querySelectorAll(".user-project");

projectFilter.addEventListener("change", function () {
  const selectedProject = this.value;

  userProjectRows.forEach(function (row) {
    const userProjects = row.getAttribute("data-project").split(" ");

    // Show row if "All" is selected or if user has the selected project
    if (selectedProject === "all" || userProjects.includes(selectedProject)) {
      row.style.display = "flex"; // Show the row
    } else {
      row.style.display = "none"; // Hide the row
    }
  });
});
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentDate = new Date();

// Get the elements
const monthDisplay = document.getElementById("monthDisplay");
const daysRow = document.getElementById("daysRow");

// Function to render calendar
function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Set the month name
  monthDisplay.textContent = `${monthNames[month]} ${year}`;

  // Get the number of days in the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Clear previous days
  daysRow.innerHTML = "";

  // Add days dynamically
  for (let i = 1; i <= daysInMonth; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("text-center");
    dayElement.textContent = i < 10 ? `0${i}` : i;
    daysRow.appendChild(dayElement);
  }
}
// Button click events to change month
document.getElementById("prevMonthBtn").addEventListener("click", function () {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

document.getElementById("nextMonthBtn").addEventListener("click", function () {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Render the calendar for the first time
renderCalendar();

const notificationButton = document.getElementById("notificationButton");
const notificationDropdown = document.getElementById("notificationDropdown");

// Toggle visibility of the notification dropdown
notificationButton.addEventListener("click", () => {
  notificationDropdown.classList.toggle("hidden");
});
