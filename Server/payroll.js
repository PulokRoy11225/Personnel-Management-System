// Assuming you have functions to fetch payroll data

function updatePayrollSummary(data) {
  document.getElementById("pay-period-start").textContent = data.payPeriod.startDate;
  document.getElementById("pay-period-end").textContent = data.payPeriod.endDate;
  document.getElementById("gross-payroll").textContent = data.totals.grossPayroll;
  document.getElementById("net-payroll").textContent = data.totals.netPayroll;
  document.getElementById("employees-paid").textContent = data.totals.employeesPaid;
}

function populateEmployeeList(data) {
  const tableBody = document.getElementById("employee-table").getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Clear existing rows

  for (const employee of data.employees) {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.id}</td>
      <td>${employee.department}</td>
      <td>${employee.grossPay}</td>
      <td>${employee.netPay}</td>
      <td>${employee.status}</td>
    `;
    tableBody.appendChild(tableRow);
  }
}

// Call your functions to fetch data and populate the page
fetchPayrollData()
  .then(data => {
    updatePayrollSummary(data);
    populateEmployeeList(data);
  });
