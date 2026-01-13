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
