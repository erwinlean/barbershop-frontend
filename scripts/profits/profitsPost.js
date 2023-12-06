"use strict";

const newProfit = document.querySelector("body > section > div > div:nth-child(3) > div:nth-child(5) > input");
const createProfitBtn = document.querySelector("body > section > div > div:nth-child(3) > div:nth-child(5) > button.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.hover\\:bg-destructive\\/90.focus\\:bg-destructive\\/90.h-10.px-4.py-2");

const createNewProfit = async () => {
    try {
        const data = {
            entries: newProfit.value, 
            name: localStorage.getItem("name")
        };

        const response = await fetch("http://localhost:8000/api/profits/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log("Nuevo profit creado exitosamente");
        } else {
            console.log("Respuesta de red OK pero respuesta HTTP no OK");
        }
    } catch (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    };

    window.location.href = window.location.href;
};

createProfitBtn.addEventListener("click", createNewProfit);