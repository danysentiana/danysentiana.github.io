var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Change the icons inside the button based on previous settings
if (localStorage.getItem("color-theme") === "dark" || (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  themeToggleLightIcon.classList.remove("hidden");
} else {
  themeToggleDarkIcon.classList.remove("hidden");
}

var themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", function () {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  // if set via local storage previously
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
});

// hide notification
setTimeout(function () {
  document.getElementById("notif").style.display = "none";
}, 5500);

window.addEventListener("load", () => {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
  });

  scroll.destroy();

  setTimeout(function () {
    scroll.init();
  }, 100);
});
// setTimeout(() => {
//   scroll.update();
// }, 5000);

// splide autoscroll
document.addEventListener("DOMContentLoaded", function () {
  new Splide(".splide", {
    type: "loop",
    drag: "free",
    focus: "center",
    arrows: false,
    pagination: false,
    perPage: 6,
    autoScroll: {
      speed: 1,
      pauseOnHover: false,
    },
    drag: false,
    breakpoints: {
      1023: {
        perPage: 4,
      },
      420: {
        perPage: 3,
      },
    },
  }).mount(window.splide.Extensions);
});
