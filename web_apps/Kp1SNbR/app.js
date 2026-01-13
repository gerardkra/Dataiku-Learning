// Initialize the map
var map = L.map('map').setView([47, 3], 5);

// Load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; Arcgis contributors'
}).addTo(map);


dataiku.fetch('rental_agencies_geocode', {
    sampling : "head",
    limit : 20000
}, function (df) {

    var nbRows = df.getNbRows();
    for (var i = 0; i < nbRows; i++) {
        var record = df.getRecord(i);

        var lat = parseFloat(record["geolatitude"]);
        var lon = parseFloat(record["geolongitude"]);
        var name = record["agency_name"];
        var city = record["city"];
        if (isNaN(lat) || isNaN(lon)) continue;

        var radius = 15000;

        var marker = new L.circle([lat, lon], radius, {
            color: 'green',
            fillColor: 'green',
            fillOpacity: 0.2
        }).bindPopup("Name: <strong>" + name + "</strong>");

        marker.addTo(map);
    }
});


dataiku.fetch('accidents_database_prepared', {
    sampling : "random",
    limit : 10000
}, function (df) {

    var nbRows = df.getNbRows();
    for (var i = 0; i < nbRows; i++) {
        var record = df.getRecord(i);

        var lat = parseFloat(record["latitude"]);
        var lon = parseFloat(record["longitude"]);
        var collision = record["collision"];

        var radius = 1;

        var marker = new L.circle([lat, lon], radius, {
            color: 'red',
            fillColor: 'red',
            fillOpacity: 0.2
        }).bindPopup("Number of collisions: <strong>" + collision + "</strong>");

        marker.addTo(map);
    }
});


dataiku.fetch('garage_locations_prepared', {
    sampling : "random",
    limit : 200
}, function (df) {

    var nbRows = df.getNbRows();
    for (var i = 0; i < nbRows; i++) {
        var record = df.getRecord(i);

        var lat = parseFloat(record["latitude"]);
        var lon = parseFloat(record["longitude"]);
        var name = record["name"];

        var radius = 15000;

        var marker = new L.circle([lat, lon], radius, {
            color: 'blue',
            fillColor: 'blue',
            fillOpacity: 0.2
        }).bindPopup("Name: <strong>" + name + "</strong>");

        marker.addTo(map);
    }
});

