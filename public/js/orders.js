var menu_btn = document.querySelector("#menu-btn");
var sidebar = document.querySelector("#sidebar");
var container = document.querySelector(".my-container");
menu_btn.addEventListener("click", () => {
  sidebar.classList.toggle("active-nav");
  container.classList.toggle("active-cont");
});

$(document).ready(function () {
  $(".approvedBtn").click(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/orderCompleted",
      data: {
        id: $(this).attr("data-id"),
      },
      success: function (response) {
        new swal({
          title: "Success",
          text: "Order status set to complete",
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
  });

  $(".cancelBtn").click(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/orderCancel",
      data: {
        id: $(this).attr("data-id"),
      },
      success: function (response) {
        new swal({
          title: "Success",
          text: "Order status set to cancel",
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
  });
});
