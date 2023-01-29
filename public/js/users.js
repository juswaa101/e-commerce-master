var menu_btn = document.querySelector("#menu-btn");
var sidebar = document.querySelector("#sidebar");
var container = document.querySelector(".my-container");
menu_btn.addEventListener("click", () => {
  sidebar.classList.toggle("active-nav");
  container.classList.toggle("active-cont");
});

$(document).ready(function () {
  $("#name").keyup(function (e) {
    $("#name").removeClass("is-invalid");
    $("#name_error").html("e.name");
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

  $("#usersTable").DataTable();

  $(".deleteBtn").click(function (e) {
    e.preventDefault();
    new swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "post",
          url: "/adminUserDelete",
          data: {
            id: $(this).attr("data-id"),
          },
          cache: false,
          success: function (res) {
            if (res.status === 200) {
              window.location.href = "/adminUsers";
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
      }
    });
  });

  $(".editBtn").click(function (e) {
    e.preventDefault();
    $("#editUserModal").modal("show");
    $.ajax({
      type: "get",
      url: "/adminUserEdit/" + $(this).attr("data-id"),
      dataType: "json",
      success: function (res) {
        if (res.status === 200) {
          $("#id").val(res.user[0].id);
          $("#name").val(res.user[0].full_name);
          $("#address").val(res.user[0].address);
          $("#email").val(res.user[0].email);
        }
      },
      error: function (xhr, message, status) {
        new swal({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
        });
      },
    });
  });

  $("#updateBtn").click(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/adminUserEdit",
      data: {
        id: $("#id").val(),
        name: $("#name").val(),
        address: $("#address").val(),
        email: $("#email").val(),
        password: $("#password").val(),
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
          }).then((result) => {
            if(result) {
              window.location.reload();
            }
          });
        }
      },
      error: function (xhr, message, status) {
        new swal({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
        });
      },
    });
  });
});
