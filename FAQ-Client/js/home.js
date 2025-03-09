
document.addEventListener('DOMContentLoaded', function() {
    console.log("Home page loaded");
    
    async function fetchFAQs() {
        try {
            const response = await axios.get(BASE_API + 'get-FAQs.php');
            
            if (response.data.status) {
                displayFAQs(response.data.data);
            } else {
                showMessage(response.data.message, 'info');
                faqListContainer.innerHTML = '<div class="no-faqs">No FAQs available.</div>';
            }
        } catch (error) {
            console.error('Error fetching FAQs:', error);
            showMessage('Error loading FAQs. Please try again later.', 'error');
            faqListContainer.innerHTML = '<div class="error">Failed to load FAQs.</div>';
        }
    }

    if (!checkAuth()) {
        return; 
    }
    
    logout();
     fetchFAQs();
    const faqListContainer = document.querySelector('.faq-list');
    
    if (!faqListContainer) {
        console.error("FAQ list container not found");
        return;
    }
    
    faqListContainer.innerHTML = '<div class="loading">Loading FAQs...</div>';
   
    
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
        
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', function() {
                this.parentElement.classList.toggle('active');
            });
        });
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
});