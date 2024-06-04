var userId;
var username;






function getFollows(data) {
    var numFollowing = data.followingids ? data.followingids.length : 0;
    $('#numFollowing').text(numFollowing);

    var numFollowers = data.followerids ? data.followerids.length : 0;
    $('#numFollowers').text(numFollowers);
}


function setup() {
    userId = localStorage.getItem("userId");
    username = localStorage.getItem("username");
    

    $('#UsernameMain').text(username);
    $.getJSON("http://cmsc106.net/media/profiles/" + userId ,getFollows);


}

$(document).ready(setup);