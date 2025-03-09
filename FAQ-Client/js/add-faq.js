
document.addEventListener('DOMContentLoaded', function() {
    console.log("Add FAQ page loaded");
    
    if (!checkAuth()) {
        return; 
    }
    

    logout();
    
    const faqForm = document.querySelector('.faq-form');
    
    if (!faqForm) {
        console.error("FAQ form not found");
        return;
    }
    
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
            const response = await axios.post(BASE_API + 'add-FAQ.php', faqData);
            
            if (response.data.status) {
                showMessage(response.data.message, 'success');
                
                questionInput.value = '';
                answerInput.value = '';
                
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 2000);
            } else {
                showMessage(response.data.message, 'error');
            }
        } catch (error) {
            console.error('Error adding FAQ:', error);
            showMessage('An error occurred while adding the FAQ. Please try again.', 'error');
        }
    });
});