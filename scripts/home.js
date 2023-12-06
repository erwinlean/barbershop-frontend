"use strict";

// Verify token on page load
window.onload = () => {
    const token = window.localStorage.getItem("token");

    if (!token) {
        window.location.replace("login.html");
    };
};

// Log out function
setTimeout(() => {
    document.querySelector("#exit").addEventListener("click", (event) => {
        event.preventDefault();
    
        localStorage.clear();
    
        window.location.href = "login.html";
    });
}, 1000);