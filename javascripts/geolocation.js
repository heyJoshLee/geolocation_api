var map = {
  width: 600,
  height: 420,
  buildURL: function() {
    var base = "http://maps.googleapis.com/maps/api/staticmap?zoom=13&size=",
        coords = this.position.coords.latitude + "," + this.position.coords.longitude;
    base += this.width + "x" + this.height + "&center=" + coords;
    return base + "&markers=" + coords;
  },

  buildImage: function() {
    var $img = $("<img />", {
      width: this.width,
      height: this.height,
      src: this.buildURL()
    });
    $("#map").html($img);
  },

  latLng: function() {
    return "?lat=" + this.position.coords.latitude + "&lon=" + this.position.coords.longitude;
  },

  build: function(position) {
    this.position = position;
    this.buildImage();
    weather.get();
  }
}

var weather = {
  endpoint: "http://api.openweathermap.org/data/2.5/weather",
  template: Handlebars.compile($("#weather_card").html()),
  $el: $("#weather"),
  url: function() {
    return this.endpoint + map.latLng() +  "&APPID=145fff06e6712ab3f6d1e173a05bec18";
  },

  get: function() {
    var dfd = $.ajax({
      url: this.url(),
      dataType :"json"
    });

    dfd.done(function(json) {
      console.log(json);
    });
    dfd.done(this.render.bind(this));
  },

  temp: function(kelvin) {
    return kelvinToF(kelvin).toFixed(1) + "&deg F";
  },

  processData: function(json) {
    return {
      temp: this.temp(json.main.temp),
      icon: json.cod,
      location: json.name,
      description: json.weather[0].description
    }
  },

  render: function(json) {
    this.$el.html(this.template(this.processData(json))).addClass("slide");
  }
}

function kelvinToF(temp) {
  return 9 / 5 * (temp - 273.15) + 32;
}

navigator.geolocation.getCurrentPosition(map.build.bind(map));
