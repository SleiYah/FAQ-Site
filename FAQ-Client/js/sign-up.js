
document.addEventListener('DOMContentLoaded', function() {
    console.log("Sign-up page loaded");
    
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const userData = {
                first_name: document.getElementById('firstName').value,
                last_name: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };
            
            try {
                const response = await axios.post(BASE_API + 'sign-up.php', userData);
                
                if (response.data.status) {
                    showMessage(response.data.message, 'success');
                    
                    signupForm.reset();
                    
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);
                } else {
                    showMessage(response.data.message, 'error');
                }
            } catch (error) {
                console.error('Error during sign-up:', error);
                showMessage('An error occurred during sign-up. Please try again.', 'error');
            }
        });
    } else {
        console.error("Sign-up form not found");
    }
});