// Websocket with initial Word...
let url = "104.196.146.24/";
let person = null;
let wordsEl = null;

window.onload = () => {
    init();
}

function init() {
    wordsEl = document.getElementById('wordsSpoken');
    getPerson();
}

function getPerson() {
    let script = document.createElement('script');
    script.src = `http://${url}?callback=loadName`;
    document.body.appendChild(script);
}

function loadName(data) {
    person = data;

    writeOutName();
    startSockets();
}

function startSockets(){

    const socket = new WebSocket(`ws://${url}`);

    socket.addEventListener('open', function (event) {
        socket.send('');
    });
    
    socket.addEventListener('message', function (event) {
        let response = JSON.parse(event.data);
        
        if (response.id === person.id) {
            writeOutPhrase(response.words, response.date);
        }
    });
}

function writeOutName() {
    const personEl = document.getElementById('person');
    personEl.append(`${person.title} ${person.name}`);
}

function writeOutPhrase(phrase, date) {
    
    let li = document.createElement('li');
    li.append(`${phrase} (${date})`);
    wordsEl.appendChild(li);
}
