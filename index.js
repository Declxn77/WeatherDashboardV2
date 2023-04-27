var apiKey = "cdcb6f7ee2ca6d435372b54f1427f02b";

//Displays List
var geoList = $('#currentGeoList');

var geoLat;
var geoLong;
var city;

var buttonSubmit = document.getElementById('searchButton');


var currentWeather = document.getElementById('currentWeather');
var fiveDayWeather = docuement.getElementById('fiveDayWeather');

function getCoordinatesApi(searchValue){
    
    city = searchValue;
    
    console.log(city); 
    
    var requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&" + "appid=" + apiKey;
    
    fetch(requestUrl)
    
    .then(function(response){
    return response.json();
    })
    .then(function(data){

    geoLat = data[0].lat;

    geoLong = data[0].lon;

    todayForecast.textContent = '';

    weatherForecast.textContent = '';
    getForecastApi();
    })
}
    
function getForecastApi(){
    var day;
    var humidity;
    var temp;
    var wind;
    var iconID;
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLatitude + "&lon=" + cityLongitude + "&appid=" + apiKey;
    fetch(requestUrl)

    .then(function(response){
    return response.json();
    })

    .then(function(data){
    console.log(data);
    var newdate = data.list[0].dt_txt.split(" ");
    var today = newdate[0]
    var todayDate = today;
    var todayTemp = data.list[0].main.temp;
    var todayHumidity = data.list[0].main.humidity;
    var todayWind = data.list[0].wind.speed;
    var todayIcon = data.list[0].weather[0].icon;

    var cityName = city;

   
    var resultCard1 = document.createElement('div'); 
    resultCard1.classList.add('weatherCard1');

  
    var resultBody1 = document.createElement('div'); 
    resultBody1.classList.add('card-body');

    resultCard1.append(resultBody1); 
    var todayDateEl = document.createElement('h3'); 
    
    todayDateEl.textContent = cityName + " (" + todayDate + " )";
    var todayIcon = 'https://openweathermap.org/img/wn/' + todayIcon + '.png';
    var todayImg = document.createElement("img"); 
    
    todayImg.src = todayIcon;
    var bodyContentEl1 = document.createElement('p')
    bodyContentEl1.innerHTML += '<strong>Temp:</strong>' + todayTemp + " \u212A " + '</br>';
    bodyContentEl1.innerHTML += '<strong>Wind:</strong>' + todayWind + " MPH " + '</br>';
    bodyContentEl1.innerHTML += '<strong>Humidity:</strong>' + todayHumidity + " \u0025 " + '</br>';
   
    resultBody1.append(todayDateEl, todayImg, bodyContentEl1); 
    todayForecast.append(resultCard1); 
    
    for(var i = 1; i < data.list.length; i++){
    var newdate = data.list[i].dt_txt.split(" ");
    
    var newtime = newdate[1];
    if(newtime == '00:00:00')
    {
    
    day = newdate[0];
    temp = data.list[i].main.temp;
    humidity = data.list[i].main.humidity;
    wind = data.list[i].wind.speed;
    iconID = data.list[i].weather[0].icon
    console.log(day);
    console.log(temp);
    console.log(humidity);
    console.log(wind);
    console.log(iconID)
    
   
    var resultCard = document.createElement('div'); 
    resultCard.classList.add('column','weatherCard');
    
    
    var resultBody = document.createElement('div'); 
    resultBody.classList.add('card-body');
    resultCard.append(resultBody); 
   
    var dateEl = document.createElement('h3'); 
    dateEl.textContent = day;
    
    var icon = 'https://openweathermap.org/img/wn/' + iconID + '.png';
    var img = document.createElement("img"); 
    img.src = icon;
    
    var bodyContentEl = document.createElement('p')
    bodyContentEl.innerHTML += '<strong>Temp:</strong>' + temp + " \u212A " + '</br>';
    bodyContentEl.innerHTML += '<strong>Wind:</strong>' + wind + " MPH " + '</br>';
    bodyContentEl.innerHTML += '<strong>Humidity:</strong>' + humidity + " \u0025 " + '</br>';
    resultBody.append(dateEl, img, bodyContentEl);
    weatherForecast.append(resultCard); 
    }
    }
    })
}

    submitButtonEl.addEventListener('click',function(event){
    event.preventDefault();
    

    var searchInputVal = document.getElementById('GeoLocation1').value;
  
    localStorage.setItem('cityName', searchInputVal);
    setCityValue();
    getCoordinatesApi(searchInputVal);
    });
    
    var ul = document.getElementById('currentGeoList');
    ul.onclick = function(event) {

    var target = event.target.innerHTML;
    var citySearchVal = target;
    
    getCoordinatesApi(citySearchVal);
};
    function setCityValue(){
    var cityItem = localStorage.getItem('cityName'); 
    var cityListItemEl = $('<li class="flex-row justify-space-between align-center p-2 bg-light text-dark">'); 
    cityListItemEl.text(cityItem);
    cityListEl.append(cityListItemEl); 

    }
