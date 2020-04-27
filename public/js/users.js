// when page loads
$(document).ready(function () {

  // grab the required tags
  var loginForm = $("form.login");
  var emailInput = $("input#inputEmail");
  var passwordInput = $("input#inputPassword");

  // logic for the login button submit
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

  // logic to log in the user
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