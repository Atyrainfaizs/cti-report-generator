window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const index = params.get('index');
    if (index === null) {
        alert('No report selected.');
        return;
    }

    const reports = JSON.parse(localStorage.getItem('reports')) || [];
    const report = reports[index];
    if (!report) {
        alert('Report not found.');
        return;
    }

    displayReport(report, index);
};

function displayReport(report, index) {
    const reportContent = document.getElementById('reportContent');

    // Helper function to style TLP based on its value
    function getStyledTLP(tlp) {
        let color = 'black'; // Default color
        switch (tlp?.toUpperCase()) {
            case 'RED':
                color = 'red';
                break;
            case 'AMBER':
                color = 'orange';
                break;
            case 'GREEN':
                color = 'green';
                break;
            case 'WHITE':
                color = 'gray';
                break;
            default:
                color = 'black'; // Fallback for unknown values
        }
        return `<span style="color: ${color}; font-weight: bold;">${tlp || 'N/A'}</span>`;
    }

    if (report.type === 'Threat Actor') {
        reportContent.innerHTML = `
            <div class="report-header">
                <div class="logo-container">
                    <img src="pic.png" alt="Company Logo" class="logo">
                </div>
                <div class="report-info">
                    <h2><strong>${report.name}</strong><h2>
                    <p><strong>${report.type} Report</strong></p>
                    <p><strong>Report Number:</strong> ${report.reportID}</p>
                    <p><strong>Criticality:</strong> ${report.criticality || 'N/A'}</p>
                    <p><strong>Sensitivity:</strong> ${report.sensitivity || 'N/A'}</p>
                    <p><strong>TLP:</strong> ${getStyledTLP(report.tlp)}</p>
                </div>
            </div>
            <h2><strong>Executive Summary</strong></h2>
            <p>${report.executiveSummary || 'N/A'}</p>
            <h2><strong>Key Points</strong></h2>
            <p>${report.keyPoints || 'N/A'}</p>
            <h2><strong>Assessment</strong></h2>
            <p>${report.assessment || 'N/A'}</p>
            <h2><strong>Tactics, Techniques, & Procedures</strong></h2>
            <p>${report.ttt || 'N/A'}</p>
            <h2><strong>Infrastructure</strong></h2>
            <p>${report.infrastructure || 'N/A'}</p>
            <h2>Timeline</h2>
            <table>
                <thead>
                    <tr>
                        <th>Attribution</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Location</th>
                        <th>Sector</th>
                        <th>Activity</th>
                    </tr>
                </thead>
                <tbody>
                    ${report.timeline?.map(entry => `
                        <tr>
                            <td>${entry.attribution}</td>
                            <td>${entry.startDate}</td>
                            <td>${entry.endDate}</td>
                            <td>${entry.location}</td>
                            <td>${entry.sector}</td>
                            <td>${entry.activity}</td>
                        </tr>
                    `).join('') || '<tr><td colspan="6">No timeline entries available.</td></tr>'}
                </tbody>
            </table>
            <br>
            <h2>MITRE ATT&K</h2>
            <table>
                <thead>
                    <tr>
                        <th>Attribution</th>
                        <th>Tactic</>
                        <th>Technique</th>
                        <th>Sub-Technique</th>
                        <th>Activity</th>
                    </tr>
                </thead>
                <tbody>
                    ${report.mitre?.map(entry => `
                        <tr>
                            <td>${entry.attributionMitre}</td>
                            <td>${entry.tactic}</td>
                            <td>${entry.technique}</td>
                            <td>${entry.subtechnique}</td>
                            <td>${entry.activity}</td>
                        </tr>
                    `).join('') || '<tr><td colspan="5">No mitre att&ck entries available.</td></tr>'}
                </tbody>
            </table>
            <br>

            <h2>Threat Actor Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Threat Actor</th>
                        <th>Threat Actor Aliases</th>
                        <th>Motive</th>
                        <th>Sector</th>
                        <th>Location</th>
                        <th>City/State/Provice/etc.</th>
                    </tr>
                </thead>
                <tbody>
                    ${report.metadata?.map(entry => `
                        <tr>
                            <td>${entry.name}</td>
                            <td>${entry.nameAliases}</td>
                            <td>${entry.motive}</td>
                            <td>${entry.sector}</td>
                            <td>${entry.location}</td>
                            <td>${entry.city}</td>
                        </tr>
                    `).join('') || '<tr><td colspan="6">No victims entries available.</td></tr>'}
                </tbody>
            </table>
            <br>


            <h2>Victims</h2>
            <table>
                <thead>
                    <tr>
                        <th>Victims Name</th>
                        <th>Date Reported</th>
                        <th>Sector</th>
                        <th>Location</th>
                        <th>City/State/Provice/etc.</th>
                    </tr>
                </thead>
                <tbody>
                    ${report.victims?.map(entry => `
                        <tr>
                            <td>${entry.name}</td>
                            <td>${entry.date}</td>
                            <td>${entry.sector}</td>
                            <td>${entry.location}</td>
                            <td>${entry.city}</td>
                        </tr>
                    `).join('') || '<tr><td colspan="5">No victims entries available.</td></tr>'}
                </tbody>
            </table>
            <br>

            <!-- IOCs Section -->
            <h2>Indicators of Compromise (IOCs)</h2>
            ${generateIocTables(report.iocs)}
            <br>

            <!-- Data Sources Section -->
            <h2>Data Sources</h2>
            <table>
                <thead>
                    <tr>
                        <th>Source Name</th>
                        <th>URL</th>
                        <th>Description</th>
                        <th>Date Accessed</th>
                    </tr>
                </thead>
                <tbody>
                    ${report.dataSources?.map(entry => `
                        <tr>
                            <td>${entry.sourceName}</td>
                            <td><a href="${entry.sourceUrl}" target="_blank">${entry.sourceUrl}</a></td>
                            <td>${entry.sourceDescription}</td>
                            <td>${entry.dateAccessed}</td>
                        </tr>
                    `).join('') || '<tr><td colspan="4">No data sources available.</td></tr>'}
                </tbody>
            </table>
            <br>

            <!-- Attached Photos Section -->
            <h2>Attached Photos</h2>
            <div id="attachedPhotosDisplay">
                ${report.photos?.length > 0
                    ? report.photos.map(photo => `
                        <div style="display: inline-block; margin: 10px;">
                            <img src="${photo.base64}" alt="${photo.name}" style="width: 500px;">
                            <p>${photo.name}</p>
                        </div>
                    `).join('')
                    : '<p>No photos attached.</p>'
                }
            </div>
            <br>

            <button onclick="printReport()">Print Report</button>
            <button onclick="deleteReport(${index})">Delete Report</button>
        `;
        
    } else if (report.type === 'Campaign Report') {
        reportContent.innerHTML = `
            <div class="report-header">
                <div class="logo-container">
                    <img src="pic.png" alt="Company Logo" class="logo">
                </div>
                <div class="report-info">
                    <h2><strong>${report.name}</strong><h2>
                    <p><strong>${report.type} Report</strong></p>
                    <p><strong>Report Number:</strong> ${report.reportID}</p>
                    <p><strong>Criticality:</strong> ${report.criticality || 'N/A'}</p>
                    <p><strong>Sensitivity:</strong> ${report.sensitivity || 'N/A'}</p>
                    <p><strong>TLP:</strong> ${getStyledTLP(report.tlp)}</p>
                </div>
            </div>
            <h2><strong>Executive Summary</strong></h2>
            <p>${report.executiveSummary || 'N/A'}</p>
            <h2><strong>Key Points</strong></h2>
            <p>${report.keyPoints || 'N/A'}</p>
            <h2><strong>Assessment</strong></h2>
            <p>${report.assessment || 'N/A'}</p>
            <h2>Timeline</h2>
            <table>
                <thead>
                    <tr>
                        <th>Attribution</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Location</th>
                        <th>Sector</th>
                        <th>Activity</th>
                    </tr>
                </thead>
                <tbody>
                    ${report.timeline?.map(entry => `
                        <tr>
                            <td>${entry.attribution}</td>
                            <td>${entry.startDate}</td>
                            <td>${entry.endDate}</td>
                            <td>${entry.location}</td>
                            <td>${entry.sector}</td>
                            <td>${entry.activity}</td>
                        </tr>
                    `).join('') || '<tr><td colspan="6">No timeline entries available.</td></tr>'}
                </tbody>
            </table>
            <br>
            <h2>MITRE ATT&K</h2>
            <table>
                <thead>
                    <tr>
                        <th>Attribution</th>
                        <th>Tactic</>
                        <th>Technique</th>
                        <th>Sub-Technique</th>
                        <th>Activity</th>
                    </tr>
                </thead>
                <tbody>
                    ${report.mitre?.map(entry => `
                        <tr>
                            <td>${entry.attributionMitre}</td>
                            <td>${entry.tactic}</td>
                            <td>${entry.technique}</td>
                            <td>${entry.subtechnique}</td>
                            <td>${entry.activity}</td>
                        </tr>
                    `).join('') || '<tr><td colspan="5">No mitre att&ck entries available.</td></tr>'}
                </tbody>
            </table>
            <br>
            
            <h2>Threat Actor Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Threat Actor</th>
                        <th>Threat Actor Aliases</th>
                        <th>Motive</th>
                        <th>Sector</th>
                        <th>Location</th>
                        <th>City/State/Provice/etc.</th>
                    </tr>
                </thead>
                <tbody>
                    ${report.metadata?.map(entry => `
                        <tr>
                            <td>${entry.name}</td>
                            <td>${entry.nameAliases}</td>
                            <td>${entry.motive}</td>
                            <td>${entry.sector}</td>
                            <td>${entry.location}</td>
                            <td>${entry.city}</td>
                        </tr>
                    `).join('') || '<tr><td colspan="6">No victims entries available.</td></tr>'}
                </tbody>
            </table>
            <br>

            <h2>Victims</h2>
            <table>
                <thead>
                    <tr>
                        <th>Victims Name</th>
                        <th>Date Reported</th>
                        <th>Sector</th>
                        <th>Location</th>
                        <th>City/State/Provice/etc.</th>
                    </tr>
                </thead>
                <tbody>
                    ${report.victims?.map(entry => `
                        <tr>
                            <td>${entry.name}</td>
                            <td>${entry.date}</td>
                            <td>${entry.sector}</td>
                            <td>${entry.location}</td>
                            <td>${entry.city}</td>
                        </tr>
                    `).join('') || '<tr><td colspan="5">No victims entries available.</td></tr>'}
                </tbody>
            </table>
            <br>

            <!-- Data Sources Section -->
            <h2>Data Sources</h2>
            <table>
                <thead>
                    <tr>
                        <th>Source Name</th>
                        <th>URL</th>
                        <th>Description</th>
                        <th>Date Accessed</th>
                    </tr>
                </thead>
                <tbody>
                    ${report.dataSources?.map(entry => `
                        <tr>
                            <td>${entry.sourceName}</td>
                            <td><a href="${entry.sourceUrl}" target="_blank">${entry.sourceUrl}</a></td>
                            <td>${entry.sourceDescription}</td>
                            <td>${entry.dateAccessed}</td>
                        </tr>
                    `).join('') || '<tr><td colspan="4">No data sources available.</td></tr>'}
                </tbody>
            </table>
            <br>

            <!-- Attached Photos Section -->
            <h2>Attached Photos</h2>
            <div id="attachedPhotosDisplay">
                ${report.photos?.length > 0
                    ? report.photos.map(photo => `
                        <div style="display: inline-block; margin: 10px;">
                            <img src="${photo.base64}" alt="${photo.name}" style="width: 500px;">
                            <p>${photo.name}</p>
                        </div>
                    `).join('')
                    : '<p>No photos attached.</p>'
                }
            </div>
            <br>

            <button onclick="printReport()">Print Report</button>
            <button onclick="deleteReport(${index})">Delete Report</button>
        `;
    } else if (report.type === 'Intrusion Analysis') {
        reportContent.innerHTML = `
            <div class="report-header">
                <div class="logo-container">
                    <img src="pic.png" alt="Company Logo" class="logo">
                </div>
                <div class="report-info">
                    <h2><strong>${report.name}</strong><h2>
                    <p><strong>${report.type} Report</strong></p>
                    <p><strong>Report Number:</strong> ${report.reportID}</p>
                    <p><strong>Criticality:</strong> ${report.criticality || 'N/A'}</p>
                    <p><strong>Sensitivity:</strong> ${report.sensitivity || 'N/A'}</p>
                    <p><strong>TLP:</strong> ${getStyledTLP(report.tlp)}</p>
                </div>
            </div>
            <h2><strong>Executive Summary</strong></h2>
            <p>${report.executiveSummary || 'N/A'}</p>
            <h2><strong>Key Points</strong></h2>
            <p>${report.keyPoints || 'N/A'}</p>
            <h2><strong>Indicator Analysis</strong></h2>
            <p>${report.indicatorAnalysis || 'N/A'}</p>
            
            <h2>MITRE ATT&K</h2>
            <table>
                <thead>
                    <tr>
                        <th>Attribution</th>
                        <th>Tactic</>
                        <th>Technique</th>
                        <th>Sub-Technique</th>
                        <th>Activity</th>
                    </tr>
                </thead>
                <tbody>
                    ${report.mitre?.map(entry => `
                        <tr>
                            <td>${entry.attributionMitre}</td>
                            <td>${entry.tactic}</td>
                            <td>${entry.technique}</td>
                            <td>${entry.subtechnique}</td>
                            <td>${entry.activity}</td>
                        </tr>
                    `).join('') || '<tr><td colspan="5">No mitre att&ck entries available.</td></tr>'}
                </tbody>
            </table>
            <br>

            <h2>Threat Actor Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Threat Actor</th>
                        <th>Threat Actor Aliases</th>
                        <th>Motive</th>
                        <th>Sector</th>
                        <th>Location</th>
                        <th>City/State/Provice/etc.</th>
                    </tr>
                </thead>
                <tbody>
                    ${report.metadata?.map(entry => `
                        <tr>
                            <td>${entry.name}</td>
                            <td>${entry.nameAliases}</td>
                            <td>${entry.motive}</td>
                            <td>${entry.sector}</td>
                            <td>${entry.location}</td>
                            <td>${entry.city}</td>
                        </tr>
                    `).join('') || '<tr><td colspan="6">No victims entries available.</td></tr>'}
                </tbody>
            </table>
            <br>

            <!-- IOCs Section -->
            <h2>Indicators of Compromise (IOCs)</h2>
            ${generateIocTables(report.iocs)}
            <br>

            <!-- Data Sources Section -->
            <h2>Data Sources</h2>
            <table>
                <thead>
                    <tr>
                        <th>Source Name</th>
                        <th>URL</th>
                        <th>Description</th>
                        <th>Date Accessed</th>
                    </tr>
                </thead>
                <tbody>
                    ${report.dataSources?.map(entry => `
                        <tr>
                            <td>${entry.sourceName}</td>
                            <td><a href="${entry.sourceUrl}" target="_blank">${entry.sourceUrl}</a></td>
                            <td>${entry.sourceDescription}</td>
                            <td>${entry.dateAccessed}</td>
                        </tr>
                    `).join('') || '<tr><td colspan="4">No data sources available.</td></tr>'}
                </tbody>
            </table>
            <br>

            <!-- Attached Photos Section -->
            <h2>Attached Photos</h2>
            <div id="attachedPhotosDisplay">
                ${report.photos?.length > 0
                    ? report.photos.map(photo => `
                        <div style="display: inline-block; margin: 10px;">
                            <img src="${photo.base64}" alt="${photo.name}" style="width: 500px;">
                            <p>${photo.name}</p>
                        </div>
                    `).join('')
                    : '<p>No photos attached.</p>'
                }
            </div>
            <br>

            <button onclick="printReport()">Print Report</button>
            <button onclick="deleteReport(${index})">Delete Report</button>
        `;
    } else if (report.type === 'Executive Report') {
        reportContent.innerHTML = `
            <div class="report-header">
                <div class="logo-container">
                    <img src="pic.png" alt="Company Logo" class="logo">
                </div>
                <div class="report-info">
                    <h2><strong>${report.name}</strong><h2>
                    <p><strong>${report.type}</strong></p>
                    <p><strong>Report Number:</strong> ${report.reportID}</p>
                    <p><strong>Criticality:</strong> ${report.criticality || 'N/A'}</p>
                    <p><strong>Sensitivity:</strong> ${report.sensitivity || 'N/A'}</p>
                    <p><strong>TLP:</strong> ${getStyledTLP(report.tlp)}</p>
                </div>
            </div>
            <h2><strong>Executive Summary</strong></h2>
            <p>${report.executiveSummary || 'N/A'}</p>
            <h2><strong>Key Points</strong></h2>
            <p>${report.keyPoints || 'N/A'}</p>
            <h2><strong>Assessment</strong></h2>
            <p>${report.assessment || 'N/A'}</p>

            <!-- Data Sources Section -->
            <h2>Data Sources</h2>
            <table>
                <thead>
                    <tr>
                        <th>Source Name</th>
                        <th>URL</th>
                        <th>Description</th>
                        <th>Date Accessed</th>
                    </tr>
                </thead>
                <tbody>
                    ${report.dataSources?.map(entry => `
                        <tr>
                            <td>${entry.sourceName}</td>
                            <td><a href="${entry.sourceUrl}" target="_blank">${entry.sourceUrl}</a></td>
                            <td>${entry.sourceDescription}</td>
                            <td>${entry.dateAccessed}</td>
                        </tr>
                    `).join('') || '<tr><td colspan="4">No data sources available.</td></tr>'}
                </tbody>
            </table>
            <br>

            <!-- Attached Photos Section -->
            <h2>Attached Photos</h2>
            <div id="attachedPhotosDisplay">
                ${report.photos?.length > 0
                    ? report.photos.map(photo => `
                        <div style="display: inline-block; margin: 10px;">
                            <img src="${photo.base64}" alt="${photo.name}" style="width: 500px;">
                            <p>${photo.name}</p>
                        </div>
                    `).join('')
                    : '<p>No photos attached.</p>'
                }
            </div>
            <br>

            <button onclick="printReport()">Print Report</button>
            <button onclick="deleteReport(${index})">Delete Report</button>
        `
    }
    
    // Save the current index for editing.
    currentReportIndex = index;
}

// Helper function to generate IOC tables
function generateIocTables(iocs) {
    if (!iocs || iocs.length === 0) {
        return '<p>No IOCs available.</p>';
    }

    // Group IOCs by type
    const groupedIocs = {
        Malware: [],
        'Network Indicator': [],
        'System Artifact': [],
        CVE: []
    };

    iocs.forEach(ioc => {
        groupedIocs[ioc.type].push(ioc);
    });

    // Generate HTML for each IOC type
    let html = '';
    for (const [type, entries] of Object.entries(groupedIocs)) {
        if (entries.length > 0) {
            html += `<h3>${type}</h3>`;
            html += '<table>';
            html += '<thead><tr>';

            // Dynamically generate table headers based on IOC type
            switch (type) {
                case 'Malware':
                    html += `
                        <th>Attribution</th>
                        <th>Tool Name</th>
                        <th>Analysis Report</th>
                        <th>Hash Type</th>
                        <th>File Hash</th>
                        <th>Description</th>
                        <th>First Reported</th>
                        <th>Last Reported</th>
                    `;
                    break;

                case 'Network Indicator':
                    html += `
                        <th>Attribution</th>
                        <th>Intrusion Phase</th>
                        <th>Artifact</th>
                        <th>Details</th>
                        <th>First Reported</th>
                        <th>Last Reported</th>
                    `;
                    break;

                case 'System Artifact':
                    html += `
                        <th>Attribution</th>
                        <th>Tactic</th>
                        <th>Host Artifact</th>
                        <th>Type</th>
                        <th>Details</th>
                        <th>First Reported</th>
                        <th>Last Reported</th>
                    `;
                    break;

                case 'CVE':
                    html += `
                        <th>Attribution</th>
                        <th>CVE Number</th>
                        <th>CVSS Score</th>
                        <th>Patch Available</th>
                        <th>Patch Applied</th>
                        <th>Date Reported</th>
                    `;
                    break;
            }

            html += '</tr></thead><tbody>';

            // Add table rows for each entry
            entries.forEach(entry => {
                html += '<tr>';
                switch (type) {
                    case 'Malware':
                        html += `
                            <td>${entry.attribution}</td>
                            <td>${entry.toolName}</td>
                            <td>${entry.analysisReport}</td>
                            <td>${entry.hashType}</td>
                            <td>${entry.fileHash}</td>
                            <td>${entry.description}</td>
                            <td>${entry.firstReported}</td>
                            <td>${entry.lastReported}</td>
                        `;
                        break;

                    case 'Network Indicator':
                        html += `
                            <td>${entry.attribution}</td>
                            <td>${entry.intrusionPhase}</td>
                            <td>${entry.artifact}</td>
                            <td>${entry.details}</td>
                            <td>${entry.firstReported}</td>
                            <td>${entry.lastReported}</td>
                        `;
                        break;

                    case 'System Artifact':
                        html += `
                            <td>${entry.attribution}</td>
                            <td>${entry.tactic}</td>
                            <td>${entry.hostArtifact}</td>
                            <td>${entry.type}</td>
                            <td>${entry.details}</td>
                            <td>${entry.firstReported}</td>
                            <td>${entry.lastReported}</td>
                        `;
                        break;

                    case 'CVE':
                        html += `
                            <td>${entry.attribution}</td>
                            <td>${entry.cveNumber}</td>
                            <td>${entry.cvssScore}</td>
                            <td>${entry.patchAvailable}</td>
                            <td>${entry.patchApplied}</td>
                            <td>${entry.dateReported}</td>
                        `;
                        break;
                }
                html += '</tr>';
            });

            html += '</tbody></table>';
        }
    }

    return html;
}



function printReport() {
    window.print();
}

document.getElementById('backButton').addEventListener('click', () => {
    const referrer = document.referrer; // Get the URL of the previous page
    if (referrer.includes('specificPage.html')) {
        window.location.href = 'searchReport.html';
    } else {
        window.history.back(); // Fallback to default back behavior
    }
});
