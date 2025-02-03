// Load and display all reports on page load
window.onload = function () {
    const reports = JSON.parse(localStorage.getItem('reports')) || [];
    displayAllReports(reports);
};

// Function to display all reports
function displayAllReports(reports) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (reports.length === 0) {
        resultsContainer.innerHTML = '<p>No reports found.</p>';
        return;
    }

    // Loop through all reports and display them
    reports.forEach((report, index) => {
        const highlightedName = report.name;
        const highlightedType = report.type;

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="list-report">
            <p><strong>Type:</strong> ${highlightedType}</p>
            <p><strong>Name:</strong> ${highlightedName}</p>
            <button onclick="viewFullReport(${index})">View Full Report</button>
        </div>
            `;
        resultsContainer.appendChild(div);
    });
}

// Function to redirect to the full report view
function viewFullReport(index) {
    // Redirect to viewReport.html with the report index as a query parameter.
    window.location.href = `viewReport.html?index=${index}`;
}
