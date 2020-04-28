// when the page loads
$(document).ready(function () {

  // grab the correct tags 
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // logic for submitting the login form
  loginForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // sends the user info to the back end to check if its correct
  function loginUser(email, password) {
    $.post("/login", {
      email: email,
      password: password
    })
      .then(function () {
        window.location.replace("/profile");
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});