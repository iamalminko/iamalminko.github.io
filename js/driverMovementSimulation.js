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

    if(orientation >= 90 && orientation < 270)
    {
        if(lat > points.up)
        {
            shift *= -1
        }
    }
    else
    {
        if(lat > points.down)
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
        right: 18.431986,
    }

    if((orientation >= 270 && orientation < 360) || (orientation >= 0 && orientation < 90))
    {
        if(lng > points.right)
        {
            shift *= -1
        }
    }
    else
    {
        if(lng > points.left)
        {
            shift *= -1
        }
    }

    return (lng+shift)
}
