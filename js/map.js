function getAllDrivers() {
    
}

async function updateTaxiesPositions(){
    /* Get requests: all taxies from database. */
    let features = []
    await fetch("/dispatcherDashboard/drivers")
    .then(function (response) {
      return response.json();
    })
    .then(function (responseJson) {
      let drivers = responseJson.drivers
      drivers.forEach(driver => {
        let feature = {
            'type': 'Feature',
            'properties': {
                'description': driver.email,
                'iconSize': [60, 60]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [driver.gpsLNG, driver.gpsLAT]
            }
        }
        features.push(feature)
    });
    })
    .catch(function (error) {
      console.log("Error: " + error);
    })    

    /* Update taxies location markers. */
    features.forEach(function (marker) {
        // create a DOM element for the marker
        var el = document.createElement('div');
        el.className = 'taxi_marker';
        el.style.backgroundImage =
        'url(https://iamalminko.github.io/assets/img/car.png';
        el.style.width = '55px';
        el.style.height = '25px';
        el.style.borderRadius = '20px';
        el.style.backgroundSize = 'cover';
         
        el.addEventListener('click', function () {
            window.alert(marker.properties.description);
        });
         
        // add marker to map
        new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
        });
}

function updateRideRequestsPositions(){
    /* Just copy the function above when you finish. */

}


/* Initialize map with access token. */
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxtaW5rbyIsImEiOiJjang3ZDNjNXIwOGY3M3ZwbjcyM2EzbnRoIn0.myeMHkv94NNZ2FDwrC5A9w';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/alminko/cjx7dfex70puf1clc3daj3ikk', // style URL
    center: [18.388310, 43.854313], // starting position [lng, lat]
    zoom: 13.3 // starting zoom
});

/* Control items on a map: Taxies and customers */
map.on('load', function() {

    /* Update taxies position on a map - background service */
    setInterval(updateTaxiesPositions, 2500) // milliseconds
    
    /* Update customers position that sent ride requests - background service */
    setInterval(updateRideRequestsPositions, 2500) // milliseconds    
     




    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', 'taxies', function(e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;
        
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        
        new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });
     
    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'taxies', function() {
        map.getCanvas().style.cursor = 'pointer';
    });
     
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'taxies', function() {
        map.getCanvas().style.cursor = '';
    });
});
