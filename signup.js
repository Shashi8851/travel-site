document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const agreeTerms = document.getElementById('agreeTerms');
    const passwordToggle = document.querySelector('.toggle-password');
    const strengthIndicator = document.querySelector('.strength-indicator');
    const termsModal = document.getElementById('termsModal');
    const termsLink = document.querySelector('.terms-link');
    const closeModal = document.querySelector('.close-modal');
    const acceptTermsBtn = document.querySelector('.accept-terms');

    // Form Validation Functions
    const showError = (input, message) => {
        const errorElement = input.nextElementSibling.nextElementSibling;
        errorElement.textContent = message;
        input.classList.add('invalid');
    };

    const clearError = (input) => {
        const errorElement = input.nextElementSibling.nextElementSibling;
        errorElement.textContent = '';
        input.classList.remove('invalid');
    };

    // Validation Checks
    const validateName = (input) => {
        const trimmedValue = input.value.trim();
        if (trimmedValue === '') {
            showError(input, 'This field is required');
            return false;
        }
        if (trimmedValue.length < 2) {
            showError(input, 'Name must be at least 2 characters long');
            return false;
        }
        clearError(input);
        return true;
    };

    const validateEmail = (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const trimmedValue = input.value.trim();
        if (trimmedValue === '') {
            showError(input, 'Email is required');
            return false;
        }
        if (!emailRegex.test(trimmedValue)) {
            showError(input, 'Please enter a valid email address');
            return false;
        }
        clearError(input);
        return true;
    };

    const checkPasswordStrength = (passwordValue) => {
        let strength = 0;
        const strengthClasses = ['very-weak', 'weak', 'medium', 'strong', 'very-strong'];

        // Length check
        if (passwordValue.length >= 8) strength++;
        if (passwordValue.length >= 12) strength++;

        // Complexity checks
        if (/[A-Z]/.test(passwordValue)) strength++;
        if (/[a-z]/.test(passwordValue)) strength++;
        if (/[0-9]/.test(passwordValue)) strength++;
        if (/[^A-Za-z0-9]/.test(passwordValue)) strength++;

        // Update strength indicator
        strengthIndicator.className = 'strength-indicator';
        strengthIndicator.classList.add(strengthClasses[Math.min(strength, 4)]);

        return strength;
    };

    const validatePassword = (input) => {
        const passwordValue = input.value;
        if (passwordValue === '') {
            showError(input, 'Password is required');
            return false;
        }
        if (passwordValue.length < 8) {
            showError(input, 'Password must be at least 8 characters long');
            return false;
        }
        clearError(input);
        return true;
    };

    const validateConfirmPassword = () => {
        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, 'Passwords do not match');
            return false;
        }
        clearError(confirmPassword);
        return true;
    };

    // Event Listeners for Real-time Validation
    firstName.addEventListener('input', () => validateName(firstName));
    lastName.addEventListener('input', () => validateName(lastName));
    email.addEventListener('input', () => validateEmail(email));
    
    password.addEventListener('input', (e) => {
        validatePassword(password);
        checkPasswordStrength(e.target.value);
    });
    
    confirmPassword.addEventListener('input', validateConfirmPassword);

    // Password Toggle Visibility
    passwordToggle.addEventListener('click', () => {
        const type = password.type === 'password' ? 'text' : 'password';
        password.type = type;
        passwordToggle.textContent = type === 'password' ? '👁️' : '🙈';
    });

    // Terms Modal Interactions
    termsLink.addEventListener('click', (e) => {
        e.preventDefault();
        termsModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        termsModal.style.display = 'none';
    });

    acceptTermsBtn.addEventListener('click', () => {
        agreeTerms.checked = true;
        termsModal.style.display = 'none';
    });

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        const isFirstNameValid = validateName(firstName);
        const isLastNameValid = validateName(lastName);
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        const isConfirmPasswordValid = validateConfirmPassword();
        const areTermsAgreed = agreeTerms.checked;

        // Check Terms Agreement
        if (!areTermsAgreed) {
            showError(agreeTerms.nextElementSibling, 'You must agree to the terms');
            return;
        }

        // Final Validation
        if (
            isFirstNameValid && 
            isLastNameValid && 
            isEmailValid && 
            isPasswordValid && 
            isConfirmPasswordValid && 
            areTermsAgreed
        ) {
            // Simulate form submission
            const submitButton = form.querySelector('.signup-button');
            submitButton.classList.add('loading');
            
            // Simulated async operation
            setTimeout(() => {
                submitButton.classList.remove('loading');
                alert('Sign Up Successful!');
                form.reset();
                // In a real app, you'd send data to server here
            }, 2000);
        }
    });
});