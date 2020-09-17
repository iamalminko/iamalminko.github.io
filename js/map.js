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

/* Demo function */
async function simulateDriverMovement(){
    /* Just copy the function above when you finish. */
    /* Get requests: all taxies from database. */
    let drivers = []
    await fetch("/dispatcherDashboard/drivers")
    .then(function (response) {
    return response.json();
    })
    .then(async function (responseJson) {
        drivers = responseJson
        drivers.forEach(driver => {
        /* POST Request: */
        var params = {
            timestamp: 123123141,
            _id: driver._id,
            gpsLAT: getGpsLATShifted(driver.orientation, driver.gpsLAT),
            gpsLNG: getGpsLNGShifted(driver.orientation, driver.gpsLNG)
        }
        postData('/update/driverGPS', params)
            
        })
    })
    .catch(function (error) {
        console.log("Error: " + error);
    })
}

/* Demo Function*/
function getGpsLATShifted(orientation, lat){
    let shift = Math.random()*0.00002
    let points = {
        up: 43.863462,
        down: 43.840947,
    }

    if(orientation > 180 && orientation <= 360)
    {
        if(lat > points.up)
        {
            shift *= -1
        }
    }
    else
    {
        if(lat < points.down)
        {
            shift *= -1
        }
    }

    return (lat+shift)
}
/* Demo Function*/
function getGpsLNGShifted(orientation, lng){
    let shift = Math.random()*0.0002
    let points = {
        left: 18.324956,
        right: 18.445873,
    }

    if(orientation > -90 && orientation <= 90)
    {
        if(lng > points.right)
        {
            shift *= -1
        }
    }
    else
    {
        if(lng < points.left)
        {
            shift *= -1
        }
    }

    return (lng+shift)
}

/* POST Request */
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
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

    /* Demo function that simulates movement of taxies. */
    setInterval(simulateDriverMovement, 2500) // milliseconds
});
