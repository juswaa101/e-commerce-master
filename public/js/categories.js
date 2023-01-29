$(document).ready(function () {
  $("#category").keyup(function (e) {
    $("#category").removeClass("is-invalid");
    $("#category_error").html("");
  });
  $("#edit_category").keyup(function (e) {
    $("#edit_category").removeClass("is-invalid");
    $("#edit_category_error").html("");
  });

  $("#btnAddCategory").click(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/adminCategories",
      data: {
        category: $("#category").val()
      },
      cache: false,
      success: function (res) {
        if (res.status === 200) {
          $("#category").removeClass("is-invalid");
          $("#category_error").html("");
          new swal({
            title: "Success",
            text: "Added Category",
            icon: "success",
          }).then((result) => {
            $("#addCategoryForm")[0].reset();
            window.location.reload();
          });
        }

        if (
          res.status === 400 &&
          typeof res.errors != "undefined" &&
          res.errors.length != 0
        ) {
          res.errors.forEach((e) => {
            if (typeof e.category != "undefined") {
              $("#category").addClass("is-invalid");
              $("#category_error").html(e.category);
            }
          });
        }
      },
      error: function (xhs, message, status) {
        new swal({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
        });
      },
    });
  });

  $(".editBtn").click(function (e) {
    e.preventDefault();
    $("#edit").modal("show");
    $.ajax({
      type: "get",
      url: "/adminCategoriesEdit/" + $(this).attr("data-id"),
      dataType: "json",
      success: function (res) {
        if (res.status === 200) {
          $("#edit_id").val(res.category[0].id);
          $("#edit_category").val(res.category[0].category_name);
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

  $(".updateBtn").click(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/adminCategoriesUpdate",
      data: {
        id: $("#edit_id").val(),
        category: $("#edit_category").val(),
      },
      cache: false,
      success: function (res) {
        if (res.status === 200) {
          $("#edit_img").removeClass("is-invalid");
          $("#edit_image_error").html("");
          new swal({
            title: "Success",
            text: "Updated Category",
            icon: "success",
          }).then((result) => {
            window.location.reload();
          });
        }

        if (
          res.status === 400 &&
          typeof res.errors != "undefined" &&
          res.errors.length != 0
        ) {
          res.errors.forEach((e) => {
            if (typeof e.category != "undefined") {
              $("#edit_category").addClass("is-invalid");
              $("#edit_category_error").html(e.category);
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
          url: "/adminCategoriesDelete",
          data: {
            id: $(this).attr("data-id"),
          },
          cache: false,
          success: function (res) {
            if (res.status === 200) {
              window.location.href = "/adminCategories";
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
});
