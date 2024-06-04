var userId;
var username;
var searchedUserName


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


function sendPostRequest(url, data, confirmCallback) { 
    if (typeof confirmCallback === 'function') {
        $.postJSON(url, data, confirmCallback);
    } else {
        $.postJSON(url, data);
    }
}

function handleSearchResponse(response) {
    if (response) {
        var userProfile = response;

        // display profile card using the data
        displayUserProfile(userProfile);

        $('#addFriend').data('userProfile', userProfile);

        if (userProfile.followerids && userProfile.followerids.includes(userId)) {
            $('#unfollowUser').show();
            $('#followUser').hide();
        } else {
            $('#followUser').show();
            $('#unfollowUser').hide();
        }

        
    } else {
        // if not found user
        $('#notfound').show();
        $('#profileInfoCard').hide(); // hide user profile card 
    }
}



function searchFriend(){
    searchedUserName = $('#searchUsername').val();  // get username from input field
    
    if (searchedUserName.trim() === "") {
        // if username is not entered in text field
        $('#inputempty').show();
        $('#notfound').hide();
        $('#profileInfoCard').hide();
        return;
    }
    
    $('#inputempty').hide();
    
    
    // send GET request and search username
    $.getJSON('http://cmsc106.net/media/profiles/'+ searchedUserName, handleSearchResponse);
    
}

function addFriend() {
    var userProfile = $('#addFriend').data('userProfile');
    if (userProfile) {
        // add user to the friend list
        var friendListItem = $('<a href="#" class="list-group-item list-group-item-action"></a>')
            .text(userProfile.fullname)
            .data('userProfile', userProfile)  //  userProfile is stored in list item.
            .click(function() {  // add click event
                displayUserProfile($(this).data('userProfile'));
                //  if you click username from friend list, hide "Add Friend" button
                $('#addFriend').hide();
            });
        $('#friendList').append(friendListItem);

        // execute request to the server for renewal if necessary 
        // 例: sendPostRequest('/addFriend', { userid: userProfile.userid }, callbackFunction);
    }
}

function confirmFollow(){

}

function followUser(){
    var follow = { followerid:userId, username:searchedUserName};
    sendPostRequest('https://cmsc106.net/media/profiles/follow/', follow);
    $('#followUser').hide();
    $('#unfollowUser').show();
}

function unfollowUser(){
    var unfollow = { followerid:userId, username:searchedUserName};
    sendPostRequest('https://cmsc106.net/media/profiles/unfollow/', unfollow);
    $('#unfollowUser').hide();
    $('#followUser').show();
}

function displayUserProfile(userProfile) {

    if (userProfile) {
        $('#name').text(userProfile.fullname);
        $('#gender').text(userProfile.gender);
        $('#age').text(userProfile.age);
        $('#description').text(userProfile.bio);
        $('#profileInfoCard').show();
        $('#notfound').hide();
        
    }
    
}

function getFollows(data) {
    var numFollowing = data.followingids ? data.followingids.length : 0;
    $('#numFollowing').text(numFollowing);

    var numFollowers = data.followerids ? data.followerids.length : 0;
    $('#numFollowers').text(numFollowers);
}


function setup(){

    userId = localStorage.getItem("userId");
    username = localStorage.getItem("username");
    

    $('#UsernameMain').text(username);
    $.getJSON("http://cmsc106.net/media/profiles/" + username ,getFollows);
    

    $('#searchFriend').click(searchFriend);
    $('#addFriend').click(addFriend);
    $('#followUser').click(followUser);
    $('#unfollowUser').click(unfollowUser);
    $('#unfollowUser').hide();
    $('div#notfound').hide();
    $('div#inputempty').hide();
    $('#profileInfoCard').show();
}
    
    
    $(document).ready(setup);
    
