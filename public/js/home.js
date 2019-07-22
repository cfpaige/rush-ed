console.log("Modal loaded.");

$(document).ready(function () {

    $("#sign-in-modal").on("click", function (event) {
        event.preventDefault();

        $("#login-modal").modal("show");
    });
    $("#sign-in").on("click", function (event) {
        event.preventDefault();

        var user = {
            email: $("#email").val().trim(),
            password: $("#password").val().trim()
        }

        $.post("/login", user, function (results) {
            if (results) {
                $(location).attr('href', '/profile')
            } else {
                $("#login-modal").modal("close");
                alert("oops something went wrong, please try again!");

            }

        })

    });
});