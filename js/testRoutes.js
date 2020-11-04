var HOST = 'http://localhost:3000'
//var HOST = 'https://aembs.herokuapp.com'
function newAdmin(){
    var body = {
        email: document.getElementById("newAdmin_input").value
    }
    response = postData(HOST + '/admin/new', body)
}
function newCustomer(){
    var body = {
        email: document.getElementById("newCustomer_input").value
    }
    response = postData(HOST + '/customer/new', body)
}
function newDispatcher(){
    var body = {
        email: document.getElementById("newDispatcher_input").value
    }
    response = postData(HOST + '/dispatcher/new', body)
}
function newDriver(){
    var body = {
        email: document.getElementById("newDriver_input").value
    }
    response = postData(HOST + '/driver/new', body)
}
function newLoad(){
    var body = {
        pickupAddress: document.getElementById("newLoad_input").value
    }
    response = postData(HOST + '/load/new', body)
}
function newMachineShop(){
    var body = {
        name: document.getElementById("newMachineShop_input").value
    }
    response = postData(HOST + '/machineShop/new', body)
}
function newMechanic(){
    var body = {
        email: document.getElementById("newMechanic_input").value
    }
    response = postData(HOST + '/mechanic/new', body)
}
function newPart(){
    var body = {
        name: document.getElementById("newPart_input").value
    }
    response = postData(HOST + '/part/new', body)
}
function newSession(){
    var body = {
        key: document.getElementById("newSession_input").value
    }
    response = postData(HOST + '/session/new', body)
}
function newTask(){
    var body = {
        name: document.getElementById("newTask_input").value
    }
    response = postData(HOST + '/task/new', body)
}
function newTrailor(){
    var body = {
        licencePlate: document.getElementById("newTrailor_input").value
    }
    response = postData(HOST + '/trailor/new', body)
}
function newTruck(){
    var body = {
        licencePlate: document.getElementById("newTruck_input").value
    }
    response = postData(HOST + '/truck/new', body)
}
function login(){
    var body = {
        email: document.getElementById("loginEmail_input").value,
        password: document.getElementById("loginPassword_input").value
    }
    response = postData(HOST + '/login', body)
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
    }).then(response => response.json().then(data => ({
        data: data,
        status: response.status
    })).then(res => {
        document.getElementById("response_label").textContent = JSON.stringify(res.data)
    }));
    return String(response); // parses JSON response into native JavaScript objects
}