$(document).ready(function () {
  // Getting references to our form and input

  var signUpForm = $("form.signup");
  var firstName = $("input#first_name");
  var lastName = $("input#last_name");
  var emailInput = $("input#email-field");
  var passwordInput = $("input#psw-field");

  // When the signup button is clicked, we validate the email and password are not blank

  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      first_name: firstName.val().trim(),
      last_name: lastName.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (
      !userData.first_name &&
      !userData.last_name &&
      !userData.email &&
      !userData.password
    ) {
      return;
    }
    // If we have an email and password, run the signUpUser function

    signUpUser(
      userData.first_name,
      userData.last_name,
      userData.email,
      userData.password
    );
    firstName.val("");
    lastName.val("");
    emailInput.val("");
    passwordInput.val("");


  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(first_name, last_name, email, password) {
    console.log(first_name)
    $.post("/signup", {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    })
      .then(function (data) {
        window.location.replace("/catalog");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
