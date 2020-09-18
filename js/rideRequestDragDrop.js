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
  setTimeout(() => (this.className += ' hold'), 0);
  e.dataTransfer.setData("text/plain", e.target.id);
  FLAGdragInProcess = true
}

function dragEnd() {
  this.className = "btn-rideRequest";
  FLAGdragInProcess = false
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
  FLAGdragInProcess = false
  e.preventDefault();
  //this.className = 'empty';
  var rideRequestID = e.dataTransfer.getData("text");
  var driverID = this.id

  /* POST Request: */
  var params = {
    _id: rideRequestID,
    driverID: driverID,
    state: "DRIVER_ASSIGNED"
  }
  var data = await postData('/update/rideRequest', params)
  
  if(data.status === "SUCCESS")
  {
    var element = document.getElementById(rideRequestID);
    element.parentNode.removeChild(element);
    
    var el = document.getElementById(driverID);
    el.className = 'marker-taxi assigned';
  }
}