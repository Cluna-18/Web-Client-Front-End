var userId;
var username;



function getFollows(data) {
    var numFollowing = data.followingids ? data.followingids.length : 0;
    $('#numFollowing').text(numFollowing);

    var numFollowers = data.followerids ? data.followerids.length : 0;
    $('#numFollowers').text(numFollowers);
}

function getmyProfile(data){
    $('#name').text(data.fullname);
    $('#gender').text(data.gender);
    $('#age').text(data.age);
    $('#description').text(data.bio);
}




function setup() {
    userId = localStorage.getItem("userId");
    username = localStorage.getItem("username");
    

    $('#UsernameMain').text(username);
    $.getJSON("http://cmsc106.net/media/profiles/" + username ,getFollows);
    $.getJSON('http://cmsc106.net/media/profiles/'+ username ,getmyProfile);

    
}

$(document).ready(setup);
