$(document).ready(function () {
  $(".orderBtn").click(function (e) {
    e.preventDefault();
    console.log($(this).attr("data-id"));
    new swal({
      title: "Are you sure you want to order this product?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Order",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "post",
          url: "/placeOrder",
          data: {
            cart_id: $(this).attr("data-id"),
            product_id: $(this).attr("data-product-id"),
            user_id: $(this).attr("data-user-id")
          },
          cache: false,
          success: function (response) {
            new swal({
              title: "Success",
              text: "Your order was set and is now pending.",
              icon: "success",
            })
            .then((result) => {
                window.location.href = "/orders";
            });
          },
          error: function (xhs, message, status) {
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

  $(".removeCartBtn").click(function (e) {
    e.preventDefault();
    console.log($(this).attr("data-id"));
    new swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "post",
          url: "/deleteCart",
          data: {
            id: $(this).attr("data-id"),
          },
          cache: false,
          success: function (response) {
            new swal({
              title: "Success",
              text: "Remove from cart",
              icon: "success",
            }).then((result) => {
              window.location.reload();
            });
          },
          error: function (xhs, message, status) {
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
