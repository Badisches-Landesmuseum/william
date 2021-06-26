const sendBtn = document.getElementById('send');
const urlInput = document.getElementById('url');
const responseDiv = document.getElementById('response');
const promptInput = document.getElementById('prompt');

let chatHistory = [];

sendBtn.addEventListener('click', () => {
    handleSend();
});

function handleSend() {
    sendBtn.disabled = true;
    chatHistory.push(promptInput.value);
    json_history = JSON.stringify(chatHistory.slice(-5));
    console.log(json_history);

    fetch(urlInput.value, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: json_history,
    }).then(response => {
        if (response.ok) {
            return response.text();
        } else {
            urlInput.focus();
            chatHistory = chatHistory.slice(0, -1);
            sendBtn.disabled = false;
            throw new Error('Error connecting to endpoint', response);
        }
    })
    .then(text => handleResponse(text))
    .catch(e => console.log(e));
}

function handleResponse(response) {
    sendBtn.disabled = false;
    console.log('received response', response);
    chatHistory.push(response);
    responseDiv.innerHTML = response;
}