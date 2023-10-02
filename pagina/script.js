// script.js
document.getElementById("claro").addEventListener("click", modoClaro);
document.getElementById("oscuro").addEventListener("click", modoOscuro);
document.getElementById("oscuro").style.backgroundColor = "#00ffcc";

document.getElementById("reset").addEventListener("click", reset);

document.getElementById("automatico").addEventListener("click", opciones);
document.getElementById("manual").addEventListener("click", opciones);


document.addEventListener("DOMContentLoaded", function () {
    setInterval(function () {
        fetch("variables.html")
            .then(response => response.text())
            .then(data => {
                var variables = data.trim().split("\n");
                console.log("Variables recuperadas:", variables);

                // Usar las variables almacenadas en el array
                var martxa = variables[0].trim();
                var resett = variables[1].trim();
                var pos = variables[2].trim();
                var contadorNegro = variables[3].trim();
                var contadorBlanco = variables[4].trim();
                var automatico = variables[5].trim();
                var color = variables[6].trim();

                var posicion = "a" + pos;


                console.log("Posición actual: " + posicion);
                console.log("Color: " + color);
                console.log("martxa: " + martxa);
                console.log("automatico: " + automatico);





                if (color === '2' || martxa === '0') { //0 = false
                    document.getElementById("mensaje").textContent = "Espere...";
                    document.getElementById("mensaje").style.color = "white";
                    console.log("no he salido");
                    document.getElementById("mensaje").style.display = "block";

                }
                else {
                    if (automatico === '1') { // 1 = true
                        document.getElementById("mensaje").style.display = "none";

                        console.log("he salido");
                        moverElemento();
                    }
                    else {
                        console.log("manual");
                        //cambiar
                        //moverElemento();
                    }
                }


                //AUTOMATICO Y MANUAL

                document.getElementById("automatico").addEventListener("click", opciones);
                document.getElementById("manual").addEventListener("click", opciones);

                function opciones(e) {
                    if (e.target.id = "automatico") {
                        automatico = '1';
                    } else {
                        if (e.target.id = "martxa") {
                            marcha = '1';
                        } else {
                            automatico = '0';
                        }
                    }
                }


                document.getElementById("marcha").addEventListener("click", opciones);


                function moverElemento() {
                    martxa = true;
                    const chocolate = document.getElementById("chocolate");

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


                    if (color === '1') {
                        divObjetivo.style.backgroundColor = "#804000";
                        numChocoNegro = +1;
                    }
                    else {
                        divObjetivo.style.backgroundColor = "white";
                        divObjetivo.style.color = "black";

                        numChocoBlanco = +1;
                    }

                    setTimeout(() => {
                        // Regresar el círculo al principio
                        chocolate.style.transform = `translate(0, 0)`;
                    }, 10000)
                }
            })
            .catch(error => {
                console.error("Error en la solicitud: ", error);
            });
    }, 18000);
});

//var pos = JSON.stringify(posicion);







/*
   let mensaje = document.createElement('p');
    mensaje.textContent("Maquina en marcha, espere a que coja el chocolate");
    let derecha = document.getElementById("barra-derecha");
    derecha.appendChild(mensaje);
*/

var marcha;
var tipo;
var numChocoBlanco = 0;
var numChocoNegro = 0;


function modoClaro() {
    document.body.style.backgroundColor = "white"
    document.getElementById("oscuro").style.backgroundColor = "grey";
    document.getElementById("barra-derecha").style.backgroundColor = "darkgrey"
    document.getElementById("barra-izquierda").style.backgroundColor = "darkgrey"
    document.getElementById("contenedor").style.backgroundColor = "lightgrey"
    document.body.style.color = "black"
    document.getElementById("claro").style.backgroundColor = "yellow";
}

function modoOscuro() {
    document.getElementById("claro").style.backgroundColor = "grey";
    document.getElementById("oscuro").style.backgroundColor = "#00ffcc";
    document.body.style.backgroundColor = "#111"
    document.getElementById("barra-derecha").style.backgroundColor = "#333"
    document.getElementById("barra-izquierda").style.backgroundColor = "#333"
    document.getElementById("contenedor").style.backgroundColor = "#222"
    document.body.style.color = "white"
}

function reset() {
    location.reload();
}






