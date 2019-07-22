console.log("Accounts.js loaded");

$(document).ready(function() {
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  $("#add-account").on("click", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    if (!userData.email || !userData.password) {
      console.log("**Form not filled out.**");
      $("#create-err-msg").empty("").text("**Please enter your email and password.**");
    } else {
      $.post("/signup", {
        email: email,
        password: password
      }).then(function (data) {
        window.location.replace("/home")
      });
    }
  });
});































// // =============================

//     if (!userData.email || !userData.password) {
//       return;
//     }

//     // If we have an email and password we run the loginUser function and clear the form
//     loginUser(userData.email, userData.password);
//     emailInput.val("");
//     passwordInput.val("");
//   });

//   // loginUser does a post to the "/login" route and if successful, redirects us the the home page
//   function loginUser(email, password) {
//     $.post("/login", {
//       email: email,
//       password: password
//     })
//       .then(function() {
//         window.location.replace("/home");
//         // If there's an error, log the error
//       })
//       .catch(function(err) {
//         console.log(err);
//       });
//   }

//   // ======================== SIGNUP ========================
//   // Getting references to our form and input
//   var signUpForm = $("form.signup");
//   var emailInput = $("input#email-input");
//   var passwordInput = $("input#password-input");

//   // When the signup button is clicked, we validate the email and password are not blank
//   signUpForm.on("submit", function(event) {
//     event.preventDefault();
//     var userData = {
//       email: emailInput.val().trim(),
//       password: passwordInput.val().trim()
//     };

//     if (!userData.email || !userData.password) {
//       return;
//     }
//     // If we have an email and password, run the signUpUser function
//     signUpUser(userData.email, userData.password);
//     emailInput.val("");
//     passwordInput.val("");
//   });

//   // Does a post to the signup route. If successful, we are redirected to the members page
//   // Otherwise we log any errors
//   function signUpUser(email, password) {
//     $.post("/signup", {
//       email: email,
//       password: password
//     })
//       .then(function(data) {
//         window.location.replace("/profile");
//         // If there's an error, handle it by throwing up a bootstrap alert
//       })
//       .catch(handleLoginErr);
//   }

//   function handleLoginErr(err) {
//     $("#alert .msg").text("Oops! Something went wrong. (Try logging in instead.)");
//     $("#alert").fadeIn(500);
//   }


