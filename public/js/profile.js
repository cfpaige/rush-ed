$(document).ready(function() {
  $.get("/api/user_data").then(function(data) {
    $(".user-name").text(data.email);
  });
});