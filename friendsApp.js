var profileId;
var postId;
var user;
var pass;
var userId;
var commentId;
var followerId;
var followingId;

//show steps DONE
//Login DONE
//Registration DONE


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
        $('#registration').show();
    }
}

function confirmRegistration(response){
    var profileId = response;

    window.location.href = 'friendsAppMain.html';   
}
//confirms ending here








//Callback function for the GET that fetches the user info to be displayed in the page
function recieveUserInfo(data){
    user = data;
    $('#UsernameMain').text(data.user);
    //Needs to set the username to the h3 span in the main page. Same with followers and following
    //Needs to get the feed from the server and send that to the main page in each table. Create 
    //new elements in the table. Each will be the a new row in the table. 
    //Look at the main page for each post should be set up.
}

function loggingIn(){
    user = $('#username').val();
    pass = $('#password').val();    
    $('#warning').hide();

    if(username & password ==""){
        $('#warning').show();
    }
    else{
        var posting = { username:user, password:pass}
        sendPostRequest("/users/login", posting, confirmLogin);
    }
}
 // Function to check if a value is empty
 function isEmpty(value) {
    return value.trim() === "";
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
        //display warning 
    }else if (isNaN(age) || age < 0) {
        // Additional check to ensure age is a valid number
        //display another warning
    } else {
        //let button to go main page
        //Post
        var postingRegistration = {user:    }
        sendPostRequest()
}}



function setup(){
//$.getJSON(""),receiveUserInfo --------get/profiles/username
//$.getJSON(""),receiveFeed ------------get/posts/postid
//$.getJSON(""),getPostsLikes-----------get/likes/posid/quantity
//$.getJSON(""),getComments ------------get/comments/postId
//$.getJSON(""),getFollowing------------get/profiles/<username>/following
//$.getJSON(""),getFollowers-------------get/profiles/<username>/followers

$('#');
$('#');
$('#');
$('#');
$('#');
$('#');


$('#registration').hide();
$('#register').click(Registration);
$('#login').click(loggingIn)
}


$(document).ready(setup);
