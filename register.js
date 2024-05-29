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

function confirmRegistration(response){
    var profileId = response;
    localStorage.setItem("profileId", profileId); ///need to check if this is right
    window.location.href = 'friendsAppMain.html';   
}

function Registration(){
    user = $('#usernameR').val();
    pass = $('#passwordR').val();
    var realName = $('#realName').val();
    var email = $('#email').val();
    var age = $('#age').val();
    var gender = $('#gender').val();
    var aboutMe = $('#aboutMe').val();

    if (isEmpty(user) || isEmpty(pass) || isEmpty(realName) || isEmpty(email) || isEmpty(age) || isEmpty(gender) || isEmpty(aboutMe)) {
        $('#warning').show();
    }else if (isNaN(age) || age < 0) {
        $('#warning').show();
    } else {
        //var post = {username: password: name: email: age: gender: bio:};
        sendPostRequest('https://cmsc106.net/media/profiles', post ,confirmRegistration) // is this url right?
}}



function setup(){
    userId = localStorage.getItem("userId");

    $("#register").click(Registration);
    $('div#warning').hide();

}


$(document).ready(setup);