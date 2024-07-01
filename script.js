// Add event listener to Zorg's image to toggle the chatbox visibility
document.getElementById('zorg').addEventListener('click', function() {
    var chatboxContainer = document.getElementById('chatbox');
    chatboxContainer.classList.toggle('open');
});

// Add an event listener to the input field for the 'keydown' event
document.getElementById('zorgInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default form submission
        getZorgResponse(); // Call the function to handle the submission
    }
});

function getZorgResponse() {
var chatHistory = document.getElementById('chat-history');
    var userInput = document.getElementById('zorgInput').value;

    displayMessage("user", userInput);
    chatHistory.scrollTop = chatHistory.scrollHeight;
    // Clear input field
        document.getElementById('zorgInput').value = '';

    fetch(`http://localhost:5000/chatbot_response?message=${userInput}`)
        .then(response => response.json())
        .then(data => {
            var zorgResponse = data.zorgResponse.replace(/\n/g, '<br>');

            displayMessage("zorg", zorgResponse);
            chatHistory.scrollTop = chatHistory.scrollHeight;
        })
        .catch(error => console.error('Error:', error));}

function displayMessage(sender, message) {
    var chatHistory = document.getElementById('chat-history');

    if (sender === "user"){
            var messageElement = document.createElement('div');
            messageElement.classList.add('message', 'user-message');
            messageElement.innerHTML = message;
            chatHistory.appendChild(messageElement);

            var messageElement = document.createElement('div');
            messageElement.classList.add('message', 'zorg-message');
            messageElement.innerHTML = "...";
            chatHistory.appendChild(messageElement);
    }
    else {
            loadingZorgMessage = document.querySelector('.zorg-message:last-child');
            loadingZorgMessage.innerHTML = message;
    }

    chatHistory.scrollTop = chatHistory.scrollHeight;
 }
