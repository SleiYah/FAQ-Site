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

const faqPages = {};
faqPages.base_api = "http://localhost/projects/FAQ-Site/FAQ-Server/apis/v1/";

// Improved implementation of get_data with cache-busting
faqPages.get_data = async function(url) {
    try {
        // Add cache-busting parameter
        const timestamp = new Date().getTime();
        const separator = url.includes('?') ? '&' : '?';
        const finalUrl = `${url}${separator}_=${timestamp}`;
        
        const response = await axios.get(finalUrl, {
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });
        
        return response.data;
    } catch(error) {
        console.error('GET request error:', error);
        showMessage('Error connecting to the server', 'error');
        return { status: false, message: 'Network error' };
    }
};

// Improved implementation of post_data with better error handling
faqPages.post_data = async function(url, data) {
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        return response.data;
    } catch(error) {
        console.error('POST request error:', error);
        showMessage('Error connecting to the server', 'error');
        return { status: false, message: 'Network error' };
    }
};

faqPages.loadFor = function(page_name) {
    eval("faqPages.load_" + page_name + "();");
};

// Login page functionality
faqPages.load_index = async function() {
    console.log("login page loaded");
    
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const loginData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };
        
        try {
            const response = await faqPages.post_data(faqPages.base_api + 'login.php', loginData);
            
            if (response.status) {
                showMessage(response.message, 'success');
                
                localStorage.setItem('userId', response.user.user_id);
                localStorage.setItem('userName', response.user.first_name + ' ' + response.user.last_name);
                localStorage.setItem('userEmail', response.user.email);
                localStorage.setItem('isLoggedIn', 'true');
                
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1500);
            } else {
                showMessage(response.message, 'error');
            }
        } catch (error) {
            console.error('Error during login:', error);
            showMessage('An error occurred during login. Please try again.', 'error');
        }
    });
};

// Home page with FAQ list
faqPages.load_home = function() {
    console.log("home page loaded");
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    
    // Set up user name and logout button
    const userNameElement = document.getElementById('user-name');
    const userName = localStorage.getItem('userName');
    if (userNameElement && userName) {
        userNameElement.textContent = `Welcome, ${userName}`;
    }
    
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', faqPages.logout);
    }
    
    // Set up FAQ list
    const faqListContainer = document.querySelector('.faq-list');
    
    faqListContainer.innerHTML = '';
    faqListContainer.innerHTML = '<div class="loading">Loading FAQs...</div>';
    
    fetchFAQs();
    
    // Set up search functionality
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            searchFAQs(searchInput.value);
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                searchFAQs(searchInput.value);
            }
        });
    }
    
    // Function to fetch FAQs with force refresh
    async function fetchFAQs() {
        try {
            // Force refresh with random parameter
            const refreshParam = Math.random().toString(36).substring(7);
            const response = await faqPages.get_data(faqPages.base_api + 'get-FAQs.php?refresh=' + refreshParam);
            
            if (response.status) {
                displayFAQs(response.data);
            } else {
                showMessage(response.message, 'info');
                faqListContainer.innerHTML = '<div class="no-faqs">No FAQs available.</div>';
            }
        } catch (error) {
            console.error('Error fetching FAQs:', error);
            showMessage('Error loading FAQs. Please try again later.', 'error');
            faqListContainer.innerHTML = '<div class="error">Failed to load FAQs.</div>';
        }
    }
    
    // Display FAQs with toggle functionality
    function displayFAQs(faqs) {
        faqListContainer.innerHTML = '';
        
        if (faqs.length === 0) {
            faqListContainer.innerHTML = '<div class="no-faqs">No FAQs available.</div>';
            return;
        }
        
        let faqsHTML = '';
        
        faqs.forEach(faq => {
            faqsHTML += `
                <div class="faq-card">
                    <div class="faq-question">
                        <span>${faq.question}</span>
                    </div>
                    <div class="faq-answer">
                        ${faq.answer}
                    </div>
                </div>
            `;
        });
        
        faqListContainer.innerHTML = faqsHTML;
        
        // Add toggle functionality
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', function() {
                this.parentElement.classList.toggle('active');
            });
        });
    }
    
    // Search FAQs functionality
    function searchFAQs(query) {
        query = query.toLowerCase().trim();
        
        const faqCards = document.querySelectorAll('.faq-card');
        
        if (query === '') {
            faqCards.forEach(card => {
                card.style.display = 'block';
            });
            return;
        }
        
        faqCards.forEach(card => {
            const question = card.querySelector('.faq-question').textContent.toLowerCase();
            const answer = card.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(query) || answer.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
};

// Add FAQ page
faqPages.load_add_faq = function() {
    console.log("add_faq page loaded");
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    
    // Set up user name and logout button
    const userNameElement = document.getElementById('user-name');
    const userName = localStorage.getItem('userName');
    if (userNameElement && userName) {
        userNameElement.textContent = `Welcome, ${userName}`;
    }
    
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', faqPages.logout);
    }
    
    // Handle form submission
    const faqForm = document.querySelector('.faq-form');
    
    faqForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const questionInput = document.getElementById('question');
        const answerInput = document.getElementById('answer');
        
        // Validate inputs
        if (!questionInput.value.trim()) {
            showMessage('Question is required', 'error');
            questionInput.focus();
            return;
        }
        
        if (!answerInput.value.trim()) {
            showMessage('Answer is required', 'error');
            answerInput.focus();
            return;
        }
        
        const faqData = {
            question: questionInput.value.trim(),
            answer: answerInput.value.trim()
        };
        
        try {
            // Use improved post_data with better error handling
            const response = await faqPages.post_data(faqPages.base_api + 'add-FAQ.php', faqData);
            
            if (response.status) {
                showMessage(response.message, 'success');
                
                // Clear the form
                questionInput.value = '';
                answerInput.value = '';
                
                // Wait longer before redirect to ensure server has fully processed
                setTimeout(() => {
                    window.location.href = 'home.html?refresh=' + Date.now();
                }, 2500);
            } else {
                showMessage(response.message, 'error');
            }
        } catch (error) {
            console.error('Error adding FAQ:', error);
            showMessage('An error occurred while adding the FAQ. Please try again.', 'error');
        }
    });
};

// Logout functionality
faqPages.logout = function() {
    // Clear user data
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    
    showMessage('You have been logged out successfully', 'success');
    
    // Redirect to login page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
};