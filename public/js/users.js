console.log("Users.js loaded");

$(document).ready(function() {
  $("#add-account").on("click", function (event) {
    event.preventDefault();
      var newUser = {
    email: $("#inputEmail").val().trim(),
      user_key: $("#inputPassword").val().trim()
      };
    if (newUser.email.length > 0 && newUser.user_key.length > 0) {
      $.ajax({
        type: "post",
        url: "/signup",
        data: newUser
      }).then(function (data) {
        window.location.href = "/"
      });
    }else {
      console.log("**Please enter your email and password.**");
      $("#create-err-msg").empty("").text("**Please enter your email and password.**");
    }
  });
});