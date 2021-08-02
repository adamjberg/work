document.addEventListener("DOMContentLoaded", function () {
  const availableHours = document.getElementById("available-hours");
  const currentBalance = document.getElementById("current-balance");
  const pastTable = document.getElementById("past-table");
  const pastTableBody = pastTable.getElementsByTagName("tbody")[0];
  const employeeSelect = document.getElementById("employee");
  let selectedEmployeeId = null;

  employeeSelect.addEventListener("change", function (e) {
    setSelectedEmployeeId(e.target.value);
  });

  function setSelectedEmployeeId(id) {
    selectedEmployeeId = id;

    pastTableBody.innerHTML = ""

    fetch(`/api/timeoff/employee/${selectedEmployeeId}`)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        for (const row of data) {
          const tr = document.createElement("tr");

          const dateColumn = document.createElement("td");
          dateColumn.innerText = row.date;
          tr.appendChild(dateColumn);

          const typeColumn = document.createElement("td");
          typeColumn.innerText = row.type;
          tr.appendChild(typeColumn);

          const hoursColumn = document.createElement("td");
          hoursColumn.innerText = row.hours;
          tr.appendChild(hoursColumn);

          pastTableBody.appendChild(tr);
        }
      });

      fetch(`/api/timeoff/balance/employee/${selectedEmployeeId}`)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        availableHours.innerText = data.data.vacation.availableBalance.toFixed(1)
        currentBalance.innerText = data.data.vacation.currentBalance.toFixed(1)
      })
  }
});
