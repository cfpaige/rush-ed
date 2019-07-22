$(document).ready(function() {
  $.get("/user_data").then(function(data) {
    $(".user-name").text(data.email);
  });
});