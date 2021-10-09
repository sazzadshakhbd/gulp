// Navbar on scroll animation
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      document.getElementById("navbar_top").classList.add("fixed-top");
      // add padding top to show content behind navbar
      navbar_height = document.querySelector(".navbar").offsetHeight;
      document.body.style.paddingTop = navbar_height + "px";
    } else {
      document.getElementById("navbar_top").classList.remove("fixed-top");
      // remove padding top from body
      document.body.style.paddingTop = "0";
    }
  });
});
// Wow js initialize
$(function () {
  new WOW().init();
});
// Add active class
var x = document.getElementById("main-nav");
var y = x.getElementsByClassName("nav-item");
for (var i = 0; i < y.length; i++) {
  y[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("activeClass");
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" activeClass", "");
    }
    this.className += " activeClass";
  });
}
