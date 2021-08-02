document.addEventListener("DOMContentLoaded", function () {
  const vacationAvailableBalance = document.getElementById("vacation-available-balance");
  const vacationCurrentBalance = document.getElementById("vacation-current-balance");

  const sickAvailableBalance = document.getElementById("sick-available-balance");
  const sickCurrentBalance = document.getElementById("sick-current-balance");

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
        vacationAvailableBalance.innerText = data.data.vacation.availableBalance.toFixed(1)
        vacationCurrentBalance.innerText = data.data.vacation.currentBalance.toFixed(1)

        sickAvailableBalance.innerText = data.data.sick.availableBalance.toFixed(1)
        sickCurrentBalance.innerText = data.data.sick.currentBalance.toFixed(1)
      })
  }
});
