
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
        
        setTimeout(function() {
            messageContainer.style.display = 'none';
        }, 3000);
    } else {
        console.warn('Message container or text element not found in the DOM');
    }
}

function logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    
    showMessage('You have been logged out successfully', 'success');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

function logout() {
 
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
}