"use strict";

const deleteProfitBtn = document.querySelector("body > section > div > div:nth-child(3) > div:nth-child(5) > button.inline-flex.items-center.justify-center.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-50.hover\\:bg-primary\\/90.focus\\:bg-primary\\/90.h-10.px-4.py-2");

const deleteLastEntry = async () => {
    try {
        const response = await fetch(`http://localhost:8000/api/profits/deletelast`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            console.log("Último ingreso eliminado exitosamente");
            // Realiza cualquier acción adicional después de la eliminación
        } else {
            console.log("Respuesta de red OK pero respuesta HTTP no OK");
        };
    } catch (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    };

    window.location.href = window.location.href;
};

deleteProfitBtn.addEventListener("click", deleteLastEntry);