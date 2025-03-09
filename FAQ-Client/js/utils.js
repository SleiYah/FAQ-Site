const BASE_API = "/FAQ-Site/FAQ-Server/apis/v1/";

function showMessage(message, type = 'info') {
    console.log(`Showing message: "${message}" with type: ${type}`);
    const messageContainer = document.getElementById('message-container');
    const messageText = document.getElementById('message-text');
    
    if (messageContainer && messageText) {
        messageContainer.classList.remove('message-info', 'message-success', 'message-error');
        messageContainer.classList.add(`message-${type}`);
        messageText.textContent = message;
        messageContainer.style.display = 'block';
        
        const hideMessageAfterDelay = async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
            messageContainer.style.display = 'none';
        };
        
        hideMessageAfterDelay();
    } else {
        console.warn('Message container or text element not found in the DOM');
    }
}

function logout() {
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }

    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    
    showMessage('You have been logged out successfully', 'success');
    
    const redirectAfterDelay = async () => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        window.location.href = 'index.html';
    };
    
    redirectAfterDelay();
}

function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

function setupLogout() {
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
}