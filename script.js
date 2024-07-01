function getZorgResponse() {
    var userInput = document.getElementById('zorgInput').value;

    displayMessage("You", userInput);
    // Clear input field
    document.getElementById('zorgInput').value = '';

    fetch(`http://localhost:5000/chatbot_response?message=${userInput}`)
        .then(response => response.json())
        .then(data => {
            var zorgResponse = data.zorgResponse;

            displayMessage("Zorg", zorgResponse);
        })
        .catch(error => console.error('Error:', error));}

    function displayMessage(sender, message) {
        var chatHistory = document.getElementById('chat-history');

        var messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        messageElement.textContent = message;
        chatHistory.appendChild(messageElement);
    }
