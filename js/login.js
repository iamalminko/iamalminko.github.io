var HOST = 'http://localhost:3000'
//var HOST = 'https://aembs.herokuapp.com'

function formResponse()
{
    document.getElementsByClassName("container-admin")[0].style.display = "block";
    document.getElementsByClassName("container-login100")[0].style.display = "none";    
}

function onClick_signIn(){
    email = document.getElementById("email").value
    password = document.getElementById("password").value

    console.log(email, password)

    postData(HOST + '/login', {email: email, password: password})
}