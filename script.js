// Function to send the user's message to ChatGPT and display the response
async function sendMessage() {
    const inputText = document.getElementById('inputText').value;
    if (inputText.trim() === '') return;

    // Make a POST request to the ChatGPT API
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY' // Remember to replace YOUR_API_KEY with your actual ChatGPT API key
        },
        body: JSON.stringify({
            prompt: inputText,
            max_tokens: 150
        })
    });

    if (response.ok) {
        const data = await response.json();
        const chatContainer = document.getElementById('chatContainer');
        const chatMessage = document.createElement('div');
        chatMessage.classList.add('message', 'user');
        chatMessage.textContent = inputText;
        chatContainer.appendChild(chatMessage);

        const botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot');
        botMessage.textContent = data.choices[0].text.trim();
        chatContainer.appendChild(botMessage);
    } else {
        console.error('Error fetching ChatGPT response');
    }
}
// Function to convert the bot's response to speech
function speakResponse() {
    const botResponse = document.getElementsByClassName('bot')[document.getElementsByClassName('bot').length - 1].textContent;
    const speech = new SpeechSynthesisUtterance(botResponse);
    speech.lang = 'en-US';
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}
