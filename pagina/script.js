// script.js
document.getElementById("claro").addEventListener("click", modoClaro)
document.getElementById("oscuro").addEventListener("click", modoOscuro)
document.getElementById("oscuro").style.backgroundColor = "#00ffcc";

document.getElementById("marcha").addEventListener("click", moverElemento)
document.getElementById("reset").addEventListener("click", reset)

/*
   let mensaje = document.createElement('p');
    mensaje.textContent("Maquina en marcha, espere a que coja el chocolate");
    let derecha = document.getElementById("barra-derecha");
    derecha.appendChild(mensaje);
*/ 

var marcha;
var tipo;


function modoClaro(){
        document.body.style.backgroundColor = "white"
        document.getElementById("oscuro").style.backgroundColor = "grey";
        document.getElementById("barra-derecha").style.backgroundColor = "darkgrey"
        document.getElementById("barra-izquierda").style.backgroundColor = "darkgrey"
        document.getElementById("contenedor").style.backgroundColor = "lightgrey"
        document.body.style.color = "black"
        document.getElementById("claro").style.backgroundColor = "yellow";  
}

function modoOscuro(){
    document.getElementById("claro").style.backgroundColor = "grey";
    document.getElementById("oscuro").style.backgroundColor = "#00ffcc";
    document.body.style.backgroundColor = "#111"
    document.getElementById("barra-derecha").style.backgroundColor = "#333"
    document.getElementById("barra-izquierda").style.backgroundColor = "#333"
    document.getElementById("contenedor").style.backgroundColor = "#222"
    document.body.style.color = "white"
}

function reset(){
    location.reload();
}

function moverElemento() {
 

    const chocolate = document.getElementById("chocolate");
    const posicion = "a24"/* Aquí deberías obtener el valor de mis_datos.posicion */;

    // Obtener el div objetivo
    const divObjetivo = document.querySelector(`.tabla-chocolates .${posicion}`);
  
    const rectChoco = chocolate.getBoundingClientRect();
    const rectObjetivo = divObjetivo.getBoundingClientRect();

    // Calcular la distancia
    const distanciaX = rectObjetivo.left + (rectObjetivo.width / 2) - (rectChoco.width / 2) - rectChoco.left;
    const distanciaY = rectObjetivo.top + (rectObjetivo.height / 2) - (rectChoco.height / 2) - rectChoco.top;

    // Mover el chocolate al centro del objetivo
    chocolate.style.transform = `translate(${distanciaX}px, ${distanciaY}px)`;

    //cambiar color fondo, 1 blanco 0 negro

    tipo = 1;

    if(tipo === 1){
        divObjetivo.style.backgroundColor = "#804000";
    }
    else{
        divObjetivo.style.backgroundColor = "white";
    }

    setTimeout(() => {
        // Regresar el círculo al principio
        chocolate.style.transform = `translate(0, 0)`;
    }, 2500)

}