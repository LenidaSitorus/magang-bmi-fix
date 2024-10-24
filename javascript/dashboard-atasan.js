document.addEventListener("DOMContentLoaded", function () {
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");

  if (dropdownButton) {
    dropdownButton.addEventListener("click", () => {
      dropdownMenu.classList.toggle("hidden");
    });

    // Close the dropdown when clicking outside
    document.addEventListener("click", (event) => {
      if (
        !dropdownButton.contains(event.target) &&
        !dropdownMenu.contains(event.target)
      ) {
        dropdownMenu.classList.add("hidden");
      }
    });
  }

  // Inisialisasi variabel untuk tanggal
  let currentDate = new Date();
  let today = new Date(); // Menyimpan tanggal hari ini

  // Fungsi untuk menampilkan bulan dan tahun di header
  function updateMonthYear() {
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
    const monthYear = document.getElementById("monthYear");
    if (monthYear) {
      monthYear.innerText =
        monthNames[currentDate.getMonth()] + " " + currentDate.getFullYear();
    }
  }

  // Fungsi untuk membuat kalender berdasarkan bulan yang dipilih
  function generateCalendar() {
    const calendarBody = document.getElementById("calendarBody");
    if (calendarBody) {
      calendarBody.innerHTML = "";

      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      ).getDay();
      const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();

      let date = 1;
      for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
          const cell = document.createElement("td");
          cell.classList.add("py-2", "text-center");

          if (i === 0 && j < firstDayOfMonth) {
            // Kosongkan sel sebelum tanggal 1
            cell.innerHTML = "";
          } else if (date > daysInMonth) {
            // Kosongkan sel setelah hari terakhir bulan
            cell.innerHTML = "";
          } else {
            cell.innerHTML = date;

            // Highlight hari ini
            if (
              date === today.getDate() &&
              currentDate.getMonth() === today.getMonth() &&
              currentDate.getFullYear() === today.getFullYear()
            ) {
              cell.classList.add("bg-blue-900", "text-white", "rounded-full");
            }

            date++;
          }

          row.appendChild(cell);
        }

        calendarBody.appendChild(row);
      }
    }
  }

  // Fungsi untuk navigasi ke bulan berikutnya
  function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateMonthYear();
    generateCalendar();
  }

  // Fungsi untuk navigasi ke bulan sebelumnya
  function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateMonthYear();
    generateCalendar();
  }

  // Event listeners untuk tombol navigasi bulan
  const nextMonthBtn = document.getElementById("nextMonth");
  const prevMonthBtn = document.getElementById("prevMonth");

  if (nextMonthBtn && prevMonthBtn) {
    nextMonthBtn.addEventListener("click", nextMonth);
    prevMonthBtn.addEventListener("click", prevMonth);
  }

  // Inisialisasi kalender saat halaman dimuat
  updateMonthYear();
  generateCalendar();
});

const notificationButton = document.getElementById("notificationButton");
const notificationDropdown = document.getElementById("notificationDropdown");

// Toggle visibility of the notification dropdown
notificationButton.addEventListener("click", () => {
  notificationDropdown.classList.toggle("hidden");
});

function filterProjects() {
  const filterValue = document.getElementById("projectStatusFilter").value;
  const projects = document.querySelectorAll("#projectList .project");

  projects.forEach((project) => {
    const status = project.getAttribute("data-status");

    if (filterValue === "all" || filterValue === status) {
      project.style.display = "flex";
    } else {
      project.style.display = "none";
    }
  });
}

const meetingFilter = document.getElementById("meetingFilter");
const meetings = document.querySelectorAll(
  ".bg-white.p-3.rounded-lg.shadow-lg"
);

meetingFilter.addEventListener("change", function () {
  const selectedMeeting = this.value;

  meetings.forEach(function (meeting) {
    if (selectedMeeting === "all") {
      meeting.style.display = "block";
    } else {
      if (meeting.getAttribute("data-project") === selectedMeeting) {
        meeting.style.display = "block";
      } else {
        meeting.style.display = "none";
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const activityFilter = document.getElementById("activityFilter");
  const activities = document.querySelectorAll(".activity");

  activityFilter.addEventListener("change", function () {
    const selectedProject = this.value; // Ambil nilai dari filter yang dipilih

    activities.forEach(function (activity) {
      if (selectedProject === "all") {
        activity.style.display = "flex"; // Tampilkan semua aktivitas
      } else {
        // Ambil nilai proyek dari atribut data-project
        if (activity.getAttribute("data-project") === selectedProject) {
          activity.style.display = "flex"; // Tampilkan aktivitas yang cocok
        } else {
          activity.style.display = "none"; // Sembunyikan aktivitas yang tidak cocok
        }
      }
    });
  });
});
