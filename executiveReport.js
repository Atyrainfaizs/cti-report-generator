document.getElementById('executiveForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const reportID = document.getElementById('reportID').value;
    const criticality = document.getElementById('criticality').value;
    const sensitivity = document.getElementById('sensitivity').value;
    const tlp = document.getElementById('tlp').value;
    const executiveSummary = document.getElementById('executiveSummary').value;
    const keyPoints = document.getElementById('keyPoints').value;
    const assessment = document.getElementById('assessment').value;

    // Collect Data Source Entries
    const dataSourceEntries = [];
    const dataSourceForms = document.querySelectorAll('.data-source-entry');
    dataSourceForms.forEach((form) => {
        const sourceName = form.querySelector('input[name="sourceName"]').value;
        const sourceUrl = form.querySelector('input[name="sourceUrl"]').value;
        const sourceDescription = form.querySelector('textarea[name="sourceDescription"]').value;
        const dateAccessed = form.querySelector('input[name="dateAccessed"]').value;

        dataSourceEntries.push({ sourceName, sourceUrl, sourceDescription, dateAccessed });
    });

    
    
    // Construct report object
    const report = { 
        type: 'Executive Report', 
        name,
        reportID, 
        criticality, 
        sensitivity,
        tlp, 
        executiveSummary,
        keyPoints,
        assessment,
        dataSources: dataSourceEntries,
        photos: attachedPhotos  
    };

    // Save report and navigate
    saveReport(report);
    alert('Executive Report Saved!');

    const reports = JSON.parse(localStorage.getItem('reports')) || [];
    const reportIndex = reports.length - 1; // Last saved report index
    window.location.href = `viewReport.html?index=${reportIndex}`;
});

function saveReport(report) {
    const reports = JSON.parse(localStorage.getItem('reports')) || [];
    reports.push(report);
    localStorage.setItem('reports', JSON.stringify(reports));
}

function exportToPDF(formId) {
    const form = document.getElementById(formId);
    // Logic to export form data to PDF goes here
    alert('Exported to PDF!');
}

// Data Source Container Logic
const dataSourceContainer = document.getElementById("dataSourceEntries");
const addDataSourceButton = document.getElementById("addDataSource");

// Add Data Source Button Click Event
addDataSourceButton.addEventListener("click", () => {
    const dataSourceForm = document.createElement("div");
    dataSourceForm.classList.add("data-source-entry");
    dataSourceForm.innerHTML = `
        <div class="data-source-form">
            <label for="sourceName">Source Name:</label>
            <input type="text" name="sourceName" required><br>

            <label for="sourceUrl">URL:</label>
            <input type="url" name="sourceUrl" required><br>

            <label for="sourceDescription">Description:</label>
            <textarea name="sourceDescription" required></textarea><br>

            <label for="dateAccessed">Date Accessed:</label>
            <input type="date" name="dateAccessed" required><br>

            <button type="button" class="removeDataSource">Remove</button>
            <hr>
        </div>
    `;
    dataSourceContainer.appendChild(dataSourceForm);

    // Remove Data Source Entry
    dataSourceForm.querySelector(".removeDataSource").addEventListener("click", () => {
        dataSourceContainer.removeChild(dataSourceForm);
    });
});

// Attach Photos Logic
const addPhotoButton = document.getElementById("addPhotoButton");
const photoFieldsContainer = document.getElementById("photoFields");
const photoPreview = document.getElementById("photoPreview");

// Store uploaded photos as base64 strings
let attachedPhotos = [];

// Add Photo Button Click Event
addPhotoButton.addEventListener("click", () => {
    // Create a new file input field
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    // Append the file input to the container
    photoFieldsContainer.appendChild(fileInput);

    // Listen for changes in the file input
    fileInput.addEventListener("change", (event) => {
        const files = event.target.files;

        // Process each selected file
        Array.from(files).forEach((file) => {
            const reader = new FileReader();

            // Read file as data URL (base64)
            reader.onload = (e) => {
                const base64String = e.target.result;

                // Add photo to the array
                attachedPhotos.push({
                    name: file.name,
                    base64: base64String
                });

                // Display photo preview with a remove button
                const imgElement = document.createElement("img");
                imgElement.src = base64String;
                imgElement.alt = file.name;
                imgElement.style.width = "150px";
                imgElement.style.margin = "10px";

                const removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.style.marginLeft = "10px";

                // Remove photo when the button is clicked
                removeButton.addEventListener("click", () => {
                    // Remove photo from the array
                    attachedPhotos = attachedPhotos.filter(photo => photo.base64 !== base64String);

                    // Remove the preview element
                    photoPreview.removeChild(imgWrapper);
                });

                const imgWrapper = document.createElement("div");
                imgWrapper.style.display = "inline-block";
                imgWrapper.appendChild(imgElement);
                imgWrapper.appendChild(removeButton);

                photoPreview.appendChild(imgWrapper);
            };

            reader.readAsDataURL(file);
        });
    });
});