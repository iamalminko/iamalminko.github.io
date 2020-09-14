function openNav() {
    document.getElementById("mySidenav").style.width = "400px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function rideRequest_updateListService() {
    fetch("/dispatcherDashboard/rideRequests")
    .then(function (response) {
      return response.json();
    })
    .then(function (responseJson) {
      let rideRequests = responseJson.rideRequests

      var ul = document.getElementById("listRideRequests");
      var child = ul.lastElementChild;
      while (child) { 
          ul.removeChild(child); 
          child = ul.lastElementChild; 
      } 
      
      rideRequests.forEach(function(rideRequest)
      {
        if(rideRequest.state != "INIT") return
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(rideRequest.address));
        li.setAttribute("id", rideRequest._id);
        li.setAttribute("href", "#");
        li.setAttribute("draggable", "true");
        li.setAttribute("class", "btn-rideRequest");
        ul.appendChild(li);
      });
      
      dragNdrop()
    })
    .catch(function (error) {
      console.log("Error: " + error);
    })
}

function dragNdrop(){
  const rideRequests = document.querySelectorAll('.btn-rideRequest');
  const taxiMarkers = document.querySelectorAll('.marker-taxi');

  // Loop through empty boxes and add listeners
  for (const btn of rideRequests) {
    btn.addEventListener('dragstart', dragStart);
    btn.addEventListener('dragend', dragEnd);
  }
  
  for (const taxi of taxiMarkers) {
    taxi.addEventListener('dragover', dragOver);
    taxi.addEventListener('dragenter', dragEnter);
    taxi.addEventListener('dragleave', dragLeave);
    taxi.addEventListener('drop', dragDrop);
  }
}

// Drag Functions

function dragStart(e) {
  this.className += ' hold';
  setTimeout(() => (this.className = 'invisible'), 0);
  e.dataTransfer.setData("text/plain", e.target.id);
}

function dragEnd() {
  //this.className = 'fill';
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  //this.className += ' hovered';
}

function dragLeave() {
  //this.className = 'empty';
}

async function dragDrop(e) {
  e.preventDefault();
  //this.className = 'empty';
  var rideRequestID = e.dataTransfer.getData("text");
  var driverID = this.id

  /* POST Request: */
  var params = {
    _id: rideRequestID,
    driverID: driverID
  }
  var data = await postData('/rideRequest/assignDriver', params)
  
  if(data.status === "SUCCESS")
  {
    var element = document.getElementById(rideRequestID);
    element.parentNode.removeChild(element);
  }
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


/* Set up rideRequests list in right side panel to be updated by this background service */
setInterval(rideRequest_updateListService, 2500) // milliseconds
