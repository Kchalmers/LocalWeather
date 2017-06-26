function Weather() {
    this.getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getWeatherData);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    };
    this.getWeatherData = function (position) {
        $.ajax({
            dataType: "JSON",
            method: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${Math.floor(position.coords.latitude)}&lon=${Math.floor(position.coords.longitude)}&id=524901&APPID={ead0bb7ea1756dceb0d6073a367b9272}`,
            success: function (response) {
                console.log("Random pet", response);
            },
            error: function (response) {
                console.log(response);
            }
        })
    };
}

$(document).ready(function () {
   const start = new Weather();
   start.getLocation();
});