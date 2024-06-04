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
    $.postJSON(url, data, confirmCallback);
}

function handleSearchResponse(response) {
    if (response) {
        var userProfile = response;

        // display profile card using the data
        displayUserProfile(userProfile);

        $('#addFriend').data('userProfile', userProfile);

        
    } else {
        // if not found user
        $('div#notfound').show();
        $('#profileInfoCard').hide(); // hide user profile card 
    }
}



function searchFriend(){
    var searchedUserName = $('#searchUsername').val();  // get username from input field
    
    if (searchedUserName.trim() === "") {
        // if username is not entered in text field
        $('#inputempty').show();
        $('#notfound').hide();
        $('#profileInfoCard').hide();
        return;
    }
    
    $('#inputempty').hide();
    
    
    // send GET request and search username
    $.getJSON('https://cmsc106.net/media/profiles/'+ searchedUserName, handleSearchResponse);
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


function setup(){
    $('#searchFriend').click(searchFriend);
    $('#addFriend').click(addFriend);
    $('div#notfound').hide();
    $('div#inputempty').hide();
    $('#profileInfoCard').hide();
    
    }
    
    
    $(document).ready(setup);
    
