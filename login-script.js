document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const emailInput = document.getElementById('email');
    const loginButton = document.querySelector('.login-button');

    // Password visibility toggle
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePasswordBtn.textContent = type === 'password' ? '👁️' : '👀';
    });

    // Input validation
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    // Animated input focus
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('focus', (e) => {
            e.target.parentElement.classList.add('input-focused');
        });

        input.addEventListener('blur', (e) => {
            e.target.parentElement.classList.remove('input-focused');
        });
    });

    // Form submission handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset previous states
        loginButton.classList.remove('error', 'success');
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validation
        if (!validateEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            showError('Password must be at least 6 characters long');
            return;
        }

        // Simulate login process
        performLogin(email, password);
    });

    function showError(message) {
        loginButton.classList.add('error');
        const errorToast = document.createElement('div');
        errorToast.classList.add('error-toast');
        errorToast.textContent = message;
        document.body.appendChild(errorToast);

        setTimeout(() => {
            errorToast.remove();
        }, 3000);
    }

    function performLogin(email, password) {
        // Show loading state
        loginButton.classList.add('loading');
        loginButton.disabled = true;

        // Simulated async login
        setTimeout(() => {
            // Simulate login success/failure
            const loginSuccess = Math.random() > 0.3;

            loginButton.classList.remove('loading');
            loginButton.disabled = false;

            if (loginSuccess) {
                loginButton.classList.add('success');
                setTimeout(() => {
                    // Redirect or show success message
                    window.location.href = '/dashboard';
                }, 1500);
            } else {
                showError('Invalid email or password');
            }
        }, 2000);
    }

    // Parallax effect for scenes
    const scenes = document.querySelectorAll('.scene');
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        scenes.forEach((scene, index) => {
            const speed = (index + 1) * 0.05;
            const x = (clientX * speed) / 50;
            const y = (clientY * speed) / 50;
            scene.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});