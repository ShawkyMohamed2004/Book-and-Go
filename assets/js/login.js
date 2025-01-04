document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        const rememberMe = loginForm.querySelector('#rememberMe').checked;
        
        // Add your login logic here
        console.log('Login attempt:', { email, password, rememberMe });
    });
    
    // Social login handlers
    document.querySelector('.social-login .btn:first-child').addEventListener('click', function() {
        // Google login logic
        console.log('Google login clicked');
    });
    
    document.querySelector('.social-login .btn:last-child').addEventListener('click', function() {
        // Facebook login logic
        console.log('Facebook login clicked');
    });
}); 