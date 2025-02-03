// threatActorProfile.js
document.getElementById('campaignReportForm').addEventListener('submit', function(event) {
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
    
    //Collect Mitre data
    const mitreEntries = [];
    const mitreForms = document.querySelectorAll('.mitre-entry');
    mitreForms.forEach((form) => {
        const attributionMitre = form.querySelector('input[name="attributionMitre"]').value;
        const tactic = form.querySelector('select[name="tactic"]').value;
        const technique = form.querySelector('select[name="technique"]').value;
        const subtechnique = form.querySelector('select[name="subtechnique"]').value;
        const activity = form.querySelector('textarea[name="activity"]').value;
    
        mitreEntries.push({ attributionMitre, tactic, technique, subtechnique, activity});
    });

    // Collect timeline data
    const timelineEntries = [];
    const timelineForms = document.querySelectorAll('.timeline-entry');
    timelineForms.forEach((form) => {
        const attribution = form.querySelector('input[name="attribution"]').value;
        const startDate = form.querySelector('input[name="startDate"]').value;
        const endDate = form.querySelector('input[name="endDate"]').value;
        const location = form.querySelector('select[name="location"]').value;
        const sector = form.querySelector('select[name="sector"]').value;
        const activity = form.querySelector('textarea[name="activity"]').value;

        timelineEntries.push({ attribution, startDate, endDate, location, sector, activity });
    });

    //Collect Metadata 
    const metadataEntries = [];
    const metadataForms = document.querySelectorAll('.metadata-entry');
    metadataForms.forEach((form) => {
        const name = form.querySelector('input[name="name"]').value;
        const nameAliases = form.querySelector('input[name="nameAliases"]').value;
        const motive = form.querySelector('select[name="motive"]').value;
        const sector = form.querySelector('select[name="sector"]').value;
        const city = form.querySelector('textarea[name="city"]').value;
        const location = form.querySelector('select[name="location"]').value;
    
        metadataEntries.push({name, nameAliases, motive, sector, city, location});
    });


    //Collect Victims data
    const victimsEntries = [];
    const victimsForms = document.querySelectorAll('.victims-entry');
    victimsForms.forEach((form) => {
        const name = form.querySelector('input[name="name"]').value;
        const date = form.querySelector('input[name="date"]').value;
        const sector = form.querySelector('select[name="sector"]').value;
        const city = form.querySelector('textarea[name="city"]').value;
        const location = form.querySelector('select[name="location"]').value;
    
        victimsEntries.push({name, date, sector, city, location});
    });

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

    const report = { 
        type: 'Campaign Report', 
        name,
        reportID, 
        criticality, 
        sensitivity,
        tlp, 
        executiveSummary,
        keyPoints,
        assessment,
        mitre: mitreEntries,
        timeline: timelineEntries,
        metadata: metadataEntries,
        victims: victimsEntries,
        dataSources: dataSourceEntries,
        photos: attachedPhotos  };
    saveReport(report);

    alert('Campaign Report Saved!');

    // Navigate to viewReport.html and pass the index of the saved report
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

// Timeline Add
const timelineContainer = document.getElementById("timelineContainer");
const addTimelineButton = document.getElementById("addTimeline");

// Add Timeline Form
addTimelineButton.addEventListener("click", () => {
    const timelineForm = document.createElement("div");
    timelineForm.classList.add("timeline-entry");
    timelineForm.innerHTML = `
        <div class="report-row">
            <div class="third-column">
                <label for="attribution">Attribution:</label>
                <input type="text" name="attribution" required><br>
            </div>
            <div class="third-column">
                <label for="startDate">Start Date:</label>
                <input type="date" name="startDate" required><br>
            </div>
            <div class="third-column">
                <label for="endDate">End Date:</label>
                <input type="date" name="endDate" required><br>
            </div>
        </div>

        <label for="location">Location:</label>
        <select name="location" required>
            <option value="">Select Location</option>
            <option value="Johor">Johor</option>
            <option value="Kedah">Kedah</option>
            <option value="Kelantan">Kelantan</option>
            <option value="Kuala Lumpur">Kuala Lumpur</option>
            <option value="Labuan">Labuan</option>
            <option value="Melaka">Melaka</option>
            <option value="Negeri Sembilan">Negeri Sembilan</option>
            <option value="Pahang">Pahang</option>
            <option value="Penang">Penang</option>
            <option value="Perak">Perak</option>
            <option value="Perlis">Perlis</option>
            <option value="Putrajaya">Putrajaya</option>
            <option value="Sabah">Sabah</option>
            <option value="Sarawak">Sarawak</option>
            <option value="Selangor">Selangor</option>
            <option value="Terengganu">Terengganu</option>
        </select><br>

        <label for="sector">Sector:</label>
        <select name="sector" required>
            <option value="">Select Sector</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Technology">Technology</option>
            <option value="Energy">Energy</option>
            <option value="Government">Government</option>
            <option value="Education">Education</option>
            <option value="Retail">Retail</option>
            <option value="Telecommunications">Telecommunications</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Transportation">Transportation</option>
            <option value="Defense">Defense</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Legal">Legal</option>
            <option value="Media and Entertainment">Media and Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Insurance">Insurance</option>
            <option value="Real Estate">Real Estate</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Non-Profit">Non-Profit</option>
            <option value="Critical Infrastructure">Critical Infrastructure</option>
        </select><br>

        <label for="activity">Activity:</label>
        <textarea name="activity"></textarea><br>
        <button type="button" class="removeTimeline">Remove</button>
        <hr>
    `;
    timelineContainer.appendChild(timelineForm);

    // Remove Timeline Entry
    timelineForm.querySelector(".removeTimeline").addEventListener("click", () => {
        timelineContainer.removeChild(timelineForm);
    });
});

// Add Mitre Att&ck

const mitreContainer = document.getElementById("mitreContainer");
const addMitreButton = document.getElementById("addMitre");

// Add Mitre Form
    addMitreButton.addEventListener("click", () => {
            const mitreForm = document.createElement("div");
            mitreForm.classList.add("mitre-entry");
            mitreForm.innerHTML = `
                <label for="attributionMitre">Attribution:</label>
                <input type="text" name="attributionMitre" required><br>

                <label for="tactic">Tactic</label>
                <select name="tactic" required>
                    <option value="">None</option>
                    <option value="TA0001">TA0001 - Initial Access</option>
                    <option value="TA0002">TA0002 - Execution</option>
                    <option value="TA0003">TA0003 - Persistence</option>
                    <option value="TA0004">TA0004 - Privilege Escalation</option>
                    <option value="TA0005">TA0005 - Defense Evasion</option>
                    <option value="TA0006">TA0006 - Credential Access</option>
                    <option value="TA0007">TA0007 - Discovery</option>
                    <option value="TA0008">TA0008 - Lateral Movement</option>
                    <option value="TA0009">TA0009 - Collection</option>
                    <option value="TA0010">TA0010 - Exfiltration</option>
                    <option value="TA0011">TA0011 - Command and Control</option>
                    <option value="TA0040">TA0040 - Impact</option>
                    <option value="TA0042">TA0042 - Resource Development</option>
                    <option value="TA0043">TA0043 - Reconnaissance</option>
                </select><br>

                <label for="technique">Technique</label>
                <select name="technique">
                    <option value="">None</option>
                    <option value="T1001">T1001 - Data Obfuscation</option>
                    <option value="T1003">T1003 - OS Credential Dumping</option>
                    <option value="T1005">T1005 - Data from Local System</option>
                    <option value="T1007">T1007 - System Service Discovery</option>
                    <option value="T1008">T1008 - Fallback Channels</option>
                    <option value="T1010">T1010 - Application Windows Discovery</option>
                    <option value="T1011">T1011 - Exfiltration Over Other Network Medium</option>
                    <option value="T1012">T1012 - Query Registry</option>
                    <option value="T1014">T1014 - Rootkit</option>
                    <option value="T1016">T1016 - System Network Configuration Discovery</option>
                    <option value="T1018">T1018 - Remote System Discovery</option>
                    <option value="T1020">T1020 - Automated Exfiltration</option>
                    <option value="T1021">T1021 - Remote Services</option>
                    <option value="T1025">T1025 - Data from Removable Media</option>
                    <option value="T1027">T1027 - Obfuscated Files or Information</option>
                    <option value="T1029">T1029 - Scheduled Transfer</option>
                    <option value="T1030">T1030 - Data Trnasfer Size Limits</option>
                    <option value="T1033">T1033 - System Ownes/User Discovery</option>
                    <option value="T1036">T1036 - Masquerading</option>
                    <option value="T1037">T1037 - Boot or Logon Initialization Scripts</option>
                    <option value="T1039">T1039 - Data from Network Shared Drive</option>
                    <option value="T1040">T1040 - Network Sniffing</option>
                    <option value="T1041">T1041 - Exfiltration Over C2 Channel</option>
                    <option value="T1046">T1046 - Network Service Discovery</option>
                    <option value="T1047">T1047 - Windows Management Instrumentation</option>
                    <option value="T1048">T1048 - Exfiltration Over Alternative Protocol</option>
                    <option value="T1049">T1049 - System Network Connections Discovery</option>
                    <option value="T1052">T1052 - Exfiltration Over Physical Medium</option>
                    <option value="T1053">T1053 - Schedule Task/Job </option>
                    <option value="T1055">T1055 - Process Injection</option>
                    <option value="T1056">T1056 - Input Capture</option>
                    <option value="T1052">T1057 - Process Discovery</option>
                    <option value="T1059">T1059 - Command and Scripting Interpreter</option>
                    <option value="T1068">T1068 - Exploitation for Privilege Escalation</option>
                    <option value="T1069">T1069 - Permission Group Discovery</option>
                    <option value="T1070">T1070 - Indicator Removal</option>
                    <option value="T1071">T1071 - Application Layer Protocol</option>
                    <option value="T1072">T1072 - Software Deploment Tools</option>
                    <option value="T1074">T1074 - Data Staged</option>
                    <option value="T1078">T1078 - Valid Accounts</option>
                    <option value="T1080">T1080 - Taint Shared Content</option>
                    <option value="T1082">T1082 - System Information Discovery</option>
                    <option value="T1083">T1083 - File and Directory Discovery</option>
                    <option value="T1087">T1087 - Account Discovery</option>
                    <option value="T1090">T1090 - Proxy</option>
                    <option value="T1091">T1091 - Replication Through Removable Media</option>
                    <option value="T1092">T1092 - Communication Through Removable Media</option>
                    <option value="T1095">T1095 - Non-Application Layer Protocol</option>
                    <option value="T1098">T1098 - Account Manipulation</option>
                    <option value="T1102">T1102 - Web Service</option>
                    <option value="T1104">T1104 - Multi-Stage Channels</option>
                    <option value="T1105">T1105 - Ingress Tool Transfer</option>
                    <option value="T1106">T1106 - Native API</option>
                    <option value="T1110">T1110 - Brute Force</option>
                    <option value="T1111">T1111 - Multi-Factor Authentication Interception</option>
                    <option value="T1112">T1112 - Modify Registry</option>
                    <option value="T1113">T1113 - Screen Capture</option>
                    <option value="T1114">T1114 - Email Collection</option>
                    <option value="T1115">T1115 - Clipboard Data</option>
                    <option value="T1119">T1119 - Automated Collection</option>
                    <option value="T1120">T1120 - Peripheral Device Discovery</option>
                    <option value="T1123">T1123 - Audio Capture</option>
                    <option value="T1124">T1124 - System Time Discovery</option>
                    <option value="T1125">T1125 - Video Capture</option>
                    <option value="T1127">T1127 - Trusted Developer Utilities Proxy Execution</option>
                    <option value="T1129">T1129 - Shared Modules</option>
                    <option value="T1132">T1132 - Data Encoding</option>
                    <option value="T1133">T1133 - External Remote Services</option>
                    <option value="T1134">T1134 - Access Token Manipulation</option>
                    <option value="T1135">T1135 - Network Share Discovery</option>
                    <option value="T1136">T1136 - Create Account</option>
                    <option value="T1137">T1137 - Office Application Startup</option>
                    <option value="T1140">T1140 - Deobfuscate/Decode Files or Information</option>
                    <option value="T1176">T1176 - Browser Extensions</option>
                    <option value="T1185">T1185 - Browser Session Hijacking</option>
                    <option value="T1187">T1187 - Forced Authentication</option>
                    <option value="T1189">T1189 - Drive-by Compromise</option>
                    <option value="T1190">T1190 - Exploit Public-Facing Application</option>
                    <option value="T1195">T1195 - Supply Chain Compromise</option>
                    <option value="T1197">T1197 - BITS Jobs</option>
                    <option value="T1199">T1199 - Trusted Relationship</option>
                    <option value="T1200">T1200 - Hardware Additions</option>
                    <option value="T1201">T1201 - Password Policy Discovery</option>
                    <option value="T1202">T1202 - Indirect Command Execution</option>
                    <option value="T1203">T1203 - Exploitation for Client Execution</option>
                    <option value="T1204">T1204 - User Execution</option>
                    <option value="T1205">T1205 - Traffic Signaling</option>
                    <option value="T1207">T1207 - Rogue Domain Controller</option>
                    <option value="T1210">T1210 - Exploitation of Remote Services</option>
                    <option value="T1211">T1211 - Exploitation for Defense Evasion</option>
                    <option value="T1212">T1212 - Exploitation for Credential Access</option>
                    <option value="T1213">T1213 - Data from Information Repositories</option>
                    <option value="T1216">T1216 - System Script Proxy Execution</option>
                    <option value="T1217">T1217 - Browser Bookmark Discovery</option>
                    <option value="T1218">T1218 - System Binary Proxy Execution</option>
                    <option value="T1219">T1219 - Remote Access Software</option>
                    <option value="T1220">T1220 - XSL Script Processing</option>
                    <option value="T1221">T1221 - Template Injection</option>
                    <option value="T1222">T1222 - File and Directory Permissions Modifications</option>
                    <option value="T1480">T1480 - Execution Guardrails</option>
                    <option value="T1482">T1482 - Domain Trust Discovery</option>
                    <option value="T1484">T1484 - Domain Policy Modification</option>
                    <option value="T1485">T1485 - Data Destruction</option>
                    <option value="T1486">T1486 - Data Encrypted for Impact</option>
                    <option value="T1489">T1489 - Service Stop</option>
                    <option value="T1490">T1490 - Inhibit System Recovery</option>
                    <option value="T1491">T1491 - Defacement</option>
                    <option value="T1495">T1495 - Firmware Corruption</option>
                    <option value="T1496">T1496 - Resource Hijacking</option>
                    <option value="T1497">T1497 - Virtualization/Sandbox Evasion</option>
                    <option value="T1498">T1498 - Network Denial of Service</option>
                    <option value="T1499">T1499 - Endpoint Denial of Service</option>
                    <option value="T1505">T1505 - Server Software Component</option>
                    <option value="T1518">T1518 - Software Discovery</option>
                    <option value="T1525">T1525 - Implant Internal Image</option>
                    <option value="T1526">T1526 - Cloud Service Discovery</option>
                    <option value="T1528">T1528 - Steal Application Access Token</option>
                    <option value="T1529">T1529 - System Shutdown/Reboot</option>
                    <option value="T1530">T1530 - Data from Cloud Storage</option>
                    <option value="T1531">T1531 - Account Access Removal</option>
                    <option value="T1534">T1534 - Internal Spearphishing</option>
                    <option value="T1535">T1535 - Unused/Unsupported Cloud Regions</option>
                    <option value="T1537">T1537 - Transfer Data to Cloud Account</option>
                    <option value="T1538">T1538 - Cloud Service Dashboard</option>
                    <option value="T1539">T1539 - Steal Web Session Cookie</option>
                    <option value="T1542">T1542 - Pre-OS Boot</option>
                    <option value="T1543">T1543 - Create or Modify System Process</option>
                    <option value="T1546">T1546 - Event Triggered Execution</option>
                    <option value="T1547">T1547 - Boot or Logon Autostart Execution</option>
                    <option value="T1548">T1548 - Abuse Elevation Control Mechanism</option>
                    <option value="T1550">T1550 - Use Alternate Authentication Material</option>
                    <option value="T1552">T1552 - Unsecured Credentials</option>
                    <option value="T1553">T1553 - Subvert Trust Controls</option>
                    <option value="T1554">T1554 - Compromise Client Software Binary</option>
                    <option value="T1555">T1555 - Credentials from Password Stores</option>
                    <option value="T1556">T1556 - Modify Authentication Process</option>
                    <option value="T1557">T1557 - Adversary-in-the-Middle</option>
                    <option value="T1558">T1558 - Steal or Forge Kerberos Tickets</option>
                    <option value="T1559">T1559 - Inter-Process Communication</option>
                    <option value="T1560">T1560 - Archive Collected Data</option>
                    <option value="T1561">T1561 - Disk Wipe</option>
                    <option value="T1562">T1562 - Impair Defenses</option>
                    <option value="T1563">T1563 - Remote Services Session Hijacking</option>
                    <option value="T1564">T1564 - Hide Artifacts</option>
                    <option value="T1565">T1565 - Data Manipulation</option>
                    <option value="T1566">T1566 - Phishing</option>
                    <option value="T1567">T1567 - Exfiltration Over Web Services</option>
                    <option value="T1568">T1568 - Dynamic Resolution</option>
                    <option value="T1569">T1569 - System Servies</option>
                    <option value="T1570">T1570 - Lateral Tool Transfer</option>
                    <option value="T1571">T1571 - Non-Standard Port</option>
                    <option value="T1572">T1572 - Protocol Tunneling</option>
                    <option value="T1573">T1573 - Encrypted Channel</option>
                    <option value="T1574">T1574 - Hijack Execution Flow</option>
                    <option value="T1578">T1578 - Modify Cloud Compute Infrastructure</option>
                    <option value="T1580">T1580 - Cloud Infrastructure Discovery</option>
                    <option value="T1583">T1583 - Acquire Infrastructure</option>
                    <option value="T1584">T1584 - Compromise Infrastructure</option>
                    <option value="T1585">T1585 - Establish Accounts</option>
                    <option value="T1586">T1586 - Compromise Accounts</option>
                    <option value="T1587">T1587 - Develop Capabilities</option>
                    <option value="T1588">T1588 - Obtain Capabilities</option>
                    <option value="T1589">T1589 - Gather Victim Identify Information</option>
                    <option value="T1590">T1590 - Gather Victim Network Information</option>
                    <option value="T1591">T1591 - Gather Victim Org Information</option>
                    <option value="T1592">T1592 - Gather Victim Host Information</option>
                    <option value="T1593">T1593 - Search Open Website Domains</option>
                    <option value="T1594">T1594 - Search Victim-Owned Websites</option>
                    <option value="T1595">T1595 - Active Scanning</option>
                    <option value="T1596">T1596 - Search Open Technical Databases</option>
                    <option value="T1597">T1597 - Search Closed Sources</option>
                    <option value="T1598">T1598 - Phishing for Information</option>
                    <option value="T1599">T1599 - Network Boundary Bridging</option>
                    <option value="T1600">T1600 - Weaken Encryption</option>
                    <option value="T1601">T1601 - Modify System Image</option>
                    <option value="T1602">T1602 - Data from Configuration Repository</option>
                    <option value="T1606">T1606 - Forge Web Credentials</option>
                    <option value="T1608">T1608 - Stage Capabilities</option>
                    <option value="T1609">T1609 - Container Administration Command</option>
                    <option value="T1610">T1610 - Deploy Container</option>
                    <option value="T1611">T1611 - Escape to Host</option>
                    <option value="T1612">T1612 - Build Image on Host</option>
                    <option value="T1613">T1613 - Container and Resource Discovery</option>
                    <option value="T1614">T1614 - System Location Discovery</option>
                    <option value="T1615">T1615 - Group Policy Discovery</option>
                    <option value="T1619">T1619 - Cloud Storage Object Discovery</option>
                    <option value="T1620">T1620 - Reflective Code Loading</option>
                    <option value="T1621">T1621 - Multi-Factor Authentication Request Generation</option>
                    <option value="T1622">T1622 - Debugger Evasion</option>
                    <option value="T1647">T1647 - Plist File Modification</option>
                    <option value="T1648">T1648 - Serverless Execution</option>
                    <option value="T1649">T1649 - Steal or Forge Authentication Certificates</option>
                </select><br>

                <label for="subtechnique">Sub-Technique</label>
                <select name="subtechnique">
                    <option value="">None</option>
                    <option value="T1001001">T1001.001 - Data Obfuscation: Junk Data</option>
                    <option value="T1001002">T1001.002 - Data Obfuscation: Steganography</option>
                    <option value="T1001003">T1001.003 - Data Obfuscation: Protocol Impersonation</option>
                    <option value="T1003001">T1003.001 - OS Credential Dumping: LSASS Memory</option>
                    <option value="T1003002">T1003.002 - OS Credential Dumping: Security Account Manager</option>
                    <option value="T1003003">T1003.003 - OS Credential Dumping: NTDS</option>
                    <option value="T1003004">T1003.004 - OS Credential Dumping: LSA Secrets</option>
                    <option value="T1003005">T1003.005 - OS Credential Dumping: Cached Domain Credentials</option>
                    <option value="T1003006">T1003.006 - OS Credential Dumping: DCSync</option>
                    <option value="T1003007">T1003.007 - OS Credential Dumping: Proc Filesystem</option>
                    <option value="T1003008">T1003.008 - OS Credential Dumping: /etc/passwd and /etc/shadow</option>
                    <option value="T1011001">T1011.001 - Exfiltration Over Other Network Medium: Exfiltration Over Bluetooth</option>
                    <option value="T1016001">T1016.001 - System Network Configuration Discovery: Internet Connection Discovery</option>
                    <option value="T1020001">T1020.001 - Automated Exfiltration: Traffic Duplication</option>
                    <option value="T1021001">T1021.001 - Remote Services: Remote Desktop Protocol</option>
                    <option value="T1021002">T1021.002 - Remote Services: SMB/Windows Admin Shares</option>
                    <option value="T1021003">T1021.003 - Remote Services: Distributed Component Object Model (DCOM)</option>
                    <option value="T1021004">T1021.004 - Remote Services: SSH</option>
                    <option value="T1021005">T1021.005 - Remote Services: VNC</option>
                    <option value="T1021006">T1021.006 - Remote Services: Windows Remote Management</option>
                    <option value="T1027001">T1027.001 - Obfuscated Files or Information: Binary Padding</option>
                    <option value="T1027002">T1027.002 - Obfuscated Files or Information: Software Packing</option>
                    <option value="T1027003">T1027.003 - Obfuscated Files or Information: Steganography</option>
                    <option value="T1027004">T1027.004 - Obfuscated Files or Information: Compile After Delivery</option>
                    <option value="T1027005">T1027.005 - Obfuscated Files or Information: Indicator Removal from Tools</option>
                    <option value="T1027006">T1027.006 - Obfuscated Files or Information: HTML Smuggling</option>
                    <option value="T1027007">T1027.007 - Obfuscated Files or Information: Dynamic API Resolution</option>
                    <option value="T1027008">T1027.008 - Obfuscated Files or Information: Stripped Payloads</option>
                    <option value="T1027009">T1027.009 - Obfuscated Files or Information: Embedded Payloads</option>
                    <option value="T1036001">T1036.001 - Masquerading: Invalid Code Signature</option>
                    <option value="T1036002">T1036.002 - Masquerading: Right-to-Left Override</option>
                    <option value="T1036003">T1036.003 - Masquerading: Rename System Utilities</option>
                    <option value="T1036004">T1036.004 - Masquerading: Masquerade Task or Service</option>
                    <option value="T1036005">T1036.005 - Masquerading: Match Legitimate Name or Location</option>
                    <option value="T1036006">T1036.006 - Masquerading: Space after Filename</option>
                    <option value="T1036007">T1036.007 - Masquerading: Double File Extension</option>
                    <option value="T1037001">T1037.001 - Boot or Logon Scripts: Logon Scripts (Windows)</option>
                    <option value="T1037002">T1037.002 - Boot or Logon Scripts: Login Hook</option>
                    <option value="T1037003">T1037.003 - Boot or Logon Scripts: Network Logon Script</option>
                    <option value="T1037004">T1037.004 - Boot or Logon Scripts: RC Scripts</option>
                    <option value="T1037005">T1037.005 - Boot or Logon Scripts: Startup Items</option>
                    <option value="T1048001">T1048.001 - Exfiltration Over Alternative Protocol: Exfiltration Over Symmetric Encrypted Non-C2 Protocol</option>
                    <option value="T1048002">T1048.002 - Exfiltration Over Alternative Protocol: Exfiltration Over Asymmetric Encrypted Non-C2 Protocol</option>
                    <option value="T1048003">T1048.003 - Exfiltration Over Alternative Protocol: Exfiltration Over Unencrypted Non-C2 Protocol</option>
                    <option value="T1052001">T1052.001 - Exfiltration Over Physical Medium: Exfiltration OVER USB</option>
                    <option value="T1053002">T1053.002 - Scheduled Task/Job: At (Linux)</option>
                    <option value="T1053003">T1053.003 - Scheduled Task/Job: Cron</option>
                    <option value="T1053005">T1053.005 - Scheduled Task/Job: Scheduled Task</option>
                    <option value="T1053006">T1053.006 - Scheduled Task/Job: Systemd Timers</option>
                    <option value="T1053007">T1053.007 - Scheduled Task/Job: Container Orchestration Job</option>
                    <option value="T1055001">T1055.001 - Process Injection: Dynamic-link Library Injection</option>
                    <option value="T1055002">T1055.002 - Process Injection: Portable Executable Injection</option>
                    <option value="T1055003">T1055.003 - Process Injection: Thread Execution Hijacking</option>
                    <option value="T1055004">T1055.004 - Process Injection: Asynchronous Procedure Call</option>
                    <option value="T1055005">T1055.005 - Process Injection: Thread Local Storage</option>
                    <option value="T1055008">T1055.008 - Process Injection: Ptrace System Calls</option>
                    <option value="T1055009">T1055.009 - Process Injection: Proc Memory</option>
                    <option value="T1055011">T1055.011 - Process Injection: Extra Window Memory Injection</option>
                    <option value="T1055012">T1055.012 - Process Injection: Process Hollowing</option>
                    <option value="T1055013">T1055.013 - Process Injection: Process Doppelgänging</option>
                    <option value="T1055014">T1055.014 - Process Injection: VDSO Hijacking</option>
                    <option value="T1055015">T1055.015 - Process Injection: ListPlanting</option>
                    <option value="T1056001">T1056.001 - Input Capture: Keylogging</option>
                    <option value="T1056002">T1056.002 - Input Capture: GUI Input Capture</option>
                    <option value="T1056003">T1056.003 - Input Capture: Web Portal Capture</option>
                    <option value="T1056004">T1056.004 - Input Capture: Credential API Hooking</option>                
                    <option value="T1059001">T1059.001 - Command and Scripting Interpreter: PowerShell</option>
                    <option value="T1059002">T1059.002 - Command and Scripting Interpreter: AppleScript</option>
                    <option value="T1059003">T1059.003 - Command and Scripting Interpreter: Windows Command Shell</option>
                    <option value="T1059004">T1059.004 - Command and Scripting Interpreter: Unix Shell</option>
                    <option value="T1059005">T1059.005 - Command and Scripting Interpreter: Visual Basic</option>
                    <option value="T1059006">T1059.006 - Command and Scripting Interpreter: Python</option>
                    <option value="T1059007">T1059.007 - Command and Scripting Interpreter: JavaScript</option>
                    <option value="T1059008">T1059.008 - Command and Scripting Interpreter: Network Device CLI</option>
                    <option value="T1069001">T1069.001 - Permission Groups Discovery: Local Groups</option>
                    <option value="T1069002">T1069.002 - Permission Groups Discovery: Domain Groups</option>
                    <option value="T1069003">T1069.003 - Permission Groups Discovery: Cloud Groups</option>
                    <option value="T1070001">T1070.001 - Indicator Removal on Host: Clear Windows Event Logs</option>
                    <option value="T1070002">T1070.002 - Indicator Removal on Host: Clear Linux or Mac System Logs</option>
                    <option value="T1070003">T1070.003 - Indicator Removal on Host: Clear Command History</option>
                    <option value="T1070004">T1070.004 - Indicator Removal on Host: File Deletion</option>
                    <option value="T1070005">T1070.005 - Indicator Removal on Host: Network Share Connection Removal</option>
                    <option value="T1070006">T1070.006 - Indicator Removal on Host: Timestomp</option>
                    <option value="T1070007">T1070.007 - Indicator Removal on Host: Clear Network Connection History and Configurations</option>
                    <option value="T1070008">T1070.008 - Indicator Removal on Host: Clear Mailbox Data</option>
                    <option value="T1070009">T1070.009 - Indicator Removal on Host: Clear Persistence</option>
                    <option value="T1071001">T1071.001 - Application Layer Protocol: Web Protocols</option>
                    <option value="T1071002">T1071.002 - Application Layer Protocol: File Transfer Protocols</option>
                    <option value="T1071003">T1071.003 - Application Layer Protocol: Mail Protocols</option>
                    <option value="T1071004">T1071.004 - Application Layer Protocol: DNS</option>
                    <option value="T1071004">T1074.001 - Data Staged: Local Data Staging</option>
                    <option value="T1071004">T1074.002 - Data Staged: Remote Data Staging</option>
                    <option value="T1078001">T1078.001 - Valid Accounts: Default Accounts</option>
                    <option value="T1078002">T1078.002 - Valid Accounts: Domain Accounts</option>
                    <option value="T1078003">T1078.003 - Valid Accounts: Local Accounts</option>
                    <option value="T1078004">T1078.004 - Valid Accounts: Cloud Accounts</option>
                    <option value="T1087001">T1087.001 - Account Discovery: Local Account</option>
                    <option value="T1087002">T1087.002 - Account Discovery: Domain Account</option>
                    <option value="T1087003">T1087.003 - Account Discovery: Email Account</option>
                    <option value="T1087004">T1087.004 - Account Discovery: Cloud Account</option>
                    <option value="T1090001">T1090.001 - Proxy: Internal Proxy</option>
                    <option value="T1090002">T1090.002 - Proxy: External Proxy</option>
                    <option value="T1090003">T1090.003 - Proxy: Multi-hop Proxy</option>
                    <option value="T1090004">T1090.004 - Proxy: Domain Fronting</option>                  
                    <option value="T1098001">T1098.001 - Account Manipulation: Additional Cloud Credentials</option>
                    <option value="T1098002">T1098.002 - Account Manipulation: Additional Email Delegate Permissions</option>
                    <option value="T1098003">T1098.003 - Account Manipulation: Cloud Roles</option>
                    <option value="T1098004">T1098.004 - Account Manipulation: SSH Authorized Keys</option>
                    <option value="T1098004">T1098.004 - Account Manipulation:Device Registration</option>
                    <option value="T1102001">T1102.001 - Web Service: Dead Drop Resolver</option>
                    <option value="T1102002">T1102.002 - Web Service: Bidirectional Communication</option>
                    <option value="T1102003">T1102.003 - Web Service: One-Way Communication</option>                          
                    <option value="T1110001">T1110.001 - Brute Force: Password Guessing</option>
                    <option value="T1110002">T1110.002 - Brute Force: Password Cracking</option>
                    <option value="T1110003">T1110.003 - Brute Force: Password Spraying</option>
                    <option value="T1110004">T1110.004 - Brute Force: Credential Stuffing</option>                   
                    <option value="T1114001">T1114.001 - Email Collection: Local Email Collection</option>
                    <option value="T1114002">T1114.002 - Email Collection: Remote Email Collection</option>
                    <option value="T1114003">T1114.003 - Email Collection: Email Forwarding Rule</option>
                    <option value="T1127001">T1127.001 - Trusted Developer Utilities Proxy Execution: MSBuild</option>
                    <option value="T1132001">T1132.001 - Data Encoding: Standard Encoding</option>
                    <option value="T1132002">T1132.002 - Data Encoding: Non-Standard Encoding</option>
                    <option value="T1134001">T1134.001 - Access Token Manipulation: Token Impersonation/Theft</option>
                    <option value="T1134002">T1134.002 - Access Token Manipulation: Create Process with Token</option>
                    <option value="T1134003">T1134.003 - Access Token Manipulation: Make and Impersonate Token</option>
                    <option value="T1134004">T1134.004 - Access Token Manipulation: Parent PID Spoofing</option>
                    <option value="T1134004">T1134.005 - Access Token Manipulation: SID-Histrory Injection</option>
                    <option value="T1136001">T1136.001 - Create Account: Local Account</option>
                    <option value="T1136002">T1136.002 - Create Account: Domain Account</option>
                    <option value="T1136003">T1136.003 - Create Account: Cloud Account</option>
                    <option value="T1137001">T1137.001 - Office Application Startup: Office Template Macros</option>
                    <option value="T1137002">T1137.002 - Office Application Startup: Office Test</option>
                    <option value="T1137003">T1137.003 - Office Application Startup: Outlook Forms</option>
                    <option value="T1137004">T1137.004 - Office Application Startup: Outlook Home Page</option>
                    <option value="T1137005">T1137.005 - Office Application Startup: Outlook Rules</option>
                    <option value="T1137006">T1137.006 - Office Application Startup: Add-ins</option>
                    <option value="T1195001">T1195.001 - Supply Chain Compromise: Compromise Software Dependencies and Development Tools</option>
                    <option value="T1195002">T1195.002 - Supply Chain Compromise: Compromise Software Supply Chain</option>
                    <option value="T1195003">T1195.003 - Supply Chain Compromise: Compromise Hardware Supply Chain</option>
                    <option value="T1204001">T1204.001 - User Execution: Malicious Link</option>
                    <option value="T1204002">T1204.002 - User Execution: Malicious File</option>
                    <option value="T1204003">T1204.003 - User Execution: Malicious Image</option>
                    <option value="T1205001">T1205.001 - Traffic Hijacking: Port knocking</option>
                    <option value="T1205002">T1205.002 - Traffic Hijacking: Socket Filters</option>
                    <option value="T1213001">T1213.001 - Data from Information Repositories: Confluence</option>
                    <option value="T1213002">T1213.002 - Data from Information Repositories: SharePoint</option>
                    <option value="T1213003">T1213.003 - Data from Information Repositories: Code Repositories</option>
                    <option value="T1216001">T1216.001 - System Script Proxy Execution: PubPrn</option>
                    <option value="T1218001">T1218.001 - System Binary Proxy Execution: Compiled HTML File</option>
                    <option value="T1218002">T1218.002 - System Binary Proxy Execution: Control Panel</option>
                    <option value="T1218003">T1218.003 - System Binary Proxy Execution: CMSTP</option>
                    <option value="T1218004">T1218.004 - System Binary Proxy Execution: InstallUtil</option>
                    <option value="T1218005">T1218.005 - System Binary Proxy Execution: Mshta</option>
                    <option value="T1218007">T1218.007 - System Binary Proxy Execution: Msiexec</option>
                    <option value="T1218008">T1218.008 - System Binary Proxy Execution: Odbcconf</option>
                    <option value="T1218009">T1218.009 - System Binary Proxy Execution: Regsvcs/Regasm</option>
                    <option value="T1218010">T1218.010 - System Binary Proxy Execution: Regsvr32</option>
                    <option value="T1218011">T1218.011 - System Binary Proxy Execution: Rundll32</option>
                    <option value="T1218012">T1218.012 - System Binary Proxy Execution: Verclsid</option>
                    <option value="T1218013">T1218.013 - System Binary Proxy Execution: Mavinject</option>
                    <option value="T1218014">T1218.014 - System Binary Proxy Execution: MMC</option>
                    <option value="T1222001">T1222.001 - File and Directory Permissions Modification: Windows File and Directory Permissions Modification</option>
                    <option value="T1222002">T1222.002 - File and Directory Permissions Modification: Linux and Mac File and Directory Permissions Modification</option>
                    <option value="T1480001">T1480.001 - Execution Guardrails: Environmental Keying</option>
                    <option value="T1484001">T1484.001 - Domain Policy Modification: Group Policy Modification</option>
                    <option value="T1484002">T1484.002 - Domain Policy Modification: Domain Trust Modification</option>
                    <option value="T1491001">T1491.001 - Defacement: Internal Defacement</option>
                    <option value="T1491002">T1491.002 - Defacement: External Defacement</option>
                    <option value="T1497001">T1497.001 - Virtualization/Sandbox Evasion: System Checks</option>
                    <option value="T1497002">T1497.002 - Virtualization/Sandbox Evasion: User Activity Based Checks</option>
                    <option value="T1497003">T1497.003 - Virtualization/Sandbox Evasion: Time Based Evasion</option>
                    <option value="T1498001">T1498.001 - Network Denial of Service: Direct Network Flood</option>
                    <option value="T1498002">T1498.002 - Network Denial of Service: Amplification</option>
                    <option value="T1499001">T1499.001 - Endpoint Denial of Service: OS Exhaustion Flood</option>
                    <option value="T1499002">T1499.002 - Endpoint Denial of Service: Service Exhaustion Flood</option>
                    <option value="T1499003">T1499.003 - Endpoint Denial of Service: Application Exhaustion Flood</option>
                    <option value="T1499004">T1499.004 - Endpoint Denial of Service: Application or System Exploitation</option>
                    <option value="T1505001">T1505.001 - Server Software Component: SQL Stored Procedures</option>
                    <option value="T1505002">T1505.002 - Server Software Component: Transport Agent</option>
                    <option value="T1505003">T1505.003 - Server Software Component: Web Shell</option>
                    <option value="T1505004">T1505.004 - Server Software Component: IIS Components</option>
                    <option value="T1505005">T1505.005 - Server Software Component: Terminal Services DLL</option>                    
                    <option value="T1518001">T1518.001 - Server Software Component: Security Software Discovery</option>
                    <option value="T1542001">T1542.001 - Pre-OS Boot: System Firmware</option>
                    <option value="T1542002">T1542.002 - Pre-OS Boot: Component Firmware</option>
                    <option value="T1542003">T1542.003 - Pre-OS Boot: Bootkit</option>
                    <option value="T1542004">T1542.004 - Pre-OS Boot: ROMMONkit</option>
                    <option value="T1542005">T1542.005 - Pre-OS Boot: TFTP Boot</option>
                    <option value="T1543001">T1543.001 - Create or Modify System Process: Launch Agent</option>
                    <option value="T1543002">T1543.002 - Create or Modify System Process: Systemd Service</option>
                    <option value="T1543003">T1543.003 - Create or Modify System Process: Windows Service</option>
                    <option value="T1543004">T1543.004 - Create or Modify System Process: Launch Daemon</option>
                    <option value="T1546001">T1546.001 - Event Triggered Execution: Change Default File Association</option>
                    <option value="T1546002">T1546.002 - Event Triggered Execution: Screensaver</option>
                    <option value="T1546003">T1546.003 - Event Triggered Execution: Windows Management Instrumentation Event Subscription</option>
                    <option value="T1546004">T1546.004 - Event Triggered Execution: Unix Shell Configuration Modification</option>
                    <option value="T1546005">T1546.005 - Event Triggered Execution: Trap</option>
                    <option value="T1546006">T1546.006 - Event Triggered Execution: LC_LOAD_DYLIB Addition</option>
                    <option value="T1546007">T1546.007 - Event Triggered Execution: Netsh Helper DLL</option>
                    <option value="T1546008">T1546.008 - Event Triggered Execution: Accessibility Features</option>
                    <option value="T1546009">T1546.009 - Event Triggered Execution: AppCert DLLs</option>
                    <option value="T1546010">T1546.010 - Event Triggered Execution: AppInit DLLs</option>
                    <option value="T1546011">T1546.011 - Event Triggered Execution: Application Shimming</option>
                    <option value="T1546012">T1546.012 - Event Triggered Execution: Image File Execution Options Injection</option>
                    <option value="T1546013">T1546.013 - Event Triggered Execution: PowerShell Profile</option>
                    <option value="T1546014">T1546.014 - Event Triggered Execution: Emond</option>
                    <option value="T1546015">T1546.015 - Event Triggered Execution: Component Object Model Hijacking</option>
                    <option value="T1546016">T1546.016 - Event Triggered Execution: Installer Packages</option>
                    <option value="T1547001">T1547.001 - Boot or Logon Autostart Execution: Registry Run Keys / Startup Folder</option>
                    <option value="T1547002">T1547.002 - Boot or Logon Autostart Execution: Authentication Package</option>
                    <option value="T1547003">T1547.003 - Boot or Logon Autostart Execution: Time Providers</option>
                    <option value="T1547004">T1547.004 - Boot or Logon Autostart Execution: Winlogon Helper DLL</option>
                    <option value="T1547005">T1547.005 - Boot or Logon Autostart Execution: Security Support Provider</option>
                    <option value="T1547006">T1547.006 - Boot or Logon Autostart Execution: Kernel Modules and Extensions</option>
                    <option value="T1547007">T1547.007 - Boot or Logon Autostart Execution: Re-opened Applications</option>
                    <option value="T1547008">T1547.008 - Boot or Logon Autostart Execution: LSASS Driver</option>
                    <option value="T1547009">T1547.009 - Boot or Logon Autostart Execution: Shortcut Modification</option>
                    <option value="T1547010">T1547.010 - Boot or Logon Autostart Execution: Port Monitors</option>
                    <option value="T1547012">T1547.012 - Boot or Logon Autostart Execution: Print Processors</option>
                    <option value="T1547013">T1547.013 - Boot or Logon Autostart Execution: XDG Autostart Entries</option>
                    <option value="T1547014">T1547.014 - Boot or Logon Autostart Execution: Active Setup</option>
                    <option value="T1547015">T1547.015 - Boot or Logon Autostart Execution: Login Items</option>
                    <option value="T1548001">T1548.001 - Abuse Elevation Control Mechanism: Setuid and Setgid</option>
                    <option value="T1548002">T1548.002 - Abuse Elevation Control Mechanism: Bypass User Account Control</option>
                    <option value="T1548003">T1548.003 - Abuse Elevation Control Mechanism: Sudo and Sudo Caching</option>
                    <option value="T1548004">T1548.004 - Abuse Elevation Control Mechanism: Elevated Execution with Prompt</option>
                    <option value="T1550001">T1550.001 - Use Alternate Authentication Material: Application Access Token</option>
                    <option value="T1550002">T1550.002 - Use Alternate Authentication Material: Pass the Hash</option>
                    <option value="T1550003">T1550.003 - Use Alternate Authentication Material: Pass the Ticket</option>
                    <option value="T1550004">T1550.004 - Use Alternate Authentication Material: Web Session Cookie</option>
                    <option value="T1552001">T1552.001 - Unsecured Credentials: Credentials In Files</option>
                    <option value="T1552002">T1552.002 - Unsecured Credentials: Credentials In Registry</option>
                    <option value="T1552003">T1552.003 - Unsecured Credentials: Bash History</option>
                    <option value="T1552004">T1552.004 - Unsecured Credentials: Private Keys</option>
                    <option value="T1552005">T1552.005 - Unsecured Credentials: Cloud Instance Metadata API</option>
                    <option value="T1552006">T1552.006 - Unsecured Credentials: Group Policy Preferences</option>
                    <option value="T1552007">T1552.007 - Unsecured Credentials: Container API</option>
                    <option value="T1553001">T1553.001 - Subvert Trust Controls: Gatekeeper Bypass</option>
                    <option value="T1553002">T1553.002 - Subvert Trust Controls: Code Signing</option>
                    <option value="T1553003">T1553.003 - Subvert Trust Controls: SIP and Trust Provider Hijacking</option>
                    <option value="T1553004">T1553.004 - Subvert Trust Controls: Install Root Certificate</option>
                    <option value="T1553005">T1553.005 - Subvert Trust Controls: Mark-of-the-Web Bypass</option>
                    <option value="T1553006">T1553.006 - Subvert Trust Controls: Code Signing Policy Modification</option>
                    <option value="T1555001">T1555.001 - Credentials from Password Stores: Keychain</option>
                    <option value="T1555002">T1555.002 - Credentials from Password Stores: Securityd Memory</option>
                    <option value="T1555003">T1555.003 - Credentials from Password Stores: Credentials from Web Browsers</option>
                    <option value="T1555004">T1555.004 - Credentials from Password Stores: Windows Credential Manager</option>
                    <option value="T1555005">T1555.005 - Credentials from Password Stores: Password Managers</option>
                    <option value="T1556001">T1556.001 - Modify Authentication Process: Domain Controller Authentication</option>
                    <option value="T1556002">T1556.002 - Modify Authentication Process: Password Filter DLL</option>
                    <option value="T1556003">T1556.003 - Modify Authentication Process: Pluggable Authentication Modules</option>
                    <option value="T1556004">T1556.004 - Modify Authentication Process: Network Device Authentication</option>
                    <option value="T1556005">T1556.005 - Modify Authentication Process: Reversible Encryption</option>
                    <option value="T1556006">T1556.006 - Modify Authentication Process: Multi-Factor Aunthetication</option>
                    <option value="T1556007">T1556.007 - Modify Authentication Process: Hybrid Identity</option>
                    <option value="T1557001">T1557.001 - Adversary-in-the-Middle: LLMNR/NBT-NS Poisoning and SMB Relay</option>
                    <option value="T1557002">T1557.002 - Adversary-in-the-Middle: ARP Cache Poisoning</option>
                    <option value="T1557003">T1557.003 - Adversary-in-the-Middle: DHCP Spoofing</option>
                    <option value="T1558001">T1558.001 - Steal or Forge Kerberos Tickets: Golden Ticket</option>
                    <option value="T1558002">T1558.002 - Steal or Forge Kerberos Tickets: Silver Ticket</option>
                    <option value="T1558003">T1558.003 - Steal or Forge Kerberos Tickets: Kerberoasting</option>
                    <option value="T1558004">T1558.004 - Steal or Forge Kerberos Tickets: AS-REP Roasting</option>
                    <option value="T1559001">T1559.001 - Inter-Process Communication: Component Object Model</option>
                    <option value="T1559002">T1559.002 - Inter-Process Communication: Dynamic Data Exchange</option>
                    <option value="T1559003">T1559.003 - Inter-Process Communication: XPC Services</option>
                    <option value="T1560001">T1560.001 - Archive Collected Data: Archive via Utility</option>
                    <option value="T1560001">T1560.001 - Archive Collected Data: Archive via Library</option>
                    <option value="T1560001">T1560.001 - Archive Collected Data: Archive via Custom Method</option>
                    <option value="T1561001">T1561.001 - Disk Wipe: Disk Content Wipe</option>
                    <option value="T1561002">T1561.002 - Disk Wipe: Disk Structure Wipe</option>
                    <option value="T1562001">T1562.001 - Impair Defenses: Disable or Modify Tools</option>
                    <option value="T1562002">T1562.002 - Impair Defenses: Disable Windows Event Logging</option>
                    <option value="T1562003">T1562.003 - Impair Defenses: Impair Command History Logging</option>
                    <option value="T1562004">T1562.004 - Impair Defenses: Disable or Modify System Firewall</option>
                    <option value="T1562006">T1562.006 - Impair Defenses: Indicator Blocking</option>
                    <option value="T1562007">T1562.007 - Impair Defenses: Disable or Modify Cloud Firewall</option>
                    <option value="T1562008">T1562.008 - Impair Defenses: Disable Disable Cloud Logs</option>
                    <option value="T1562009">T1562.009 - Impair Defenses: Safe Mode Boot</option>
                    <option value="T1562010">T1562.010 - Impair Defenses: Downgrade Attack</option>
                    <option value="T1563001">T1563.001 - Remote Service Session Hijacking: SSH Hijacking</option>
                    <option value="T1563002">T1563.002 - Remote Service Session Hijacking: RDP Hijacking</option>
                    <option value="T1564001">T1564.001 - Hide Artifacts: Hidden Files and Directories</option>
                    <option value="T1564002">T1564.002 - Hide Artifacts: Hidden Users</option>
                    <option value="T1564003">T1564.003 - Hide Artifacts: Hidden Window</option>
                    <option value="T1564004">T1564.004 - Hide Artifacts: NTFS File Attributes</option>
                    <option value="T1564005">T1564.005 - Hide Artifacts: Hidden File System</option>
                    <option value="T1564006">T1564.006 - Hide Artifacts: Run Virtual Instance</option>
                    <option value="T1564007">T1564.007 - Hide Artifacts: VBA Stomping</option>
                    <option value="T1564008">T1564.008 - Hide Artifacts: Email Hiding Rules</option>
                    <option value="T1564009">T1564.009 - Hide Artifacts: Resources Forking</option>
                    <option value="T1564010">T1564.010 - Hide Artifacts: Process Argument Spoofing</option>
                    <option value="T1565001">T1565.001 - Data Manipulation: Stored Data Manipulation</option>
                    <option value="T1565002">T1565.002 - Data Manipulation: Transmitted Data Manipulation</option>
                    <option value="T1565003">T1565.003 - Data Manipulation: Runtime Data Manipulation</option>
                    <option value="T1566001">T1566.001 - Phishing: Spearphishing Attachment</option>
                    <option value="T1566002">T1566.002 - Phishing: Spearphishing Link</option>
                    <option value="T1566003">T1566.003 - Phishing: Spearphishing via Service</option>
                    <option value="T1567001">T1567.001 - Exfiltration Over Web Service: Exfiltration to Code Repository</option>
                    <option value="T1567002">T1567.002 - Exfiltration Over Web Service: Exfiltration to Cloud Storage</option>
                    <option value="T1568001">T1568.001 - Dynamic Resolution: Fast Flux DNS</option>
                    <option value="T1568002">T1568.002 - Dynamic Resolution: Domain Generation Algorithms</option>
                    <option value="T1568003">T1568.003 - Dynamic Resolution: DNS Calculation</option>
                    <option value="T1569001">T1569.001 - System Services: Launchctl</option>
                    <option value="T1569002">T1569.002 - System Services: Service Execution</option>
                    <option value="T1573001">T1573.001 - Encrypted Channel: Symmetric Cryptography</option>
                    <option value="T1573002">T1573.002 - Encrypted Channel: Asymmetric Cryptography</option>
                    <option value="T1574001">T1574.001 - Hijack Execution Flow: DLL Search Order Hijacking</option>
                    <option value="T1574002">T1574.002 - Hijack Execution Flow: DLL Side-Loading</option>
                    <option value="T1574004">T1574.004 - Hijack Execution Flow: Dylib Hijacking</option>
                    <option value="T1574005">T1574.005 - Hijack Execution Flow: Executable Installer File Permissions Weakness</option>
                    <option value="T1574006">T1574.006 - Hijack Execution Flow: Dynamic Linker Hijacking</option>
                    <option value="T1574007">T1574.007 - Hijack Execution Flow: Path Interception by PATH Environment Variable</option>
                    <option value="T1574008">T1574.008 - Hijack Execution Flow: Path Interception by Search Order Hijacking</option>
                    <option value="T1574009">T1574.009 - Hijack Execution Flow: Path Interception by Unquoted Path</option>
                    <option value="T1574010">T1574.010 - Hijack Execution Flow: Services File Permissions Weakness</option>
                    <option value="T1574011">T1574.011 - Hijack Execution Flow: Services Registry Permissions Weakness</option>
                    <option value="T1574012">T1574.012 - Hijack Execution Flow: COR_PROFILER</option>
                    <option value="T1574013">T1574.013 - Hijack Execution Flow: KernelCallbackTable</option>
                    <option value="T1578001">T1578.001 - Modify Cloud Compute Infrastructure: Create Snapshot</option>
                    <option value="T1578002">T1578.002 - Modify Cloud Compute Infrastructure: Create Cloud Instance</option>
                    <option value="T1578002">T1578.002 - Modify Cloud Compute Infrastructure: Delete Cloud Instance</option>
                    <option value="T1578003">T1578.003 - Modify Cloud Compute Infrastructure: Revert Cloud Instance</option>
                    <option value="T1583001">T1583.001 - Acquire Infrastructure: Domains</option>
                    <option value="T1583002">T1583.002 - Acquire Infrastructure: DNS Server</option>
                    <option value="T1583003">T1583.003 - Acquire Infrastructure: Virtual Private Server</option>
                    <option value="T1583004">T1583.004 - Acquire Infrastructure: Server</option>
                    <option value="T1583005">T1583.005 - Acquire Infrastructure: Botnet</option>
                    <option value="T1583006">T1583.006 - Acquire Infrastructure: Web Services</option>
                    <option value="T1583007">T1583.007 - Acquire Infrastructure: Serverless</option>
                    <option value="T1584001">T1584.001 - Compromise Infrastructure: Domains</option>
                    <option value="T1584002">T1584.002 - Compromise Infrastructure: DNS Server</option>
                    <option value="T1584003">T1584.003 - Compromise Infrastructure: Virtual Private Server</option>
                    <option value="T1584004">T1584.004 - Compromise Infrastructure: Server</option>
                    <option value="T1584005">T1584.005 - Compromise Infrastructure: Botnet</option>
                    <option value="T1584006">T1584.006 - Compromise Infrastructure: Web Services</option>
                    <option value="T1584007">T1584.007 - Compromise Infrastructure: Serverless</option>
                    <option value="T1585001">T1585.001 - Establish Accounts: Social Media Accounts</option>
                    <option value="T1585002">T1585.002 - Establish Accounts: Email Accounts</option>
                    <option value="T1585003">T1585.003 - Establish Accounts: Cloud Accounts</option>
                    <option value="T1586001">T1586.001 - Compromise Accounts: Social Media Accounts</option>
                    <option value="T1586002">T1586.002 - Compromise Accounts: Email Accounts</option>
                    <option value="T1586003">T1586.003 - Compromise Accounts: Cloud Accounts</option>
                    <option value="T1587001">T1587.001 - Develop Capabilities: Malware</option>
                    <option value="T1587002">T1587.002 - Develop Capabilities: Code Signing Certificates</option>
                    <option value="T1587003">T1587.003 - Develop Capabilities: Digital Certificates</option>
                    <option value="T1587004">T1587.004 - Develop Capabilities: Exploits</option>
                    <option value="T1588001">T1588.001 - Obtain Capabilities: Malware</option>
                    <option value="T1588002">T1588.002 - Obtain Capabilities: Tools</option>
                    <option value="T1588003">T1588.003 - Obtain Capabilities: Code Signing Certificates</option>
                    <option value="T1588004">T1588.004 - Obtain Capabilities: Digital Certificates</option>
                    <option value="T1588005">T1588.005 - Obtain Capabilities: Exploits</option>
                    <option value="T1588006">T1588.006 - Obtain Capabilities: Vulnerabilities</option>
                    <option value="T1589001">T1589.001 - Gather Victim Identity Information: Credentials</option>
                    <option value="T1589002">T1589.002 - Gather Victim Identity Information: Email Addresses</option>
                    <option value="T1589003">T1589.003 - Gather Victim Identity Information: Employee Names</option>
                    <option value="T1590001">T1590.001 - Gather Victim Network Information: Domain Properties</option>
                    <option value="T1590002">T1590.002 - Gather Victim Network Information: DNS</option>
                    <option value="T1590003">T1590.003 - Gather Victim Network Information: Network Trust Dependencies</option>
                    <option value="T1590004">T1590.004 - Gather Victim Network Information: Network Topology</option>
                    <option value="T1590005">T1590.005 - Gather Victim Network Information: IP Addresses</option>
                    <option value="T1590006">T1590.006 - Gather Victim Network Information: Network Security Appliances</option>
                    <option value="T1591001">T1591.001 - Gather Victim Org Information: Determine Physical Locations</option>
                    <option value="T1591002">T1591.002 - Gather Victim Org Information: Business Relationships</option>
                    <option value="T1591003">T1591.003 - Gather Victim Org Information: Identity Business Tempo</option>
                    <option value="T1591004">T1591.004 - Gather Victim Org Information: Identity Roles</option>
                    <option value="T1592001">T1592.001 - Gather Victim Host Information: Hardware</option>
                    <option value="T1592002">T1592.002 - Gather Victim Host Information: Software</option>
                    <option value="T1592003">T1592.003 - Gather Victim Host Information: Firmware</option>
                    <option value="T1592004">T1592.004 - Gather Victim Host Information: Client Configurations</option>
                    <option value="T1593001">T1593.001 - Search Open Websites/Domains: Social Media</option>
                    <option value="T1593002">T1593.002 - Search Open Websites/Domains: Search Engines</option>
                    <option value="T1593002">T1593.002 - Search Open Websites/Domains: Code Repositories</option>
                    <option value="T1595001">T1595.001 - Active Scanning: Scanning IP Blocks</option>
                    <option value="T1595002">T1595.002 - Active Scanning: Vulnerability Scanning</option>
                    <option value="T1595003">T1595.003 - Active Scanning: Wordlist Scanning</option>
                    <option value="T1596001">T1596.001 - Search Open Technical Database: DNS/Passive DNS</option>
                    <option value="T1596002">T1596.002 - Search Open Technical Database: WHOIS</option>
                    <option value="T1596003">T1596.003 - Search Open Technical Database: Digital Certificates</option>
                    <option value="T1596004">T1596.004 - Search Open Technical Database: CDNs</option>
                    <option value="T1596005">T1596.005 - Search Open Technical Database: Scan Databases</option>
                    <option value="T1597001">T1597.001 - Search Close Sources: Threat Intel Vendors</option>
                    <option value="T1597002">T1597.002 - Search Close Sources: Purchase Technical Data</option>
                    <option value="T1598001">T1598.001 - Phishing for Information: Spearphishing Service</option>
                    <option value="T1598002">T1598.002 - Phishing for Information: Spearphishing Attachment</option>
                    <option value="T1598003">T1598.003 - Phishing for Information: Spearphishing Link</option>
                    <option value="T1599001">T1599.001 - Network Boundary Bridging: Network Address Translation Traversal</option>
                    <option value="T1600001">T1600.001 - Weaken Encryption: Reduce Key Space</option>
                    <option value="T1600002">T1600.002 - Weaken Encryption: Disable Crypto Hardware</option>
                    <option value="T1601001">T1601.001 - Modify System Image: Patch System Image</option>
                    <option value="T1601002">T1601.002 - Modify System Image: Downgrade System Image</option>
                    <option value="T1602001">T1602.001 - Data from Configuration Repository: SNMP (MIB Dump)</option>
                    <option value="T1602002">T1602.002 - Data from Configuration Repository: Network Device Configuration Dump</option>
                    <option value="T1606001">T1606.001 - Forge Web Credentials: Web Cookies</option>
                    <option value="T1606002">T1606.002 - Forge Web Credentials: SAML Tokens</option>
                    <option value="T1608001">T1608.001 - Stage Capabilities: Upload Malware</option>
                    <option value="T1608002">T1608.002 - Stage Capabilities: Upload Tool</option>
                    <option value="T1608003">T1608.003 - Stage Capabilities: Install Digital Certificate</option>
                    <option value="T1608004">T1608.004 - Stage Capabilities: Drive-by Target</option>
                    <option value="T1608005">T1608.005 - Stage Capabilities: Link Target</option>
                    <option value="T1608006">T1608.006 - Stage Capabilities: SEO Poisoning</option>
                    <option value="T1614001">T1614.001 - System Location Discovery: System Language Discovery</option>
                </select><br>

 
                <label for="activity">Activity:</label>
                <textarea name="activity" required></textarea><br>
                <button type="button" class="removeMitre">Remove</button>
                <hr>
            `;
            mitreContainer.appendChild(mitreForm);

            // Remove mitre Entry
            mitreForm.querySelector(".removeMitre").addEventListener("click", () => {
                mitreContainer.removeChild(mitreForm);
            });
    });

//Add Threat Actor
const metadataContainer = document.getElementById("metadataContainer");
const addMetadataButton = document.getElementById("addMetadata");

        // Add Threat actor Form
        addMetadataButton.addEventListener("click", () => {
            const metadataForm = document.createElement("div");
            metadataForm.classList.add("metadata-entry");
            metadataForm.innerHTML = `
            <div class="report-row">
                <div class="third-column">
                    <label for="name">Threat Actor Name</label>
                    <input type="text" name="name" required>
                </div>
                <div class="third-column">
                    <label for="nameAliases">Threat Actor Aliases</label>
                    <input type="text" name="nameAliases">
                </div>
            </div>
                
                <label for="motive">Threat Actor Motive:</label>
                <select name="motive" id="motive" required>
                    <option value="">Select Motive</option>
                    <option value="Financial Gain">Financial Gain</option>
                    <option value="Espionage">Espionage</option>
                    <option value="Hacktivism">Hacktivism</option>
                    <option value="Revenge">Revenge</option>
                    <option value="Ideology">Ideology</option>
                    <option value="Data Theft">Data Theft</option>
                    <option value="Disruption">Disruption</option>
                    <option value="Notoriety">Notoriety</option>
                    <option value="Cyber Warfare">Cyber Warfare</option>
                    <option value="Ransomware Deployment">Ransomware Deployment</option>
                    <option value="Botnet Creation">Botnet Creation</option>
                    <option value="Credential Harvesting">Credential Harvesting</option>
                    <option value="Exploitation of Vulnerabilities">Exploitation of Vulnerabilities</option>
                    <option value="Other">Other</option>
                </select><br>

                <div class="third-column">
                   <label for="sector">Sector:</label>
                   <select name="sector" required>
                       <option value="">Select Sector</option>
                       <option value="Finance">Finance</option>
                       <option value="Healthcare">Healthcare</option>
                       <option value="Technology">Technology</option>
                       <option value="Energy">Energy</option>
                       <option value="Government">Government</option>
                       <option value="Education">Education</option>
                       <option value="Retail">Retail</option>
                       <option value="Telecommunications">Telecommunications</option>
                       <option value="Manufacturing">Manufacturing</option>
                       <option value="Transportation">Transportation</option>
                       <option value="Defense">Defense</option>
                       <option value="Hospitality">Hospitality</option>
                       <option value="Legal">Legal</option>
                       <option value="Media and Entertainment">Media and Entertainment</option>
                       <option value="Utilities">Utilities</option>
                       <option value="Agriculture">Agriculture</option>
                       <option value="Insurance">Insurance</option>
                       <option value="Real Estate">Real Estate</option>
                       <option value="E-commerce">E-commerce</option>
                       <option value="Non-Profit">Non-Profit</option>
                       <option value="Critical Infrastructure">Critical Infrastructure</option>
                   </select><br>
                </div>
            </div>
            <div class="report-row">
                <div class="second-column"         
                    <label for="location">Location:</label>
                    <select name="location" required>
                        <option value="">Select Location</option>
                        <option value="Others">Others</option>
                        <option value="Johor">Johor</option>
                        <option value="Kedah">Kedah</option>
                        <option value="Kelantan">Kelantan</option>
                        <option value="Kuala Lumpur">Kuala Lumpur</option>
                        <option value="Labuan">Labuan</option>
                        <option value="Melaka">Melaka</option>
                        <option value="Negeri Sembilan">Negeri Sembilan</option>
                        <option value="Pahang">Pahang</option>
                        <option value="Penang">Penang</option>
                        <option value="Perak">Perak</option>
                        <option value="Perlis">Perlis</option>
                        <option value="Putrajaya">Putrajaya</option>
                        <option value="Sabah">Sabah</option>
                        <option value="Sarawak">Sarawak</option>
                        <option value="Selangor">Selangor</option>
                        <option value="Terengganu">Terengganu</option>
                    </select><br>
                </div>
                <div class="first-column">
                    <label for="city">City / Province / etc. </label>
                    <textarea name="city" required></textarea><br>
                </div>
            </div>
                <button type="button" class="removeMetadata">Remove</button>
                <hr>
            `;
            metadataContainer.appendChild(metadataForm);

            // Remove threat actor details
           metadataForm.querySelector(".removeMetadata").addEventListener("click", () => {
                metadataContainer.removeChild(metadataForm);
            });
        });


//Add Victims
const victimsContainer = document.getElementById("victimsContainer");
const addVictimsButton = document.getElementById("addVictims");

        // Add victims Form
        addVictimsButton.addEventListener("click", () => {
            const victimsForm = document.createElement("div");
            victimsForm.classList.add("victims-entry");
            victimsForm.innerHTML = `
            <div class="report-row">
                <div class="third-column">
                    <label for="name">Victim Name</label>
                    <input type="text" name="name" required>
                </div>
                <div class="third-column">
                    <label for="date">Date Reported:</label>
                    <input type="date" name="date" required>
                </div>
                <div class="third-column">
                   <label for="sector">Sector:</label>
                   <select name="sector" required>
                       <option value="">Select Sector</option>
                       <option value="Finance">Finance</option>
                       <option value="Healthcare">Healthcare</option>
                       <option value="Technology">Technology</option>
                       <option value="Energy">Energy</option>
                       <option value="Government">Government</option>
                       <option value="Education">Education</option>
                       <option value="Retail">Retail</option>
                       <option value="Telecommunications">Telecommunications</option>
                       <option value="Manufacturing">Manufacturing</option>
                       <option value="Transportation">Transportation</option>
                       <option value="Defense">Defense</option>
                       <option value="Hospitality">Hospitality</option>
                       <option value="Legal">Legal</option>
                       <option value="Media and Entertainment">Media and Entertainment</option>
                       <option value="Utilities">Utilities</option>
                       <option value="Agriculture">Agriculture</option>
                       <option value="Insurance">Insurance</option>
                       <option value="Real Estate">Real Estate</option>
                       <option value="E-commerce">E-commerce</option>
                       <option value="Non-Profit">Non-Profit</option>
                       <option value="Critical Infrastructure">Critical Infrastructure</option>
                   </select><br>
                </div>
            </div>
            <div class="report-row">
                <div class="second-column"         
                    <label for="location">Location:</label>
                    <select name="location" required>
                        <option value="">Select Location</option>
                        <option value="Johor">Johor</option>
                        <option value="Kedah">Kedah</option>
                        <option value="Kelantan">Kelantan</option>
                        <option value="Kuala Lumpur">Kuala Lumpur</option>
                        <option value="Labuan">Labuan</option>
                        <option value="Melaka">Melaka</option>
                        <option value="Negeri Sembilan">Negeri Sembilan</option>
                        <option value="Pahang">Pahang</option>
                        <option value="Penang">Penang</option>
                        <option value="Perak">Perak</option>
                        <option value="Perlis">Perlis</option>
                        <option value="Putrajaya">Putrajaya</option>
                        <option value="Sabah">Sabah</option>
                        <option value="Sarawak">Sarawak</option>
                        <option value="Selangor">Selangor</option>
                        <option value="Terengganu">Terengganu</option>
                    </select><br>
                </div>
                <div class="first-column">
                    <label for="city">City / Province / etc. </label>
                    <textarea name="city" required></textarea><br>
                </div>
            </div>
                <button type="button" class="removeVictims">Remove</button>
                <hr>
            `;
            victimsContainer.appendChild(victimsForm);

            // Remove victims Entry
           victimsForm.querySelector(".removeVictims").addEventListener("click", () => {
                victimsContainer.removeChild(victimsForm);
            });
        });

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