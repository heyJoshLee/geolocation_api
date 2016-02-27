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
    $(document.body).html($img);
  },

  build: function(position) {
    this.position = position;
    this.buildImage();
  }
}

navigator.geolocation.getCurrentPosition(map.build.bind(map));
