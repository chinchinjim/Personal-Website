document.addEventListener('DOMContentLoaded', () => {
    const messagesDiv = document.getElementById('messages');
    const input = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');

    // Display a welcome message from the chatbot
    const welcomeMessage = "Hello! I'm Zorg, Chin Chin's hiring wingman. How can I assist you today?";
    messagesDiv.innerHTML += `<div class="message bot-message">${welcomeMessage}</div>`;

    sendButton.addEventListener('click', async () => {
        const message = input.value;
        if (!message) return;
        input.value = '';

        messagesDiv.innerHTML += `<div class="message user-message">${message}</div>`;
        
        // Fetch response from server
        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            messagesDiv.innerHTML += `<div class="message bot-message">${data.message}</div>`;
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
            messagesDiv.innerHTML += `<div class="message bot-message">Error: ${error.message}</div>`;
        }
    });
});
