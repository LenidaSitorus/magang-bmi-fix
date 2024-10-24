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

const activityPlans = [
  {
    name: "Activity Plan A",
    description: "Analisis data kebutuhan user",
    completed: true, // Set to true for completed
    startDate: new Date(2024, 9, 1),
    endDate: new Date(2024, 9, 5),
    project: "project1",
  },
  {
    name: "Activity Plan B",
    description: "Presentasi hasil analisis",
    completed: false, // Set to false for not completed
    startDate: new Date(2024, 9, 3),
    endDate: new Date(2024, 9, 10),
    project: "project2",
  },
  {
    name: "Activity Plan C",
    description: "Uji coba aplikasi",
    completed: false, // Set to false for not completed
    startDate: new Date(2024, 9, 7),
    endDate: new Date(2024, 9, 18),
    project: "project3",
  },
  {
    name: "Activity Plan D",
    description: "Membuat laporan",
    completed: false, // Set to true for completed
    startDate: new Date(2024, 9, 15),
    endDate: new Date(2024, 9, 31),
    project: "project1",
  },
];

const monthDisplay = document.getElementById("monthDisplay");
const activityPlanTable = document.getElementById("activityPlanTable");
const daysRow = document.getElementById("daysRow");
const projectFilter = document.getElementById("projectFilter");

function calculatePositionAndSize(startDate, endDate) {
  const totalDaysInMonth = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    0
  ).getDate();
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  const daysFromStart = startDay - 1; // Calculate the offset from the start of the month
  const daysSpan = endDay - startDay + 1; // Calculate the number of days for the bar

  const leftPosition = (daysFromStart / totalDaysInMonth) * 100; // Convert to percentage for left offset
  const width = (daysSpan / totalDaysInMonth) * 100; // Convert to percentage for the width

  return { leftPosition, width };
}

function renderDays() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dayNumbers = [...Array(daysInMonth)]
    .map(
      (_, index) =>
        `<div class="calendar-day" style="width: ${100 / daysInMonth}%;">${
          index + 1
        }</div>`
    )
    .join("");
  daysRow.innerHTML = dayNumbers;
  monthDisplay.textContent = `${monthNames[month]} ${year}`;
}

function renderActivityPlans() {
  activityPlanTable.innerHTML = "";

  const selectedProject = projectFilter.value;

  activityPlans.forEach((plan) => {
    if (selectedProject === "all" || plan.project === selectedProject) {
      const { leftPosition, width } = calculatePositionAndSize(
        plan.startDate,
        plan.endDate
      );
      const colorClass = plan.completed ? "bg-blue-700" : "bg-yellow-500"; // Set color based on completion status
      const row = document.createElement("tr");

      row.innerHTML = `
                    <td class="py-2 px-4 border-b">${plan.name}</td>
                    <td class="py-2 px-4 border-b">${plan.description}</td>
                    <td class="py-2 px-4 border-b" colspan="31" style="position: relative; height: 50px;">
                      <div class="relative">
                        <div class="timeline-bar ${colorClass}" 
                             style="width: ${width}%; left: ${leftPosition}%; min-width: 40px;">
                          ${plan.name}
                        </div>
                      </div>
                    </td>
                  `;
      activityPlanTable.appendChild(row);
    }
  });
}

projectFilter.addEventListener("change", () => {
  renderDays();
  renderActivityPlans();
});

document.getElementById("prevMonthBtn").addEventListener("click", function () {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderDays();
  renderActivityPlans();
});

document.getElementById("nextMonthBtn").addEventListener("click", function () {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderDays();
  renderActivityPlans();
});

// Initial render
renderDays();
renderActivityPlans();
