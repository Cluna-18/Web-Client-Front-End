var userId;

jQuery["postJSON"] = function(url, data, callback) {
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success: callback,
        error: function(xhr, status, error) {
            console.error(`Error: ${status}, ${error}`);
            $('#warning').text('An error occurred during the registration process. Please try again.').show();
        }
    });
};

function sendPostRequest(url, data, confirmCallback) {
    $.postJSON(url, data, confirmCallback);
}

function confirmToRegister(response) {
    userId = response;
    var user = $('#usernameR').val();
    var pass = $('#passwordR').val();
    var realName = $('#realName').val();
    var age = $('#age').val();
    var gender = $('#gender').val();
    var aboutMe = $('#aboutMe').val();

    if (isEmpty(user) || isEmpty(pass) || isEmpty(realName) || isEmpty(age) || isEmpty(gender) || isEmpty(aboutMe)) {
        $('#warning').text('All fields are required.').show();
    } else if (isNaN(age) || age < 0) {
        $('#warning').text('Age must be a non-negative number.').show();
    } else {
        Registration(realName, age, gender, aboutMe);
    }
}

function confirmRegistration(response) {
    var profileId = response;
    localStorage.setItem("profileId", profileId);
    window.location.href = 'friendsAppMain.html';
}

function makeUserId() {
    var user = $('#usernameR').val();
    localStorage.setItem("username",user);
    var pass = $('#passwordR').val();
    var postingUserId = { username: user, password: pass };
    sendPostRequest("https://cmsc106.net/media/users", postingUserId, confirmToRegister);
}

function Registration(realName, age, gender, aboutMe) {
    var post = { userid: userId, fullname: realName, age: parseInt(age), gender: gender, bio: aboutMe };
    sendPostRequest('https://cmsc106.net/media/profiles/'+ userId, post, confirmRegistration);
}

function isEmpty(str) {
    return (!str || str.trim() === '');
}

function setup() {
    userId = localStorage.getItem("userId");

    $("#register").click(makeUserId);
    $('#warning').hide();
}

$(document).ready(setup);
