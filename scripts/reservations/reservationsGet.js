"use strict";

const getreservations = async () => {
    try {
        const url = "http://localhost:8000/api/reservations/";
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.ok) {
            const data = await response.json();

            const reservationsTable = document.getElementById("reservationsTable");
            let reservationId = 0;

            for (const person in data) {
                if (data.hasOwnProperty(person)) {
                    const reservation = data[person][0];

                    const row = document.createElement("tr");
                    row.classList.add("border-b", "transition-colors", "hover:bg-muted/50", "data-[state=selected]:bg-muted");

                    const nameCell = createTableCell(person, "p-4 align-middle [&:has([role=checkbox])]:pr-0");
                    const phoneCell = createTableCell(reservation.celphone, "p-4 align-middle [&:has([role=checkbox])]:pr-0");
                    const emailCell = createTableCell(reservation.email, "p-4 align-middle [&:has([role=checkbox])]:pr-0");
                    const dayCell = createTableCell(reservation.day, "p-4 align-middle [&:has([role=checkbox])]:pr-0");
                    const hourCell = createTableCell(reservation.hour, "p-4 align-middle [&:has([role=checkbox])]:pr-0");

                    const checkboxCell = document.createElement("td");
                    checkboxCell.classList.add("p-4", "align-middle", "[&:has([role=checkbox])]:pr-0");
                    const checkboxDiv = document.createElement("div");
                    checkboxDiv.classList.add("flex", "items-center", "ml-4");

                    const checkboxButton = document.createElement("button");
                    checkboxButton.type = "button";
                    checkboxButton.role = "checkbox";
                    checkboxButton.id = `reservations${reservationId++}`
                    checkboxButton.setAttribute("aria-checked", "false");
                    checkboxButton.dataset.state = "unchecked";
                    checkboxButton.value = "on";
                    checkboxButton.classList.add(
                        "reservations", "peer", "h-4", "w-4", "shrink-0", "rounded-sm", "border", "border-primary", "ring-offset-background",
                        "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-ring", "focus-visible:ring-offset-2",
                        "disabled:cursor-not-allowed", "disabled:opacity-50", "data-[state=checked]:bg-primary", "data-[state=checked]:text-primary-foreground"
                    );

                    checkboxDiv.appendChild(checkboxButton);
                    checkboxCell.appendChild(checkboxDiv);

                    row.appendChild(nameCell);
                    row.appendChild(phoneCell);
                    row.appendChild(emailCell);
                    row.appendChild(dayCell);
                    row.appendChild(hourCell);
                    row.appendChild(checkboxCell);

                    reservationsTable.appendChild(row);
                };
            };

        } else {
            console.log("Respuesta de red OK pero respuesta HTTP no OK");
        };
    } catch (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    };
};

const createTableCell = (text, classes) => {
    const cell = document.createElement("td");
    cell.textContent = text;
    cell.className = classes;
    return cell;
};

getreservations();