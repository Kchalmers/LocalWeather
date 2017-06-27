function Weather() {
    const self = this;
    let currentTemp = 0;

    this.initialize = function () {
        $(".symbolLink").click(this.changeFormat);
    };
    this.getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getWeatherData);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    };
    this.getWeatherData = function (position) {
        // var api_key = "ead0bb7ea1756dceb0d6073a367b9272";
        $.ajax({
            dataType: "JSON",
            method: "POST",
            url: `http://api.openweathermap.org/data/2.5/weather?lat=${Math.floor(position.coords.latitude)}&lon=${Math.floor(position.coords.longitude)}&appid=${weatherApiKey}`,
            success: function (response) {
                currentTemp =  response.main.temp;
                self.tempFormat(response.main.temp);
                self.displayWeatherImg(response.weather["0"].main);
            },
            error: function (response) {
                console.log(response);
            }
        })
    };
    this.tempFormat = function (temp, symbol) {
        const tempHolder = $("temp");
        let convertedTemp = 0;
        if(symbol === "F"){
            convertedTemp = Math.floor(temp - 273.15);
            symbol = "C";
        } else {
            convertedTemp = Math.floor(temp * (9/5) - 459.67);
            symbol = "F";
        }
        tempHolder.append($(".tempNum").empty().append(`${convertedTemp} ${String.fromCharCode(176)}`));
        tempHolder.append($(".symbolLink").empty().append(symbol));
    };
    this.changeFormat = function () {
        self.tempFormat(currentTemp, document.getElementsByClassName("symbolLink")[0].innerHTML);
    };
    this.displayWeatherImg = function (weatherImg) {
        console.log(weatherImg)
    };
}

$(document).ready(function () {
   const start = new Weather();
    start.initialize();
   start.getLocation();
});