$(document).ready(function () {
  // add form validation error remove on keyup
  $("#img").change(function (e) {
    $("#img").removeClass("is-invalid");
    $("#image_error").html("");
  });

  $("#product").keyup(function (e) {
    $("#product").removeClass("is-invalid");
    $("#product_error").html("");
  });
  $("#desc").keyup(function (e) {
    $("#desc").removeClass("is-invalid");
    $("#desc_error").html("");
  });
  $("#price").keyup(function (e) {
    $("#price").removeClass("is-invalid");
    $("#price_error").html("");
  });
  $("#category").keyup(function (e) {
    $("#category").removeClass("is-invalid");
    $("#category_error").html("");
  });
  $("#qty").keyup(function (e) {
    $("#qty").removeClass("is-invalid");
    $("#qty_error").html("");
  });

  // edit form remove validation error on key up
  $("#edit_img").change(function (e) {
    $("#edit_img").removeClass("is-invalid");
    $("#edit_img_error").html("");
  });

  $("#edit_product").keyup(function (e) {
    $("#edit_product").removeClass("is-invalid");
    $("#edit_product_error").html("");
  });
  $("#edit_desc").keyup(function (e) {
    $("#edit_desc").removeClass("is-invalid");
    $("#edit_desc_error").html("");
  });
  $("#edit_price").keyup(function (e) {
    $("#edit_price").removeClass("is-invalid");
    $("#edit_price_error").html("");
  });

  $("#edit_category").keyup(function (e) {
    $("#edit_category").removeClass("is-invalid");
    $("#edit_category_error").html("");
  });
  $("#edit_qty").keyup(function (e) {
    $("#edit_qty").removeClass("is-invalid");
    $("#edit_qty_error").html("");
  });

  $("#edit_featured").keyup(function (e) { 
    $("#edit_featured").removeClass("is-invalid");
    $("#edit_featured_error").html("");
  });

  $("#btnAddProduct").click(function (e) {
    e.preventDefault();

    let addProductForm = $("#addProductForm")[0];
    let addProductFormData = new FormData(addProductForm);
    console.log(addProductForm);

    $.ajax({
      type: "post",
      url: "/adminParts",
      enctype: "multipart/form-data",
      data: addProductFormData,
      processData: false,
      contentType: false,
      cache: false,
      success: function (res) {
        if (res.status === 200) {
          $("#img").removeClass("is-invalid");
          $("#image_error").html("");
          $("#product").removeClass("is-invalid");
          $("#product_error").html("");
          $("#desc").removeClass("is-invalid");
          $("#desc_error").html("");
          $("#price").removeClass("is-invalid");
          $("#price_error").html("");
          $("#qty").removeClass("is-invalid");
          $("#qty_error").html("");
          $("#category").removeClass("is-invalid");
          $("#category_error").html("");
          new swal({
            title: "Success",
            text: "Added Product",
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
            if (typeof e.img != "undefined") {
              $("#img").addClass("is-invalid");
              $("#image_error").html(e.img);
            }

            if (typeof e.product != "undefined") {
              $("#product").addClass("is-invalid");
              $("#product_error").html(e.product);
            }

            if (typeof e.desc != "undefined") {
              $("#desc").addClass("is-invalid");
              $("#desc_error").html(e.desc);
            }

            if (typeof e.price != "undefined") {
              $("#price").addClass("is-invalid");
              $("#price_error").html(e.price);
            }

            if (typeof e.qty != "undefined") {
              $("#qty").addClass("is-invalid");
              $("#qty_error").html(e.qty);
            }

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
      url: "/adminProductEdit/" + $(this).attr("data-id"),
      dataType: "json",
      success: function (res) {
        if (res.status === 200) {
          $("#edit_id").val(res.product[0].pid);
          $("#edit_product").val(res.product[0].item_name);
          $("#edit_category").val(res.product[0].category_id);
          $("#edit_desc").val(res.product[0].description);
          $("#edit_price").val(res.product[0].price);
          $("#edit_qty").val(res.product[0].qty);
          $("#edit_featured").val(res.product[0].is_featured);
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

    let updateProductForm = $("#editForm")[0];
    let updateProductFormData = new FormData(updateProductForm);

    $.ajax({
      type: "post",
      url: "/adminProductUpdate",
      enctype: "multipart/form-data",
      data: updateProductFormData,
      processData: false,
      contentType: false,
      cache: false,
      success: function (res) {
        if (res.status === 200) {
          $("#edit_img").removeClass("is-invalid");
          $("#edit_image_error").html("");
          $("#edit_product").removeClass("is-invalid");
          $("#edit_product_error").html("");
          $("#edit_desc").removeClass("is-invalid");
          $("#edit_desc_error").html("");
          $("#edit_price").removeClass("is-invalid");
          $("#edit_price_error").html("");
          $("#edit_qty").removeClass("is-invalid");
          $("#edit_qty_error").html("");
          $("#edit_category").removeClass("is-invalid");
          $("#edit_category_error").html("");
          $("#edit_featured").removeClass("is-invalid");
          $("#edit_featured_error").html("");
          new swal({
            title: "Success",
            text: "Updated Product",
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
            if (typeof e.img != "undefined") {
              $("#edit_img").addClass("is-invalid");
              $("#edit_image_error").html(e.img);
            }

            if (typeof e.product != "undefined") {
              $("#edit_product").addClass("is-invalid");
              $("#edit_product_error").html(e.product);
            }

            if (typeof e.desc != "undefined") {
              $("#edit_desc").addClass("is-invalid");
              $("#edit_desc_error").html(e.desc);
            }

            if (typeof e.price != "undefined") {
              $("#edit_price").addClass("is-invalid");
              $("#edit_price_error").html(e.price);
            }

            if (typeof e.qty != "undefined") {
              $("#edit_qty").addClass("is-invalid");
              $("#edit_qty_error").html(e.qty);
            }

            if (typeof e.category != "undefined") {
              $("#edit_category").addClass("is-invalid");
              $("#edit_category_error").html(e.category);
            }

            if (typeof e.featured != "undefined") {
              $("#edit_featured").addClass("is-invalid");
              $("#edit_featured_error").html(e.featured);
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
          url: "/adminProductDelete",
          data: {
            id: $(this).attr("data-id"),
          },
          cache: false,
          success: function (res) {
            if (res.status === 200) {
              window.location.href = "/adminParts";
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
