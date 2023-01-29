$(document).ready(function () {
  $("#name").keyup(function (e) {
    $("#name").removeClass("is-invalid");
    $("#name_error").html("");
  });

  $("#address").keyup(function (e) {
    $("#address").removeClass("is-invalid");
    $("#address_error").html("");
  });

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

  $("#btnRegister").on("click", function (e) {
    e.preventDefault();
    let name = $("#name").val();
    let address = $("#address").val();
    let email = $("#email").val();
    let password = $("#password").val();
    $.ajax({
      type: "post",
      url: "/register",
      data: {
        name: name,
        address: address,
        email: email,
        password: password,
      },
      cache: false,
      success: function (res) {
        if (res.status === 400 && typeof res.errors == "undefined") {
          $("#email").addClass("is-invalid");
          $("#email_error").html(res.msg);
        }

        if (
          res.status === 400 &&
          typeof res.errors != "undefined" &&
          res.errors.length != 0
        ) {
          res.errors.forEach((e) => {
            if (typeof e.name != "undefined") {
              $("#name").addClass("is-invalid");
              $("#name_error").html(e.name);
            }

            if (typeof e.address != "undefined") {
              $("#address").addClass("is-invalid");
              $("#address_error").html(e.address);
            }

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
          $("#name").removeClass("is-invalid");
          $("#name_error").html("");
          $("#address").removeClass("is-invalid");
          $("#address_error").html("");
          $("#email").removeClass("is-invalid");
          $("#email_error").html("");
          $("#password").removeClass("is-invalid");
          $("#password_error").html("");
          new swal({
            title: "Success",
            text: "Registered Successfully",
            icon: "success",
          });
          $("#regForm")[0].reset();
        }
      },
      error: function (xhs, status, msg) {
        new swal({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
        });
      },
    });
  });
});
