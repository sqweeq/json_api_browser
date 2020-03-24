// navbar add class to decrease height and add boxshadow when scrolling down from top
let scrollpos = window.scrollY;
const header = document.getElementById("second-navbar-id");
const header_height = header.offsetHeight;
const add_class_on_scroll = () => header.classList.add("scroll-top-effect");
const remove_class_on_scroll = () =>
  header.classList.remove("scroll-top-effect");

// add the class or remove depending on scroll position
window.addEventListener("scroll", function() {
  scrollpos = window.scrollY;

  if (scrollpos >= header_height) {
    add_class_on_scroll();
  } else {
    remove_class_on_scroll();
  }

  console.log(scrollpos);
});
