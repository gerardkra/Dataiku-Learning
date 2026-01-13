dataiku.fetch('garage_locations_prepared', {
    sampling : "random",
    limit : 200
  }, function (df) {

    // Add a map marker for each row on the dataset
    // Each marker is a circle. The size of the circle varies with the 'size' column values
    var nbRows = df.getNbRows();
    for (var i = 0; i < nbRows; i++) {
      var record = df.getRecord(i);

      // Replace by your own column names here
      var lat = parseFloat(record["latitude"]);
      var lon = parseFloat(record["longitude"]);
      var name = record["name"];

      // Radius of the marker is in meters
      var radius = 15000;

      var marker = new L.circle([lat, lon], radius, {
          color: 'blue',
          fillColor: 'blue',
          fillOpacity: 0.2
        }).bindPopup("Name: <strong>" + name + "</strong>");

        marker.addTo(map);
      };
});