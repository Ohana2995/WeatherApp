let weather = {
    "apiKey": "d498ce87c42c4783ac6150626231607",
    fetchWeather: function (city) {
        fetch(
            "http://api.weatherapi.com/v1/current.json?key=" + this.apiKey + "&q=" + city + ""
        ).then((response) => {
            if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
            }
            return response.json();
        })
            .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
        let name = data.location.name;
        let icon = data.current.condition.icon;
        let description = data.current.condition.text;
        let temp = data.current.temp_c;
        let humidity = data.current.humidity;
        let speed = data.current.wind_mph;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = icon;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "mph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};


document.querySelector(".search button").addEventListener("click", function () {
    weather.search()
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Denver");