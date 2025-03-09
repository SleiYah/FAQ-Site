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
faqPages.base_api = "http://51.44.8.213//FAQ-Site/FAQ-Server/apis/v1/";

faqPages.get_data = async function(url){
    try{
        const response = await axios.get(url);
        return response.data;
    }catch(error){
        console.log(error);
    }
}

faqPages.post_data = async function(url, data){
    try{
        const response = await axios.post(url, data);
        return response.data;
    }catch(error){
        console.log(error); 
    }
}



faqPages.loadFor = function(page_name){
    eval("faqPages.load_" + page_name + "();");
}

faqPages.load_index = async function(){

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
}

faqPages.load_home = function() {
    console.log("home page loaded");
    
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    
    const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', faqPages.logout);
}
    
    const faqListContainer = document.querySelector('.faq-list');
    
    faqListContainer.innerHTML = '';
    
    faqListContainer.innerHTML = '<div class="loading">Loading FAQs...</div>';
    
    fetchFAQs();
    
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
    
    async function fetchFAQs() {
        try {
            const response = await faqPages.get_data(faqPages.base_api + 'get-FAQs.php');
            
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
    
   
    
}
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
    faqPages.load_add_faq = function() {
        console.log("add_faq page loaded");
        
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn || isLoggedIn !== 'true') {
            window.location.href = 'index.html';
            return;
        }
        const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', faqPages.logout);
}
        const faqForm = document.querySelector('.faq-form');
        
        faqForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const questionInput = document.getElementById('question');
            const answerInput = document.getElementById('answer');
            
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
                const response = await faqPages.post_data(faqPages.base_api + 'add-FAQ.php', faqData);
                
                if (response.status) {
                    showMessage(response.message, 'success');
                    
                    questionInput.value = '';
                    answerInput.value = '';
                    
                    setTimeout(() => {
                        window.location.href = 'home.html';
                    }, 2000);
                } else {
                    showMessage(response.message, 'error');
                }
            } catch (error) {
                console.error('Error adding FAQ:', error);
                showMessage('An error occurred while adding the FAQ. Please try again.', 'error');
            }
        });
    };
    faqPages.load_sign_up = function(){
        console.log("sign-up page loaded");
        
        const signupForm = document.getElementById('signupForm');
        
        signupForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const userData = {
                first_name: document.getElementById('firstName').value,
                last_name: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };
            
            try {
                const response = await faqPages.post_data(faqPages.base_api + 'sign-up.php', userData);
                
                if (response.status) {
                    showMessage(response.message, 'success');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);
                } else {
                    showMessage(response.message, 'error');
                }
            } catch (error) {
                console.error('Error during sign-up:', error);
                showMessage('An error occurred during sign-up. Please try again.', 'error');
            }
        });
    }
faqPages.logout = function() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    
    showMessage('You have been logged out successfully', 'success');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
};