// Referencias a los botones
const countryBtn = document.getElementById('countryBtn');
const cityBtn = document.getElementById('cityBtn');
const countryLanguageBtn = document.getElementById('countryLanguageBtn');
const searchCountryBtn = document.getElementById('searchCountryBtn');

// Referencias a la tabla
const recordsTable = document.getElementById('records');

// Mostrar registros de la tabla "country"
// Ajusta las rutas para que apunten a '../getRecords.php'

// Limpiar los registros
function clearRecords() {
    recordsTable.innerHTML = '';
}
// Buscar país por nombre y mostrar los registros de las tres tablas relacionadas
searchCountryBtn.addEventListener('click', () => {
    const countryName = prompt("Ingresa el nombre del país que deseas buscar:");
    if (!countryName) {
        alert("Debes ingresar un nombre de país.");
        return;
    }

    clearRecords();
    axios.get(`../getRecords.php?search=${countryName}`)
        .then(response => {
            const data = response.data;
            console.log(data);
            populateTable(data.country, ['Code', 'Name', 'Continent', 'Region', 'Population'], 'Países');
            populateTable(data.city, ['ID', 'Name', 'CountryCode', 'District', 'Population'], 'Ciudades');
            populateTable(data.countrylanguage, ['CountryCode', 'Language', 'IsOfficial', 'Percentage'], 'Idiomas');
        })
        .catch(error => {
            console.error(error);
        });
});


// Mostrar registros de la tabla "country"
// Mostrar registros de la tabla country
countryBtn.addEventListener('click', () => {
 
    clearRecords();
    axios.get('../getRecords.php?table=country')
        .then(response => {
            console.log(response.data);  // Verifica la estructura de los datos en la consola
            const data = Array.isArray(response.data) ? response.data : response.data.country || [];
            populateTable(data, ['Code', 'Name', 'Continent', 'Region', 'Population'], 'Países');
        })
        .catch(error => {
            console.error(error);
        });
});

// Mostrar registros de la tabla city
cityBtn.addEventListener('click', () => {

    clearRecords();
    axios.get('../getRecords.php?table=city')
        .then(response => {
            console.log(response.data);  // Verifica la estructura de los datos en la consola
            const data = Array.isArray(response.data) ? response.data : response.data.city || [];
            populateTable(data, ['ID', 'Name', 'CountryCode', 'District', 'Population'], 'Ciudades');
        })
        .catch(error => {
            console.error(error);
        });
});

// Mostrar registros de la tabla countrylanguage
countryLanguageBtn.addEventListener('click', () => {

    clearRecords();
    axios.get('../getRecords.php?table=countrylanguage')
        .then(response => {
            console.log(response.data);  // Verifica la estructura de los datos en la consola
            const data = Array.isArray(response.data) ? response.data : response.data.countrylanguage || [];
            populateTable(data, ['CountryCode', 'Language', 'IsOfficial', 'Percentage'], 'Lenguajes por País');
        })
        .catch(error => {
            console.error(error);
        });
});

// tabla con los datos 
function populateTable(data, columns, tableTitle = '') {
    // Limpiar el contenido anterior del cuerpo de la tabla
    recordsTable.innerHTML = '';
    if (tableTitle) {
        const titleRow = document.createElement('tr');
        const titleCell = document.createElement('td');
        titleCell.colSpan = columns.length;
        titleCell.innerHTML = `<strong>${tableTitle}</strong>`;
        recordsTable.appendChild(titleRow);
        titleRow.appendChild(titleCell);
    }
    // Crear fila de encabezados
    const headerRow = document.createElement('tr');
    columns.forEach(column => {
        const th = document.createElement('th');
        th.textContent = column;
        headerRow.appendChild(th);
    });
    recordsTable.appendChild(headerRow);
    // Insertar los datos en la tabla
    data.forEach(item => {
        const row = document.createElement('tr');
        columns.forEach(col => {
            const td = document.createElement('td');
            td.textContent = item[col] !== undefined && item[col] !== null ? item[col] : 'N/A';  // Manejar valores nulos
            row.appendChild(td);
        });
        recordsTable.appendChild(row);
    });
}



