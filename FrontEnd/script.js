const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// Append message to chatbox
function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = message;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
}

// Send message to the backend
async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    appendMessage('user', userMessage);
    userInput.value = '';

    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });
        const data = await response.json();

        if (data.response) {
            appendMessage('bot', data.response);
        } else {
            appendMessage('bot', 'Sorry, something went wrong.');
        }
    } catch (error) {
        appendMessage('bot', 'Error communicating with the server.');
    }
}

// Event listener for send button
sendButton.addEventListener('click', sendMessage);

// Event listener for Enter key
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
