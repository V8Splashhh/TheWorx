// Account page functionality

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
});

// Check login status
function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('worxUser'));
    if (user) {
        showProfile(user);
    } else {
        showAuthForms();
    }
}

// Show login form
function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.querySelectorAll('.toggle-btn')[0].classList.add('active');
    document.querySelectorAll('.toggle-btn')[1].classList.remove('active');
}

// Show register form
function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.querySelectorAll('.toggle-btn')[0].classList.remove('active');
    document.querySelectorAll('.toggle-btn')[1].classList.add('active');
}

// Show auth forms
function showAuthForms() {
    document.getElementById('authToggle').style.display = 'flex';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('profileSection').style.display = 'none';
}

// Show profile
function showProfile(user) {
    document.getElementById('authToggle').style.display = 'none';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('profileSection').style.display = 'block';
    
    // Update profile information
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('memberSince').textContent = user.memberSince || 'January 2025';
    
    // Update settings form
    document.getElementById('settings-name').value = user.name;
    document.getElementById('settings-email').value = user.email;
    document.getElementById('settings-phone').value = user.phone || '';
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Simple validation (in real app, this would check against a backend)
    if (email && password) {
        const user = {
            name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
            email: email,
            memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };
        
        localStorage.setItem('worxUser', JSON.stringify(user));
        showProfile(user);
        showToast('✅ Successfully logged in!', 'success');
    }
}

// Handle registration
function handleRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const password = formData.get('password');
    const confirm = formData.get('confirm');
    
    if (password !== confirm) {
        showToast('❌ Passwords do not match!', 'error');
        return;
    }
    
    if (name && email && password) {
        const user = {
            name: name,
            email: email,
            phone: phone,
            memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };
        
        localStorage.setItem('worxUser', JSON.stringify(user));
        showProfile(user);
        showToast('🎉 Account created successfully!', 'success');
    }
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('worxUser');
    showAuthForms();
    showToast('👋 You have been logged out.', 'info');
}

// Show tab
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').style.display = 'block';
    
    // Add active class to clicked button
    event.target.classList.add('active');
}