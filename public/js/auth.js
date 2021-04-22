const authSwitchLinks = document.querySelectorAll(".switch");
const authModals = document.querySelectorAll(".auth .modal");
const authWrapper = document.querySelector(".auth");
const registerForm = document.querySelector(".register");
const loginForm = document.querySelector(".login");
const signoutForm = document.querySelector(".sign-out");

//toggle auth modals
authSwitchLinks.forEach((link) => {
    link.addEventListener("click", () => {
        console.log("test link");
        authModals.forEach((modal) => {
            modal.classList.toggle("active");
        });
    });
});

// register form
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = registerForm.email.value;
    const password = registerForm.password.value;

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
            console.log("resgistered", user);
            registerForm.reset();
        })
        .catch((error) => {
            registerForm.querySelector(".error").textContent = error.message;
        });
});

//login form
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
            console.log("logged in", user);
            loginForm.reset();
        })
        .catch((error) => {
            loginForm.querySelector(".error").textContent = error.message;
        });
});

// sign out
signoutForm.addEventListener("click", () => {
    firebase
        .auth()
        .signOut()
        .then(() => {});
});

// auth listener
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        authWrapper.classList.remove("open");
        authModals.forEach((modal) => {
            modal.classList.remove("active");
        });
    } else {
        authWrapper.classList.add("open");
        authModals[0].classList.add("active");
    }
});
