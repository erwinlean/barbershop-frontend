"use strict";

const logIn = async (event) => {
    event.preventDefault();

    try {

        const data = {
            nombre : document.querySelector("#username").value,
            password: document.querySelector("#password").value
        };  

        const name = data.nombre;

        const logEndpoint = "http://localhost:8000/api/users/login" /* https://dark-blue-cricket-suit.cyclic.app/api/users/login 2234663565 */ ;

        const response = await fetch(logEndpoint,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            console.log(data)

            localStorage.setItem("token", token);
            localStorage.setItem("name", name);

            window.location.href = "./home.html";
        } else {
            console.log("Respuesta de red OK pero respuesta HTTP no OK");
        };
    } catch (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    };
};

const loginBtn = document.getElementById("logInBtn");

loginBtn.onclick = logIn;