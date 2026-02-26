// Real Authentication with Backend API
function checkAuth() {
    const token = localStorage.getItem('token');
    const publicPages = ['index.html', 'login.html', 'register.html', 'forgot-password.html'];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (!token && !publicPages.includes(currentPage)) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email')?.value || event.target.querySelector('input[type="email"]').value;
    const password = document.getElementById('password')?.value || event.target.querySelector('input[type="password"]').value;
    const errorDiv = document.getElementById('error-message');
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const btnText = document.getElementById('btn-text');
    const btnLoader = document.getElementById('btn-loader');
    
    submitBtn.disabled = true;
    if (btnText && btnLoader) {
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
    } else {
        submitBtn.textContent = 'Logging in...';
    }
    
    try {
        const data = await api.login(email, password);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (window.UI) UI.toast('Login successful!', 'success');
        setTimeout(() => window.location.href = 'dashboard.html', 500);
    } catch (error) {
        if (errorDiv) {
            errorDiv.textContent = error.message || 'Login failed';
            errorDiv.style.display = 'block';
        }
        submitBtn.disabled = false;
        if (btnText && btnLoader) {
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        } else {
            submitBtn.textContent = 'Login';
        }
    }
}

async function handleRegister(event) {
    event.preventDefault();
    const form = event.target;
    const password = form.querySelector('input[type="password"]').value;
    
    // Validate password on frontend
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        const errorDiv = document.getElementById('error-message');
        errorDiv.innerHTML = `
            <strong>Password must contain:</strong><br>
            • At least 8 characters<br>
            • One uppercase letter (A-Z)<br>
            • One lowercase letter (a-z)<br>
            • One number (0-9)
        `;
        errorDiv.style.display = 'block';
        return;
    }
    
    const formData = {
        name: form.querySelector('input[name="name"]')?.value || form.querySelector('input[type="text"]').value,
        email: form.querySelector('input[type="email"]').value,
        password: password,
        city: form.querySelector('input[name="city"]')?.value || 'Not specified'
    };
    
    const errorDiv = document.getElementById('error-message');
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = document.getElementById('btn-text');
    const btnLoader = document.getElementById('btn-loader');
    
    submitBtn.disabled = true;
    if (btnText && btnLoader) {
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
    } else {
        submitBtn.textContent = 'Creating account...';
    }
    
    try {
        const data = await api.register(formData);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (window.UI) UI.toast('Account created successfully!', 'success');
        setTimeout(() => window.location.href = 'profile-setup.html', 500);
    } catch (error) {
        if (errorDiv) {
            errorDiv.textContent = error.message || 'Registration failed';
            errorDiv.style.display = 'block';
        }
        submitBtn.disabled = false;
        if (btnText && btnLoader) {
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        } else {
            submitBtn.textContent = 'Create Account';
        }
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (window.UI) UI.toast('Logged out successfully', 'info');
    setTimeout(() => window.location.href = 'login.html', 500);
}

function signInWithGoogle() {
    alert('Google Sign-In integration coming soon!');
}

if (typeof window !== 'undefined') {
    checkAuth();
    
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}
