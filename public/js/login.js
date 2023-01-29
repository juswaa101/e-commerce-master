$(document).ready(function () {
  $("#email").keyup(function (e) {
    $("#email").removeClass("is-invalid");
    $("#email_error").html("");
  });

  $("#password").keyup(function (e) {
    if ($("#password").val().length >= 8) {
      $("#password").removeClass("is-invalid");
      $("#password_error").html("");
    }
  });

  $("#btnLogin").on("click", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/login",
      data: {
        email: $("#email").val(),
        password: $("#password").val(),
      },
      cache: false,
      success: function (res) {
        if (res.status === 400 && typeof res.errors == "undefined") {
          $("#credential_error").html(res.msg);
        }
        if (
          res.status === 400 &&
          typeof res.errors != "undefined" &&
          res.errors.length != 0
        ) {
          res.errors.forEach((e) => {
            if (typeof e.email != "undefined") {
              $("#email").addClass("is-invalid");
              $("#email_error").html(e.email);
            }

            if (typeof e.password != "undefined") {
              $("#password").addClass("is-invalid");
              $("#password_error").html(e.password);
            }
          });
        }
        if (res.status === 200) {
          $("#credential_error").html("");
          window.location.href = "/";
        }
      },
      error: function (xhs, status, message) {
        new swal({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
        });
      },
    });
  });

  $("#btnAdminLogin").on("click", function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/admin",
      data: {
        email: $("#email").val(),
        password: $("#password").val(),
      },
      cache: false,
      success: function (res) {
        if (res.status === 400 && typeof res.errors == "undefined") {
          $("#credential_error").html(res.msg);
        }
        if (
          res.status === 400 &&
          typeof res.errors != "undefined" &&
          res.errors.length != 0
        ) {
          res.errors.forEach((e) => {
            if (typeof e.email != "undefined") {
              $("#email").addClass("is-invalid");
              $("#email_error").html(e.email);
            }

            if (typeof e.password != "undefined") {
              $("#password").addClass("is-invalid");
              $("#password_error").html(e.password);
            }
          });
        }

        if (res.status === 200) {
          window.location.href = "/adminDashboard";
        }
      },
    });
  });
});
