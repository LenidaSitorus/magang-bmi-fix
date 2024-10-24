var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "User 6",
      "User 4",
      "User 1",
      "User 2",
      "User 7",
      "User 6",
      "User 5",
      "User 4",
      "User 3",
      "User 2",
      "User 1",
    ],
    datasets: [
      {
        label: "On Target",
        data: [10, 20, 30, 25, 15, 10, 5, 20, 15, 25, 30],
        backgroundColor: "rgba(28, 58, 99, 0.2)",
        borderColor: "rgba(28, 58, 99, 1)",
        borderWidth: 1,
      },
      {
        label: "Out Target",
        data: [5, 10, 15, 10, 5, 5, 10, 15, 20, 10, 5],
        backgroundColor: "rgba(219, 151, 49, 0.2)",
        borderColor: "rgba(219, 151, 49, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  },
});

const notificationButton = document.getElementById("notificationButton");
const notificationDropdown = document.getElementById("notificationDropdown");

// Toggle visibility of the notification dropdown
notificationButton.addEventListener("click", () => {
  notificationDropdown.classList.toggle("hidden");
});
