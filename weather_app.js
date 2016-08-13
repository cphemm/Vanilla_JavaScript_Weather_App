var APPID = "02252e18938c64b6489ddb1e2a0b7d2a";
var currentTemp;
var currentLocation;
var icon;
var currentHumidity;
var currentWind;
var currentDirection;

function updateByZip(zip){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"zip=" + zip +
	"&APPID=" + APPID;
    sendRequest(url);
}

function updateByGeo(lat, lon){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"lat=" + lat +
	"&lon=" + lon +
	"&APPID=" + APPID;
    sendRequest(url);    
}


function sendRequest(url){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var weather = JSON.parse(xmlhttp.responseText);
	    update(weather);

	}
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();    
}

function degreesToDirection(degrees){
    if(degrees >= 348.75 && degrees < 11.25)
	return "N";
    if(degrees >= 11.25 && degrees < 33.75)
	return "NNE";
    if(degrees >= 33.75  && degrees < 56.25)
	return "NE";
    if(degrees >= 56.25  && degrees < 78.75)
	return "ENE";
    if(degrees >= 78.75  && degrees < 101.25)
	return "E";
    if(degrees >= 101.25  && degrees < 123.75)
	return "SE";
    if(degrees >= 123.75  && degrees < 146.25)
	return "SSE";
    if(degrees >= 146.25  && degrees < 168.75)
	return "S";
    if(degrees >= 191.25  && degrees < 213.75)
	return "SSW";
    if(degrees >= 213.75 && degrees < 236.25)
	return "SW";
    if(degrees >= 236.25  && degrees < 258.75)
	return "WSW";
    if(degrees >= 258.75  && degrees < 281.25)
	return "W";
    if(degrees >= 281.25  && degrees < 303.75)
	return "WNW";
    if(degrees >= 303.75  && degrees < 326.25)
	return "NW";
    if(degrees >= 326.25  && degrees < 348.75)
	return "NNW";
    
}

function kelvinToFahrenheit(k){
    return Math.round(k*(9/5)-459.67);
}

function kelvinToCelsius(k){
    return Math.round(k - 273.15);
}

function update(weather) {
    icon.src = "img/codes/" + weather.weather[0].id + ".png";
    currentHumidity.innerHTML = weather.main.humidity;
    currentWind.innerHtml = weather.wind.speed;
    currentDirection.innerHTML = degreesToDirection(weather.wind.deg);
    currentLocation.innerHTML = weather.name;
    currentTemp.innerHTML = kelvinToFahrenheit(weather.main.temp);

}


window.onload = function () {
    currentTemp = document.getElementById("currentTemperature");
    currentLocation = document.getElementById("currentLocation");
    icon = document.getElementById("icon");
    currentHumidity = document.getElementById("currentHumidity");
    currentWind = document.getElementById("currentWind");
    currentDirection = document.getElementById("currentDirection");

    icon.src = "img/codes/300.png";
    currentHumidity.innerHTML = "45";
    currentWind.innerHTML = 7;
    currentDirection.innerHTML = "SE";
    currentLocation.innerHTML = "Portland";
    currentTemp.innerHTML = "55";

    if(navigator.geolocation){
	var showPosition = function(position){
	    updateByGeo(position.coords.latitude, position.coords.longitude);

	}
	navigator.geolocation.getCurrentPosition(showPosition);
    } else {
	var zip = window.prompt("Could not discover your currentLocation. What is your zip code?");
	updateByZip(zip);
    }
    
}

