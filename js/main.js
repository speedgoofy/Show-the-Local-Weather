$(function() {

    // Inits find users location     
    //findLocation();


    // toggle between C and F when clicking on the degrees 
    $("#deg").on("click", function() {
        if($("#deg").html() == "F") {
            $('#temp').html(fahrenheitToCelsius($('#temp').html()));
            $('#deg').html("C");
        } else {
            $('#temp').html(celsiusToFahrenheit($('#temp').html()));
            $('#deg').html("F");
        }
    });


    /**************************************
                    functions
     **************************************/

    // ---  call ipinfo service to get user location 
    function findLocation() {
        $.get("http://ipinfo.io", function(response) {
            getWeather(response);
        }, "jsonp");

    }

    
    // ---  call weather underground to get weather for the city 
    function getWeather(location) {
        var userLocation = location,
            key = "02878c9356711fb3";

        $.ajax({
            url : "http://api.wunderground.com/api/" + key + "/forecast/geolookup/conditions/q/" + userLocation.region + "/" + userLocation.city + ".json",
            dataType : "jsonp",
            success : function(parsed_json) {
                console.log(parsed_json);
                setDatatoScreen(parsed_json);
            }
        });
    }


    // ---  updates the screen with the correct weather info 
    function setDatatoScreen(data) {
        temp = Math.ceil(data.current_observation.temp_f);
        var city = data.location.city,
            state = data.location.state,
            weather = data.current_observation.weather;

        $('#temp').html(temp);
        $('#city').html(city);
        $('#weather').html(weather);
        $('#deg').html("F");
        $('#image').attr("src","https://icons.wxug.com/i/c/k/" + weather.toLowerCase() + ".gif");
    }


    // ---- converts fahrenheit To Celsius
    function fahrenheitToCelsius(temp){
        return Math.ceil((temp - 32) * 5 / 9); 
    }


    // ---- converts Celsius To fahrenheit
    function celsiusToFahrenheit(temp){
        return Math.ceil(temp * 9/5 + 32);
    }


});