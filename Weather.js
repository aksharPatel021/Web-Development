window.onload = init;

function init() {
    document.getElementById('getWeather').addEventListener('click', loadWeather);
}

function loadWeather() {
    navigator.geolocation.getCurrentPosition(success, function() {
        alert('Error loading location');
    });
}

function success(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getWeather(lat, lon);
}

function getWeather(lat, lon) {
    let url = "http://courses.acs.uwinnipeg.ca/2909-051/weather.php?callback=processWeather&lat="+lat+"&lon="+lon;

    let script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
}

function processWeather(weatherData) {
    let conditions = weatherData.weather[0];
    let temp = weatherData.main.temp;

    let content = document.getElementById('content');
    content.innerHTML = "";
    content.classList.add('panel');
    content.classList.add('panel-default');
    content.appendChild(tempGenerator(temp));
    content.appendChild(panelItem(conditions.main));
    content.appendChild(panelItem("It is currently "+temp+" Degrees"));

}

function panelItem(content) {
    let panelEl = document.createElement('div');
    panelEl.classList.add('panel-body');
    panelEl.appendChild(document.createTextNode(content));
    return panelEl;
}

function tempGenerator(temp) {
    let content = "It's freezing out here!";
    if (temp > 0 && temp < 20) {
        content = "Sweater Weather"
    } else if (temp > 20) {
        content = "Ahh, Summer is here";
    }
    let el = document.createElement('div');
    el.classList.add('panel-body');
    el.appendChild(document.createTextNode(content));
    return el;
}