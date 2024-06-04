var userId;
var username;
var profileId;

var postId;
var numberOfLikes;
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


function makePost(){
    var content = $("#description").val();

    if (content.trim() !== "") {
        var makePost = {user: userId , text: content}
        sendPostRequest("https://cmsc106.net/media/posts",makePost,confirmPost);
    }
}
function confirmPost(){
    location.reload();
}


function getFeed(data){
    var poster = data.user;
    var text = data.text;
    var numLikes = data.likes;

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

}

function confirmComment(commentPost){
   
    sendPostRequest("https://cmsc106.net/media/comments",commentPost,commentDone);

    return;
}

function commentDone(){

}



function likePost(postId) {
    var postLike = { userId: userId, postId: postId };
    sendPostRequest('https://cmsc106.net/media/likes', postLike, function(response) {
        // Assuming response contains updated like count
        var newLikesCount = response.likesCount;
        $('#likesCount_' + postId).text('Likes: ' + newLikesCount);
    });
}


function confirmLike(){

}
function getNumLikes(response){
    numberOfLikes = response;
}

function getFollows(data) {
    var numFollowing;
    if (data.followingids) {
        numFollowing = data.followingids.length;
    } else {
        numFollowing = 0;
    }
    $('#numFollowing').text(numFollowing);

    var numFollowers;
    if (data.followerids) {
        numFollowers = data.followerids.length;
    } else {
        numFollowers = 0;
    }
    $('#numFollowers').text(numFollowers);
}


function setup() {
    userId = localStorage.getItem("userId");
    username = localStorage.getItem("username");
    profileId = localStorage.getItem("profileId");
    

    $('#UsernameMain').text(username);
    $('#post').click(makePost);
    $.getJSON("http://cmsc106.net/media/profiles/" + username, getFollows);

    var n;
    for(n=12; n>0;n--){
        $.getJSON("http://cmsc106.net/media/posts/post/" +n, getFeed);
        postId = n;
        $.getJSON("http://cmsc106.net/media/likes/" + n + "/quantityL", getNumLikes);
    }


}

$(document).ready(setup);