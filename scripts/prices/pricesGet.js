"use strict";

const getPrices = async (event) => {
    try {
        const url = "http://localhost:8000/api/prices/" /* https://dark-blue-cricket-suit.cyclic.app/api/prices/ */ ;

        const response = await fetch(url,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.ok) {
            const data = await response.json();

            delete data[0]["_id"] && delete data[0]["__v"];

            const prices = [];

            data.forEach(item => {
                Object.entries(item).forEach(([itemName, itemPrice]) => {
                    const itemString = `${itemName} : ${itemPrice}`;
                    prices.push(itemString);
                });
            });

            for (let i = 0; i < prices.length; i++) {
                const table = document.getElementById('pricesTable');
                table.appendChild(createTableRow(prices[i], `pricesBox${i}`));
            };

        } else {
            console.log("Respuesta de red OK pero respuesta HTTP no OK");
        };
    } catch (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    };
};

function createTableRow(item ,checkboxId) {
    // Create the table row
    const tr = document.createElement('tr');
    tr.classList.add('border-b', 'transition-colors', 'hover:bg-muted/50', 'data-[state=selected]:bg-muted');

    // Create the table header cell
    const th = document.createElement('th');
    th.classList.add('h-12', 'px-4', 'text-left', 'align-middle', 'font-medium', 'text-muted-foreground', '[&:has([role=checkbox])]:pr-0');
    th.textContent = `${item}`;

    // Create the table data cell
    const td = document.createElement('td');
    td.classList.add('p-4', 'align-middle', '[&:has([role=checkbox])]:pr-0');

    // Create the checkbox button
    const div = document.createElement('div');
    div.classList.add('flex', 'items-center', 'ml-4');

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('role', 'checkbox');
    button.setAttribute('aria-checked', 'false');
    button.setAttribute('data-state', 'unchecked');
    button.setAttribute('value', 'on');
    button.classList.add('check-prices', 'peer', 'h-4', 'w-4', 'shrink-0', 'rounded-sm', 'border', 'border-primary', 'ring-offset-background', 'focus-visible:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-ring', 'focus-visible:ring-offset-2', 'disabled:cursor-not-allowed', 'disabled:opacity-50', 'data-[state=checked]:bg-primary', 'data-[state=checked]:text-primary-foreground');
    button.id = checkboxId;

    div.appendChild(button);
    td.appendChild(div);
    tr.appendChild(th);
    tr.appendChild(td);

    return tr;
};

getPrices();