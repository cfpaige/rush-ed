// wait till page loads
$(document).ready(function () {

  // grab the needed tags
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // logic for the sign up form submit button
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // makes a new user with email and password
  function signUpUser(email, password) {
    $.post("/signup", {
      email: email,
      password: password
    })
      .then(function (data) {
        // bring them to profile
        window.location.replace("/profile");
      })
      .catch(handleLoginErr);
  }

  // error code
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});