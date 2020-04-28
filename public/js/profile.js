$(document).ready(function () {
  // grabs user data for a profile on page load
  $.get("/user_data").then(function (data) {
    $(".user-name").text(data.email);
  });
});