function getAllDrivers() {
    
}
var currentMarkers = []

async function updateTaxiesPositions(){
    /* Get requests: all taxies from database. */
    let features = []
    await fetch("/dispatcherDashboard/drivers")
    .then(function (response) {
      return response.json();
    })
    .then(function (responseJson) {
      let drivers = responseJson
      drivers.forEach(driver => {
        /* Skip driver if: */
        if(driver.state === "INACTIVE") return
        if(driver.gpsLAT == null) return
        if(driver.gpsLNG == null) return
        let feature = {
            'type': 'Feature',
            'properties': {
                'description': driver.email,
                'state': driver.state,
                '_id': driver._id
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [driver.gpsLNG, driver.gpsLAT],
                'orientation': driver.orientation,
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
        var markerAlreadyOnTheMap = false
        /* Check if the taxi marker is already on the map. */
        currentMarkers.forEach(currentMarker => {
            if(currentMarker.getElement().id === marker.properties._id)
            {
                /* Then just update location and orientation. */
                markerAlreadyOnTheMap = true
                currentMarker.setLngLat(marker.geometry.coordinates)
                currentMarker.setRotation(marker.geometry.orientation)
            }
        })

        if(!markerAlreadyOnTheMap)
        {
            // create a div element for the marker
            var el = document.createElement('div');
            el.className = 'marker-taxi available';
            el.id = marker.properties._id;
            el.style.backgroundImage =
            'url(https://iamalminko.github.io/assets/img/car.png';
            el.style.width = '40px';
            el.style.height = '19px';
            el.style.borderRadius = '20px';
            el.style.backgroundSize = 'cover';
             
            el.addEventListener('click', function () {
                window.alert(marker.properties.description);
            });
            el.addEventListener('mouseenter', function () {
                map.getCanvas().style.cursor = 'pointer';
            });
            el.addEventListener('mouseleave', function () {
                map.getCanvas().style.cursor = '';
            });
            
            // add marker to map
            var newMarker = new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map)
            .setRotation(marker.geometry.orientation);

            currentMarkers.push(newMarker)
        }
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
    center: [18.408310, 43.854313], // starting position [lng, lat]
    zoom: 13.3 // starting zoom
});

/* Control items on a map: Taxies and customers */
map.on('load', function() {

    /* Update taxies position on a map - background service */
    setInterval(updateTaxiesPositions, 2500) // milliseconds
    
    /* Update customers position that sent ride requests - background service */
    setInterval(updateRideRequestsPositions, 2500) // milliseconds

    /* Demo function that simulates movement of taxies. */
    setInterval(simulateDriverMovement, 2500) // milliseconds
});
