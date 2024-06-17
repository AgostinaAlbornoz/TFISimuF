const select = document.getElementById('select-informes');
const botonSimular = document.getElementById('btn-simular');
const botonMostrar = document.getElementById('mostrar-informes');
let listaCamiones = [];

document.addEventListener('DOMContentLoaded' , async () =>{
    botonMostrar.disabled = true;
});

botonSimular.addEventListener('click' , async () => {
    const inputCantidadCamiones = document.getElementById('input-cantidad-camiones');
    const inputObjetivo = document.getElementById('input-objetivo');
    const loaderContainer = document.getElementById('loader-container');
    limpiarTodo();

    loaderContainer.classList.remove('hidden');

    try {
        if (inputCantidadCamiones.value === '' || inputObjetivo.value === '') {
            listaCamiones = await llamarBack(0, 0);
        } else {
            if (inputCantidadCamiones.value && inputObjetivo.value) {
                listaCamiones = await llamarBack(inputCantidadCamiones.value, inputObjetivo.value);
            }
        }

        console.log("dias:", listaCamiones.Mes);
        agregarDiasSelect(listaCamiones.Dias);
        agregarInformeMensualSelect();
        botonMostrar.disabled = false;
    } finally {
        loaderContainer.classList.add('hidden');
    }
});

function limpiarTodo(){
    const divCardContainer = document.getElementById('div-card-container');
    divCardContainer.innerHTML = '';
    select.innerHTML = '';
    const option = document.createElement('option');
    option.value = 0;
    option.textContent = 'Seleccionar día';
    select.appendChild(option);
}

function agregarInformeMensualSelect() {
    const option = document.createElement('option');
    option.value = 31;
    option.textContent = 'Informe Mensual';
    select.appendChild(option);
}

function agregarDiasSelect(lista){
    Object.keys(lista).forEach((dia) => {
        const option = document.createElement('option');
        option.value = dia; // Usamos el día como valor
        option.textContent = `Día ${dia}`;
        select.appendChild(option);
    });
}

select.addEventListener('change', () => {
    const divCardContainer = document.getElementById('div-card-container');
    divCardContainer.innerHTML = '';
});

function asignarFuncionalidadBoton(dias) {
    const select = document.getElementById('select-informes');
    const selectedDay = select.value;
    if(selectedDay == 0) {
        alert("por favor seleccione un día o el informe mensual");
    }
    else if (selectedDay !== '') {
        const camiones = dias[selectedDay];
        camiones.forEach(camion => {
            agregarTarjetaDia(camion, selectedDay);
        });
    }
}

botonMostrar.addEventListener('click' , async () => {
    const selectedOption = select.value;
    console.log(selectedOption);

    if(listaCamiones && selectedOption != 31 && selectedOption != 0){
        console.log('entra a días');
        asignarFuncionalidadBoton(listaCamiones.Dias);
    }else if(listaCamiones && selectedOption == 31){
        console.log('entra a mes');
        agregarTarjetaMes(listaCamiones.Mes);
    }else {
        alert("error");
    }
    
});


function agregarTarjetaDia(camion , dia) {
    const divCardContainer = document.getElementById('div-card-container');
    const card = document.createElement('div');
    card.classList.add('card', 'mt-3', 'estilo-card');
    card.innerHTML = `
        <h5 class="card-header text-center estilo-card-header">Informe Día ${dia}</h5>
        <div class="card-body">
            <p class="card-text"><b>N° Camión:</b> ${camion.camion}</p>
            <p class="card-text"><b>Tipo de carga:</b> ${camion.tipo_carga}</p>
            <p class="card-text"><b>Estado:</b> ${camion.estado}</p>
            <p class="card-text"><b>% impurezas:</b> ${camion.impurezas}</p>
            <p class="card-text"><b>Peso:</b> ${camion.peso}</p>
        </div>
    `;
    divCardContainer.appendChild(card);
}

function agregarTarjetaMes(informeMensual){
    const divCardContainer = document.getElementById('div-card-container');
    const card = document.createElement('div');
    card.classList.add('card', 'mt-3', 'estilo-card-mes');
    card.innerHTML = `
        <h5 class="card-header text-center estilo-card-header-mensual">Informe Mensual</h5>
        <div class="card-body">
            <p class="card-text"><b>Objetivo:</b> ${informeMensual.objetivo}</p>
            <p class="card-text"><b>Total Acero Procesado:</b> ${informeMensual.total_acero_procesado}</p>
            <p class="card-text"><b>Total Acero Reciclado Producido:</b> ${informeMensual.total_acero_reciclado_producido}</p>
            <p class="card-text"><b>Total Acero A440 Producido:</b> ${informeMensual.total_acero_A440_producido}</p>
            <p class="card-text"><b>Total Acero A560 Producido:</b> ${informeMensual.total_acero_A560_producido}</p>
            <p class="card-text"><b>Total Acero A630 Producido:</b> ${informeMensual.total_acero_A630_producido}</p>
            <p class="card-text"><b>Lotes de Barras rectas producidos:</b> ${informeMensual.total_lotes_de_barras_rectas}</p>
            <p class="card-text"><b>Lotes de Rollos producidos:</b> ${informeMensual.total_lotes_de_rollos}</p>
        </div>
    `;
    divCardContainer.appendChild(card);
}





async function llamarBack(cantidadCamiones , objetivo) {
    const URL = `http://127.0.0.1:1234/generate_json`;
    try {
        let queryParams = [];
        if (cantidadCamiones !== 0) queryParams.push(`ce=${cantidadCamiones}`);
        if (objetivo !== 0) queryParams.push(`oa=${objetivo}`);
        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

        const response = await fetch(URL+queryString, {
            method: 'GET', // Puedes cambiar el método si necesitas POST u otro
            headers: {
                'Content-Type': 'application/json' // Ajusta los encabezados según sea necesario
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Procesa los datos según sea necesario
        return data;
    } catch (error) {
        console.error('Error al llamar a la API:', error);
    }
}


