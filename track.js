// Track Application JavaScript

// Check authentication
const user = JSON.parse(localStorage.getItem('keepid_user'));
if (!user) {
    window.location.href = 'login.html';
}

// Display user information
const userNameElement = document.getElementById('user-name');
const userEmailElement = document.getElementById('user-email');

if (userNameElement && user) {
    userNameElement.textContent = user.name;
}

if (userEmailElement && user) {
    userEmailElement.textContent = user.email;
}

// Sidebar toggle for mobile
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.querySelector('.dashboard-sidebar');

if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Logout functionality
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('keepid_user');
            window.location.href = 'login.html';
        }
    });
}

// Track form submission
const trackForm = document.getElementById('track-form');
const statusContainer = document.getElementById('status-container');

if (trackForm) {
    trackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const idType = document.getElementById('id-type').value;
        const referenceNumber = document.getElementById('reference-number').value;
        const fullName = document.getElementById('full-name').value;
        const applicationDate = document.getElementById('application-date').value;
        const phone = document.getElementById('phone').value;
        
        // Create new application
        const newApplication = {
            id: referenceNumber,
            type: idType,
            typeName: getTypeName(idType),
            status: 'processing',
            statusText: 'Processing',
            lastUpdated: new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            }),
            details: {
                fullName: fullName,
                applicationDate: applicationDate,
                phone: phone,
                estimatedCompletion: getEstimatedCompletion(applicationDate)
            }
        };
        
        // Save to localStorage
        const applications = JSON.parse(localStorage.getItem('keepid_applications') || '[]');
        
        // Check if application already exists
        const existingIndex = applications.findIndex(app => app.id === referenceNumber);
        if (existingIndex >= 0) {
            applications[existingIndex] = newApplication;
        } else {
            applications.push(newApplication);
        }
        
        localStorage.setItem('keepid_applications', JSON.stringify(applications));
        
        // Display status
        displayApplicationStatus(newApplication);
        
        // Scroll to status
        statusContainer.scrollIntoView({ behavior: 'smooth' });
    });
}

// Get type name
function getTypeName(type) {
    const types = {
        'nin': 'National Identity Number',
        'voters-card': "Voter's Card",
        'passport': 'International Passport',
        'drivers-license': "Driver's License"
    };
    return types[type] || type;
}

// Get estimated completion date (add 15 days)
function getEstimatedCompletion(applicationDate) {
    const date = new Date(applicationDate);
    date.setDate(date.getDate() + 15);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Display application status
function displayApplicationStatus(application) {
    statusContainer.classList.remove('hidden');
    
    document.getElementById('display-app-id').textContent = application.id;
    document.getElementById('display-id-type').textContent = application.typeName;
    
    const statusBadge = document.getElementById('display-status');
    statusBadge.textContent = application.statusText;
    statusBadge.className = `status-badge status-${application.status}`;
}

// Check if viewing specific application from URL
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const appId = urlParams.get('id');
    
    if (appId) {
        const applications = JSON.parse(localStorage.getItem('keepid_applications') || '[]');
        const application = applications.find(app => app.id === appId);
        
        if (application) {
            // Pre-fill form
            document.getElementById('id-type').value = application.type;
            document.getElementById('reference-number').value = application.id;
            document.getElementById('full-name').value = application.details.fullName;
            document.getElementById('application-date').value = application.details.applicationDate;
            document.getElementById('phone').value = application.details.phone || '';
            
            // Display status
            displayApplicationStatus(application);
        }
    }
});