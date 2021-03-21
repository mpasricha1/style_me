$(document).ready(function() {

  var signUpForm = $("#signup");
  var emailInput = $("#email");
  var passwordInput = $("#password");
  var fname = $("#fname"); 
  var lname = $("#lname"); 

  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
      fname: passwordInput.val().trim()
      lname: passwordInput.val().trim()
    };

    $.post("/api/signup", userData).then( (data) =>{
    	console.log(data)
    })
