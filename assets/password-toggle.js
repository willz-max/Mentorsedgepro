document.querySelectorAll('.toggle-password').forEach((toggle) => {
    const password = toggle.parentElement.querySelector('input[type="password"], input[type="text"]');

    if (!password) {
        return;
    }

    toggle.addEventListener('click', () => {
        const isVisible = password.type === 'text';
        password.type = isVisible ? 'password' : 'text';
        toggle.classList.toggle('fa-eye', isVisible);
        toggle.classList.toggle('fa-eye-slash', !isVisible);
        toggle.setAttribute('aria-pressed', String(!isVisible));
        toggle.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
    });
});