// Authentication System

// Check if user is already logged in
function checkAuth() {
    const user = localStorage.getItem('keepid_user');
    if (user && window.location.pathname.includes('dashboard')) {
        return true;
    } else if (user && (window.location.pathname.includes('login') || window.location.pathname.includes('signup'))) {
        window.location.href = 'dashboard.html';
        return true;
    } else if (!user && (window.location.pathname.includes('dashboard') || window.location.pathname.includes('my-ids') || window.location.pathname.includes('track-application'))) {
        window.location.href = 'login.html';
        return false;
    }
    return false;
}

// Login Form Handler
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const alertContainer = document.getElementById('alert-container');
        
        // Clear previous alerts
        alertContainer.innerHTML = '';
        
        // Basic validation
        if (!email || !password) {
            showAlert('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate authentication (In production, this would be an API call)
        const users = JSON.parse(localStorage.getItem('keepid_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Store user session
            localStorage.setItem('keepid_user', JSON.stringify({
                name: user.name,
                email: user.email,
                id: user.id
            }));
            
            showAlert('Login successful! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            showAlert('Invalid email or password', 'error');
        }
    });
}

// Signup Form Handler
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const alertContainer = document.getElementById('alert-container');
        
        // Clear previous alerts
        alertContainer.innerHTML = '';
        
        // Validation
        if (!name || !email || !phone || !password || !confirmPassword) {
            showAlert('Please fill in all fields', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showAlert('Passwords do not match', 'error');
            return;
        }
        
        if (password.length < 6) {
            showAlert('Password must be at least 6 characters long', 'error');
            return;
        }
        
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('keepid_users') || '[]');
        const existingUser = users.find(u => u.email === email);
        
        if (existingUser) {
            showAlert('An account with this email already exists', 'error');
            return;
        }
        
        // Create new user
        const newUser = {
            id: 'user_' + Date.now(),
            name,
            email,
            phone,
            password,
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('keepid_users', JSON.stringify(users));
        
        // Auto login
        localStorage.setItem('keepid_user', JSON.stringify({
            name: newUser.name,
            email: newUser.email,
            id: newUser.id
        }));
        
        showAlert('Account created successfully! Redirecting...', 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    });
}

// Show Alert Function
function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
    
    alertContainer.innerHTML = `
        <div class="alert ${alertClass}">
            ${message}
        </div>
    `;
}

// Initialize auth check
checkAuth();