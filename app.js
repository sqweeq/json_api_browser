// navbar add class to decrease height and add boxshadow when scrolling down from top
let scrollpos = window.scrollY;
const header = document.getElementById("second-navbar-id");
const header_height = header.offsetHeight;
const add_class_on_scroll = () => header.classList.add("scroll-top-effect");
const remove_class_on_scroll = () =>
  header.classList.remove("scroll-top-effect");

// add the class or remove depending on scroll position
window.addEventListener("scroll", function () {
  scrollpos = window.scrollY;

  if (scrollpos >= header_height) {
    add_class_on_scroll();
  } else {
    remove_class_on_scroll();
  }

  // console.log(scrollpos);
});
// get all rules
const req = new XMLHttpRequest();
req.open("GET", "https://us-west-2.cloudconformity.com/v1/services", true);
req.onload = function () {
  const data = JSON.parse(this.response);
  // map over data, compare and match ID's, find and return
  const Rules = data.data.map((item) => ({
    Category: item.id,
    Index: item.relationships.rules.data.map(
      (x) =>
        data.included.filter((k) => k.id == x.id).find((b) => b.attributes)
          .attributes
    ),
  }));

  console.log(Rules);

  // render rules in list onto page
  const allRules = document.querySelector(".all-rules");
  const ul = document.createElement("ul");
  ul.setAttribute("class", "service-list");

  Rules.forEach((item) => {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");

    const a = document.createElement("a");

    li.setAttribute("class", "service-link");
    a.textContent = item.Category;
    ul.appendChild(li);
    li.appendChild(h3);
    h3.appendChild(a);

    item.Index.forEach((z) => {
      const h6 = document.createElement("h6");
      h6.textContent = z.title;
      li.appendChild(h6);
      const p = document.createElement("p");
      p.textContent = z.description;
      p.setAttribute("class", "text-secondary");
      li.appendChild(p);
    });
    allRules.appendChild(ul);
  });
};

req.send();
