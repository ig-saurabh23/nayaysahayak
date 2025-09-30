// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const chatAssistantBtn = document.getElementById('chatAssistantBtn');
const tryAssistantBtn = document.getElementById('tryAssistantBtn');
const findLawyerBtn = document.getElementById('findLawyerBtn');
const chatModal = document.getElementById('chatModal');
const closeModal = document.querySelector('.close-modal');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const suggestionBtns = document.querySelectorAll('.suggestion-btn');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Chat Assistant Button - Open Modal
chatAssistantBtn.addEventListener('click', () => {
    chatModal.style.display = 'flex';
});

tryAssistantBtn.addEventListener('click', () => {
    document.querySelector('.chat-demo').scrollIntoView({ behavior: 'smooth' });
});

// Find Lawyer Button - Scroll to lawyer section
findLawyerBtn.addEventListener('click', () => {
    document.querySelector('.lawyer-matching').scrollIntoView({ behavior: 'smooth' });
});

// Close Modal
closeModal.addEventListener('click', () => {
    chatModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === chatModal) {
        chatModal.style.display = 'none';
    }
});

// Chat functionality
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = `<p>${text}</p>`;
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message function
function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        
        // Simulate AI response after a delay
        setTimeout(() => {
            let response = '';
            
            if (message.includes('illegal construction') || message.includes('parking block')) {
                response = `Thank you for explaining. This sounds like a <strong>Property and Nuisance Dispute</strong>. Let me break this down for you.<br><br>
                
                <strong>📜 Relevant Laws:</strong><br>
                • This likely falls under the <strong>Civil Procedure Code</strong> for causing a "nuisance."<br>
                • Your local municipal corporation's bylaws (like the NDMC Act in Delhi) also prohibit illegal constructions that obstruct public or private spaces.<br><br>
                
                <strong>⚖️ Your Legal Position: Moderately Strong.</strong><br>
                You have a good case, especially if you have proof (photos, documents) that the parking space is part of your property's designated area.<br><br>
                
                <strong>💡 Recommended Actions:</strong><br>
                1. <strong>Collect Evidence:</strong> Take clear photos and videos of the illegal construction and the blocked parking.<br>
                2. <strong>Send a Legal Notice:</strong> This is the first formal step. A legal notice to the shop owner and a copy to the municipal corporation can often resolve the issue without going to court.<br>
                3. <strong>File a Civil Suit:</strong> If the notice is ignored, you can file a suit for injunction in the civil court to stop the construction and remove the nuisance.<br><br>
                
                <strong>⏱️ & 💰 Estimated Scope:</strong><br>
                • <strong>Time:</strong> Resolving such matters can take between <strong>3 to 18 months</strong> if it goes to court.<br>
                • <strong>Cost Range (Approx.):</strong> Sending a legal notice may cost <strong>₹2,000 - ₹5,000</strong>. A full civil suit can range from <strong>₹50,000 to ₹2,00,000+</strong> in legal fees.<br><br>
                
                <strong>What would you like to do next?</strong>`;
            } else if (message.includes('rent') || message.includes('landlord')) {
                response = `I understand you're facing an issue with your landlord regarding rent. This appears to be a <strong>Tenancy and Rent Control matter</strong>.<br><br>
                
                <strong>📜 Relevant Laws:</strong><br>
                • This falls under the <strong>Rent Control Act</strong> specific to your state.<br>
                • The <strong>Transfer of Property Act, 1882</strong> also governs landlord-tenant relationships.<br><br>
                
                <strong>⚖️ Your Legal Position: Needs Review.</strong><br>
                Your rights depend on the terms of your rental agreement and the specific notice you've received. I'd need more details to assess properly.<br><br>
                
                <strong>💡 Recommended Actions:</strong><br>
                1. <strong>Review Your Rental Agreement:</strong> Check the terms regarding rent increases and notice periods.<br>
                2. <strong>Understand Local Laws:</strong> Rent control laws vary by state and often limit how much and how frequently rent can be increased.<br>
                3. <strong>Negotiate with Your Landlord:</strong> Try to discuss the matter amicably first.<br>
                4. <strong>Seek Legal Help:</strong> If negotiation fails, consult with a lawyer specializing in tenancy laws.<br><br>
                
                Would you like me to connect you with a tenancy law expert?`;
            } else {
                response = `Thank you for sharing your legal concern. I understand you're seeking guidance on this matter.<br><br>
                
                To provide you with the most accurate information, I would need a few more details:<br>
                • What specific outcome are you hoping to achieve?<br>
                • Have you taken any steps so far?<br>
                • Do you have any relevant documents or evidence?<br><br>
                
                Alternatively, I can connect you directly with a lawyer who specializes in matters like yours for a more detailed consultation.`;
            }
            
            addMessage(response);
        }, 1000);
    }
}

// Send message on button click
sendMessageBtn.addEventListener('click', sendMessage);

// Send message on Enter key
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Suggestion buttons
suggestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        chatInput.value = btn.getAttribute('data-text');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some initial demo messages to show how the chat works
window.addEventListener('DOMContentLoaded', () => {
    // Add a welcome message after a short delay
    setTimeout(() => {
        if (chatMessages.children.length === 1) { // Only if no other messages added
            addMessage("Try clicking one of the suggestion buttons above or type your own legal question to see how I can help!");
        }
    }, 2000);
});