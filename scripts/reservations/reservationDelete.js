"use strict";

let reservationBoxesChecked;let email;

function checkResboxes() {
    const reservationBoxes = document.querySelectorAll('.reservations');

    reservationBoxes.forEach((item) => {
        item.addEventListener("click", () => {
            const emailElement = item.closest('tr').querySelector('.p-4:nth-child(3)');

            email = emailElement.textContent;
        });
    });
};

const deleteReservation = async (event) => {
    event.preventDefault();

    try {

        if(reservationBoxesChecked){
            reservationBoxesChecked.element.classList.toggle('checked');
        };

        const url = "http://localhost:8000/api/reservations/deleteReservation" /* https://dark-blue-cricket-suit.cyclic.app/api/prices/65589093f2602c78c0114db0 */ ;

        const response = await fetch(url,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({email}),
        });

        if (response.ok) {
            const data = await response.json();

            reservationBoxesChecked.element.classList.toggle('unChecked');

        } else {
            console.log("Respuesta de red OK pero respuesta HTTP no OK");
        };
    } catch (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    };

    window.location.href = window.location.href;
};

const deleteReservations = document.querySelector("body > section > div > div:nth-child(2) > button");

deleteReservations.addEventListener("click", deleteReservation);

setTimeout(() => {
    checkResboxes();
}, 1500);