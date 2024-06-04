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

function getFeed(data){
    for (var n = 0; n < data.length; n++) {
        var postData = data[n];
        var poster = postData.user;
        var text = postData.text;
        var numLikes = postData.likes;
        var postId = postData.postid;

    var fifthdiv = $("<div>").attr("class","col-sm-12");
    var fourthdiv = $("<div>").attr("class","card bg-light mb-1 mt-1");
    var thirddiv = $("<div>").attr("class","card-body p-2");
    var seconddiv = $("<div>").attr("class","col sm-10");
    var firstdiv = $('<div>').attr("class", 'card bg-secondary');
    var newDiv = $("<div>").attr("class","card-body p-2");
    var newHead = $("<h1>").text(poster);
    var goToAccountButton = $('<button>');
    goToAccountButton.click(goToAccount);
    goToAccountButton.addClass('btn btn-primary mx-3');
    goToAccountButton.text("Visit Account");
    newHead.append(goToAccountButton);
    newDiv.append(newHead);
    var hr = $('<hr>');
    var br = $('<br>');
    newDiv.append(hr);
    newDiv.append(br);
    var newContent = $("<h3>").text(text);
    newDiv.append(newContent);
    var hr1 = $('<hr>');
    var br1 = $('<br>');
    newDiv.append(hr1);
    newDiv.append(br1);
    
    var newLikes = $("<h5>").text("Likes: "+ numLikes);
    newDiv.append(newLikes);

    var likeButton = $('<button>');
    likeButton.click(function() {
        likePost(data.postid); // Assuming data.id contains postId

    });
    likeButton.addClass("btn btn-primary mx-3");
    likeButton.text("Like");
    newDiv.append(likeButton);

    var commentButton = $('<button>');
    commentButton.click(function() {
        $(this).siblings('.comment-area').toggle();
    });
    commentButton.addClass("btn btn-primary mx-3");
    commentButton.text("Comment");
    newDiv.append(commentButton);
    
// Create the comment area
var commentArea = $('<div>').addClass('comment-area').css('display', 'none');
var commentTextArea = $('<textarea>').addClass('form-control my-2').attr('rows', 3);
var commentBody = commentTextArea.val();
var commentPost = {post:postId, user:userId,content:commentBody};
var submitCommentButton = $('<button>')
    .addClass('btn btn-primary my-2')
    .text('Submit Comment')
    .click(function() {
        var commentText = commentTextArea.val().trim();
        commentText = userId + ": " + commentText;
        if (commentText) {
            // Append the new comment to the comments list
            var newComment = $('<div>').addClass('comment-box bg-light p-2 mt-2').text(commentText);
            confirmComment(commentPost);
            commentsList.append(newComment);
            commentTextArea.val('');  // Clear the textarea after submission
        } else {
            alert('Comment cannot be empty');
        }
    });

// Create a div to hold the comments

var commentsList = $('<div>').addClass('comments-list');

// Append elements to the comment area
commentArea.append(commentTextArea).append(submitCommentButton).append(commentsList);
newDiv.append(commentArea);

    firstdiv.append(newDiv);
    seconddiv.append(firstdiv);
    thirddiv.append(seconddiv);
    fourthdiv.append(thirddiv);
    fifthdiv.append(fourthdiv);

    $("#posts").append(fifthdiv);
}}

function viewPosts() {
    $.getJSON("http://cmsc106.net/media/posts/user/" + username, getFeed);
    $('#profileInfo').hide();
    $("#posts").show(); // Show the posts section
}
function goToAccount(){

}


function setup() {
    userId = localStorage.getItem("userId");
    username = localStorage.getItem("username");

    $('#UsernameMain').text(username);
    $.getJSON("http://cmsc106.net/media/profiles/" + username, getFollows);
    $.getJSON('http://cmsc106.net/media/profiles/' + username, getmyProfile);

    $("#ViewMyPosts").click(viewPosts);

    $("#posts").hide(); // Initially hide the posts section
}

$(document).ready(setup);

