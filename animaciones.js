const camion = document.getElementById('camion-de-carga');

const selectAnimacion = document.getElementById('select-animacion');

const botonAnimacion = document.getElementById('mostrar-animacion');

botonAnimacion.addEventListener('click' , async () =>{
    console.log(selectAnimacion.value);
    if(selectAnimacion.value == "0"){
        animacionRechazo();
    }
    if(selectAnimacion.value == "1"){
        animacionAceptado();
    }
    if(selectAnimacion.value == "2"){
        animacionLimpieza();
    }
});



function animacionRechazo(){
    console.log("se animará el rechazo");
}

function animacionAceptado(){
    console.log("se animará una aceptación");
}

function animacionLimpieza(){
    console.log("se animará un camino distinto de aceptación");
}