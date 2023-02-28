//mobile resonsive hamburger menu
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("menu");
const menuItem = document.querySelectorAll(".menu-item");

function menuToggle() {
  menuBtn.classList.toggle("open");
  nav.classList.toggle("flex");
  nav.classList.toggle("hidden");
}

menuBtn.addEventListener("click", () => {
  menuToggle();
});

menuItem.forEach((e) => {
  e.addEventListener("click", () => {
    menuToggle();
  });
});

//log in
const logInBtn = document.querySelectorAll(".log-in-btn");
const logIn = document.getElementById("log-in");
const closeLogInBtn = document.getElementById("close-log-in");

function toggleLogIn() {
  logIn.classList.toggle("hidden");
}

logInBtn.forEach((e) => {
  e.addEventListener("click", () => {
    toggleLogIn();
  });
});

closeLogInBtn.addEventListener("click", () => {
  toggleLogIn();
});
