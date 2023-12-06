"use strict";

let checkedBox; let data;
function checkboxes (){

    let data = {
        corte: {
            element: document.getElementById('pricesBox0'),
            key: "corte"
        },
        corteYBarba: {
            element: document.getElementById('pricesBox1'),
            key: "corteYBarba"
        },
        barba: {
            element: document.getElementById('pricesBox2'),
            key: "barba",
        },
        claritos: {
            element: document.getElementById('pricesBox3'),
            key: "claritos"
        },
        colorGlobal: {
            element: document.getElementById('pricesBox4'),
            key: "colorGlobal"
        },
        nutricion: {
            element: document.getElementById('pricesBox5'),
            key: "nutricion"
        }
    };

    Object.values(data).forEach(item => {
        item.element.addEventListener("click", (() => {
            checkedBox = item;

            if(checkedBox){
                checkedBox.element.classList.toggle('checked');
            };
        }));
    });
};


const updatePrices = async (event) => {
    event.preventDefault();

    try {

        if(checkedBox){
            checkedBox.element.classList.toggle('checked');
        };

        // Verificar que pricesBox fue seleccionado en el checkBox.id y en base a esto sele
        const newPrice = document.querySelector("body > section > div > div.grid.gap-6.lg\\:grid-cols-3.lg\\:gap-12 > div > input").value;

        const requestData = {
            [checkedBox.key]: newPrice
        };

        const url = "http://localhost:8000/api/prices/65589093f2602c78c0114db0" /* https://dark-blue-cricket-suit.cyclic.app/api/prices/65589093f2602c78c0114db0 */ ;

        const response = await fetch(url,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(requestData),
        });

        if (response.ok) {
            const data = await response.json();

            console.log(data);

            checkedBox.element.classList.toggle('unChecked');

            document.querySelector("#pricesTable").innerHTML = "";
            getPrices();
        } else {
            console.log("Respuesta de red OK pero respuesta HTTP no OK");
        };
    } catch (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    };
};

const pricesUpdate = document.querySelector("body > section > div > div > div:nth-child(1) > button");

pricesUpdate.addEventListener("click", updatePrices);

setTimeout(() => {
    checkboxes();
}, 1500);