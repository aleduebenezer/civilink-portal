// Dashboard JavaScript

// Check authentication
const user = JSON.parse(localStorage.getItem('keepid_user'));
if (!user) {
    window.location.href = 'login.html';
}

// Display user information
const userNameElements = document.querySelectorAll('#user-name, #dashboard-user-name');
const userEmailElement = document.getElementById('user-email');

userNameElements.forEach(el => {
    if (el && user) {
        el.textContent = user.name;
    }
});

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

// Initialize applications data
function initializeApplicationsData() {
    if (!localStorage.getItem('keepid_applications')) {
        const defaultApplications = [
            {
                id: 'NIN-2026-001234',
                type: 'nin',
                typeName: 'National Identity Number',
                status: 'processing',
                statusText: 'Processing',
                lastUpdated: 'Feb 18, 2026',
                details: {
                    fullName: user.name,
                    applicationDate: '2026-02-10',
                    estimatedCompletion: '2026-02-28'
                }
            },
            {
                id: 'PSP-2026-005678',
                type: 'passport',
                typeName: 'International Passport',
                status: 'ready',
                statusText: 'Ready for Collection',
                lastUpdated: 'Feb 15, 2026',
                details: {
                    fullName: user.name,
                    applicationDate: '2026-01-20',
                    estimatedCompletion: '2026-02-20'
                }
            },
            {
                id: 'PVC-2026-009012',
                type: 'voters-card',
                typeName: "Voter's Card",
                status: 'approved',
                statusText: 'Approved',
                lastUpdated: 'Feb 10, 2026',
                details: {
                    fullName: user.name,
                    applicationDate: '2026-01-15',
                    estimatedCompletion: '2026-02-15'
                }
            }
        ];
        localStorage.setItem('keepid_applications', JSON.stringify(defaultApplications));
    }
}

// Load applications into table
function loadApplications() {
    const applications = JSON.parse(localStorage.getItem('keepid_applications') || '[]');
    const tableBody = document.getElementById('applications-table');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    applications.forEach(app => {
        const icon = getIconForType(app.type);
        const row = document.createElement('tr');
        row.className = 'border-b hover:bg-gray-50 cursor-pointer';
        row.innerHTML = `
            <td class="py-4 px-4">
                <div class="flex items-center">
                    <i class="${icon} text-primary-500 mr-3"></i>
                    <span class="font-medium">${app.typeName}</span>
                </div>
            </td>
            <td class="py-4 px-4 text-gray-600">${app.id}</td>
            <td class="py-4 px-4">
                <span class="status-badge status-${app.status}">${app.statusText}</span>
            </td>
            <td class="py-4 px-4 text-gray-600">${app.lastUpdated}</td>
            <td class="py-4 px-4">
                <button class="text-primary-500 hover:text-primary-400 font-medium" onclick="viewApplication('${app.id}')">View</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Get icon for ID type
function getIconForType(type) {
    const icons = {
        'nin': 'fas fa-id-card',
        'voters-card': 'fas fa-vote-yea',
        'passport': 'fas fa-passport',
        'drivers-license': 'fas fa-car'
    };
    return icons[type] || 'fas fa-file';
}

// View application details
function viewApplication(appId) {
    window.location.href = `track-application.html?id=${appId}`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeApplicationsData();
    loadApplications();
});