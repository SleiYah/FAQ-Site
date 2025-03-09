document.addEventListener('DOMContentLoaded', function() {
    console.log("Login page loaded");
    
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const loginData = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };
            
            try {
                const attemptLogin = async () => {
                    const response = await axios.post(BASE_API + 'login.php', loginData);
                    return response;
                };
                
                const response = await attemptLogin();
                
                if (response.data.status) {
                    showMessage(response.data.message, 'success');
                    
                    localStorage.setItem('userId', response.data.user.user_id);
                    localStorage.setItem('userName', response.data.user.first_name + ' ' + response.data.user.last_name);
                    localStorage.setItem('userEmail', response.data.user.email);
                    localStorage.setItem('isLoggedIn', 'true');
                    
                    const redirectAfterDelay = async () => {
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        window.location.href = 'home.html';
                    };
                    
                    redirectAfterDelay();
                } else {
                    showMessage(response.data.message, 'error');
                }
            } catch (error) {
                console.error('Error during login:', error);
                showMessage('An error occurred during login. Please try again.', 'error');
            }
        });
    } else {
        console.error("Login form not found");
    }
});