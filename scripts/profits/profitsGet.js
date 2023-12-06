"use strict";

const getProfitsData = async () => {
    try {
        const response = await fetch("http://localhost:8000/api/profits", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);

            // Organizar los ingresos por fecha
            const organizedData = organizeProfitsByDate(data);

            // Mostrar ingresos del dia corriente
            currentDayProfits(organizedData);

            // Mostrar ingresos mensuales (separado por meses y el ingreso)
            showMonthlyProfits(organizedData);

            // Mostrar ingresos anuales (separado por anuales y el ingreso)
            showYearlyProfits(organizedData);
        } else {
            console.log("Respuesta de red OK pero respuesta HTTP no OK");
        };
    } catch (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
    };
};

// Función para organizar los ingresos por fecha
const organizeProfitsByDate = (profits) => {
    const organizedProfits = {
        day: {},
        month: {},
        year: {},
    };

    profits.forEach((profit) => {
        // Convertir la fecha al formato "YYYY-MM-DD"
        const formattedDate = profit.date.split('/').reverse().join('-');
        const date = new Date(formattedDate);

        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });

        // Por día
        const dayKey = formattedDate;
        if (!organizedProfits.day[dayKey]) {
            organizedProfits.day[dayKey] = 0;
        };
        organizedProfits.day[dayKey] += profit.entries;

        // Por mes
        if (!organizedProfits.month[month]) {
            organizedProfits.month[month] = 0;
        };
        organizedProfits.month[month] += profit.entries;

        // Por año
        if (!organizedProfits.year[year]) {
            organizedProfits.year[year] = 0;
        };
        organizedProfits.year[year] += profit.entries;
    });

    return organizedProfits;
};

// Función para mostrar los ingresos del día actual >> NOT WORKING
const currentDayProfits = (organizedProfits) => {
    const currentDate = new Date();
    const currentDayKey = currentDate.toISOString().split('T')[0];
    console.log("currentDate:", currentDate);
    console.log("currentDayKey:", currentDayKey);
    const currentDayProfit = organizedProfits.day[currentDayKey] || 0;
    console.log(currentDayProfit);

    document.querySelector("#ingresosDia").innerHTML = currentDayProfit;
};

// Función para mostrar los ingresos mensuales
const showMonthlyProfits = (organizedProfits) => {
    const tableBody = document.getElementById("tableMonthlyProfitsBody");

    for (const month in organizedProfits.month) {
        const row = tableBody.insertRow();
        const cellMonth = row.insertCell(0);
        const cellProfit = row.insertCell(1);

        cellMonth.textContent = month;
        cellProfit.textContent = organizedProfits.month[month];
    };
};

// Función para mostrar los ingresos anuales
const showYearlyProfits = (organizedProfits) => {
    const tableBody = document.getElementById("tableYearlyProfitsBody");

    for (const year in organizedProfits.year) {
        const row = tableBody.insertRow();
        const cellYear = row.insertCell(0);
        const cellProfit = row.insertCell(1);

        cellYear.textContent = year;
        cellProfit.textContent = organizedProfits.year[year];
    };
};

getProfitsData();