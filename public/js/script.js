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

//sign up
const signUpBtn = document.querySelectorAll(".sign-up-btn");
const signUp = document.getElementById("sign-up");
const closeSignUpBtn = document.getElementById("close-sign-up");

function toggleSignUp() {
  signUp.classList.toggle("hidden");
}

signUpBtn.forEach((e) => {
  e.addEventListener("click", () => {
    toggleSignUp();
  });
});

closeSignUpBtn.addEventListener("click", () => {
  toggleSignUp();
});

const list = document.querySelectorAll(".list");

list.forEach((e) => {
  e.addEventListener("click", (el) => {
    console.log(el);
    el.target.children[0].classList.toggle("rotate-90");
    el.target.nextElementSibling.classList.toggle("hidden");
  });
});
