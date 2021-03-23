let emailField = $("#email-field");
let pswField = $("#psw-Field");
const loginBtn = $("#login-btn");
// On click, cancel button brings user back to Home page
const cancelBtn = $("#home-btn");

loginBtn.on("click", function(event) {
    event.preventDefault(event);
    
    let email = emailField.val();
    let password = pswField.val();

    // Have to validate user email and password
    if(email === " " && password === " "){
        alert("You are logged in!");
        location.reload();
    } else {
        $("#login-error").css("opacity","1");
    }
});