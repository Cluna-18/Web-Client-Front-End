var user;
var pass;
var userId;


jQuery["postJSON"] = function(url,data,callback) {
	$.ajax({
	  url:url,
	  type:'POST',
	  data:JSON.stringify(data),
	  contentType:'application/json',
	  dataType:'json',
	  success: callback
	});
};

function sendPostRequest(url, data, confirmCallback) { //Need to make sure posts are sent to this function
    $.postJSON(url, data, confirmCallback);
}


//Confirms need to be here
function confirmLogin(response) {
    userId = response;
    if(userId<0){
        $('#warning').show();
    }else{
        localStorage.setItem("userId",userId);
        window.location.href = "friendsAppMain.html";
    }
}

function loggingIn(){
    user = $('#username').val();
    localStorage.setItem("username",user);
    pass = $('#password').val();    
    $('#warning').hide();

    if(username & password == ""){
        $('#warning').show();
    }
    else{
        var posting = { username:user, password:pass};
        sendPostRequest("https://cmsc106.net/media/users/login", posting, confirmLogin);
    }
}
 // Function to check if a value is empty
 function isEmpty(value) {
    return value.trim() === "";
}

function Registration(){
    window.location.href = "register.html";
}


function setup(){
$('#register').click(Registration);
$('#login').click(loggingIn)
$('div#warning').hide();
}


$(document).ready(setup);
