let FLAGdragInProcess = false

function openNav() {
    document.getElementById("mySidenav").style.width = "400px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

async function onClick_trashcan(elem){
  let _id = elem.parentNode.id

  let data = {
    state: 'DISPATCHER_DELETED_RIDE_REQUEST',
    _id: _id
  }

  let list = document.getElementById("listRideRequests");
  list.removeChild(document.getElementById(_id))

  postData('update/rideRequest', data)
}

function rideRequest_updateListService() {
  if(FLAGdragInProcess) return
  else
  {
    fetch("/dispatcherDashboard/rideRequests")
    .then(function (response) {
      return response.json();
    })
    .then(function (responseJson) {
      let rideRequests = responseJson.rideRequests

      var list = document.getElementById("listRideRequests");
      var child = list.lastElementChild;
      while (child) { 
        list.removeChild(child); 
          child = list.lastElementChild;
      } 
      
      rideRequests.forEach(function(rideRequest)
      {
        if(rideRequest.state != "INIT") return
        var divRideRequest = document.createElement("div");
        
        var trashcan = document.createElement("img");
        trashcan.setAttribute('src', 'https://iamalminko.github.io/assets/img/trashcan.svg');
        trashcan.setAttribute('class', 'trashcan');
        trashcan.setAttribute('id', rideRequest._id);
        trashcan.setAttribute('height', '20');
        trashcan.setAttribute('width', '20');
        trashcan.setAttribute("onclick","onClick_trashcan(this);");
        divRideRequest.appendChild(trashcan);

        divRideRequest.appendChild(document.createTextNode(rideRequest.address));
        divRideRequest.setAttribute("id", rideRequest._id);
        divRideRequest.setAttribute("href", "#");
        divRideRequest.setAttribute("draggable", "true");
        divRideRequest.setAttribute("class", "btn-rideRequest");
        
        list.appendChild(divRideRequest);
      });
      
      dragNdrop()
    })
    .catch(function (error) {
      console.log("Error: " + error);
    })
  }    
}
/* Set up rideRequests list in right side panel to be updated by this background service */
setInterval(rideRequest_updateListService, 2500) // milliseconds
