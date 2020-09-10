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

      var ul = document.getElementById("clientCallsList");
      var child = ul.lastElementChild;
      while (child) { 
          ul.removeChild(child); 
          child = ul.lastElementChild; 
      } 
      
      rideRequests.forEach(function(rideRequest) 
      { 
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(rideRequest.address));
        li.setAttribute("href", "#");
        li.setAttribute("draggable", "true");
        ul.appendChild(li);
      });
    })
    .catch(function (error) {
      console.log("Error: " + error);
    })
}

/* Set up rideRequests list in right side panel to be updated by this background service */
setInterval(rideRequest_updateListService, 2500) // milliseconds