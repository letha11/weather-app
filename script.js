// const axios = require('axios');

let app = new Vue({
  el: "#app",
  data() {
    return {
      // Country
      firstCountryName: "",
      lastCountryName: "",
      firstCountries: [],
      lastCountries: [],
      countryInput: "",
      // Coord Country
      countryLon: "",
      countryLat: "",
      // Weather
      weather: [],
      weatherDesc: [],
      temperature: [],
      windSpeed: '',
      icons: [],
      // Dates
      daily: [],
      date: [],
      days: [],
      month: "",
    }
  },
  methods: {
    changeCountry(e) {
      e.preventDefault();
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${this.countryInput}&units=metric&appid=340a581695f3e0204553d553ce2f145b`
        )
        .then((res) => {
          this.firstCountries = res.data;
          this.firstCountryName = this.firstCountries.name;
          this.countryLon = this.firstCountries.coord.lon;
          this.countryLat = this.firstCountries.coord.lat;
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${this.countryLat}&lon=${this.countryLon}&exclude=hourly,minutely&units=metric&appid=340a581695f3e0204553d553ce2f145b`
            )
            .then((res) => {
              this.lastCountries = res.data;
              this.daily = this.lastCountries.daily;
              // Calculating wind speed from m/s to km/h
              let kmH = parseInt(this.daily[0].wind_speed);
              this.windSpeed = kmH * (1/1000) * 60 * 60;
              this.windSpeed = this.windSpeed.toFixed(2);

              // UNIX Converter to human date
              // Getting forecast day
              let dayArr = [];
              let dateArr = [];
              let weatherArr = [];
              let weatherDescArr = [];
              let iconArr = [];
              let temperatureArr = [];
              let monthResult = "";
              let weeks = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ];
              let months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ];
              this.daily.forEach(function (e) {
                // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                let a = new Date(e.dt * 1000);
                let date = a.getDate();
                let month = months[a.getMonth()];
                let day = weeks[a.getDay()];
                monthResult = month;
                dateArr.push(date);
                dayArr.push(day);
                // Weather Thingy
                weatherArr.push(e.weather[0].main);
                weatherDescArr.push(e.weather[0].description);
                iconArr.push(e.weather[0].icon);
                temperatureArr.push(parseInt(e.temp.day));
              });
              this.month = monthResult;
              this.days = dayArr;
              this.date = dateArr;
              this.weather = weatherArr;
              this.weatherDesc = weatherDescArr;
              this.icons = iconArr;
              this.temperature = temperatureArr;
              
              this.countryInput = '';
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    // Default Country and Weather
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=340a581695f3e0204553d553ce2f145b"
      )
      .then((res) => {
        this.firstCountries = res.data;
        this.firstCountryName = this.firstCountries.name;
        this.countryLon = this.firstCountries.coord.lon;
        this.countryLat = this.firstCountries.coord.lat;


        axios
          .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${this.countryLat}&lon=${this.countryLon}&exclude=hourly,minutely&units=metric&appid=340a581695f3e0204553d553ce2f145b`
          )
          .then((res) => {
            // Default Value from London
            this.lastCountries = res.data;
            this.daily = this.lastCountries.daily;

            // Calculating wind speed from m/s to km/h
            let kmH = parseInt(this.daily[0].wind_speed);
            this.windSpeed = kmH * (1/1000) * 60 * 60;
            this.windSpeed = this.windSpeed.toFixed(2);

            // UNIX Converter to human date
            // Getting forecast day
            let dayArr = [];
            let dateArr = [];
            let weatherArr = [];
            let weatherDescArr = [];
            let iconArr = [];
            let temperatureArr = [];
            let monthResult = "";
            let weeks = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];
            let months = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];
            this.daily.forEach(function (e) {
              // multiplied by 1000 so that the argument is in milliseconds, not seconds.
              let a = new Date(e.dt * 1000);
              let date = a.getDate();
              let month = months[a.getMonth()];
              let day = weeks[a.getDay()];
              monthResult = month;
              dateArr.push(date);
              dayArr.push(day);
              // Weather Thingy
              weatherArr.push(e.weather[0].main);
              weatherDescArr.push(e.weather[0].description);
              iconArr.push(e.weather[0].icon);
              temperatureArr.push(parseInt(e.temp.day));
            });
            this.month = monthResult;
            this.days = dayArr;
            this.date = dateArr;
            this.weather = weatherArr;
            this.weatherDesc = weatherDescArr;
            this.icons = iconArr;
            this.temperature = temperatureArr;
           
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
  computed: {
    otherDay(){
      return this.days.filter((item, i) => i > 0);
    },
    otherTemperature(){
      return this.temperature.filter((item, i) => i > 0)
    },
    otherIcons(){
      return this.icons.filter((item, i) => i > 0);
    },
    otherWeatherDesc(){
      return this.weatherDesc.filter((item, i) => i > 0);
    }
  },
})