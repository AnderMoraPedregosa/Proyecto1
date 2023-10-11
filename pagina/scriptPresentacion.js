let urlPlc = "http://10.0.2.100/awp/reto1/index.html";
var posicionesOcupadas = [];
document.getElementById("claro").addEventListener("click", modoClaro);
document.getElementById("oscuro").addEventListener("click", modoOscuro);
document.getElementById("oscuro").style.backgroundColor = "#00ffcc";
let audio = document.getElementById("audio")
document.getElementById("reset").addEventListener("click", resett);
document.getElementById("opciones").style.display = "block";
document.getElementById("martxa").style.display = "none";
document.getElementById("dContinuar").style.display = "none";
document.getElementById("mensaje").textContent = "Espere...";

var elemento = document.getElementById('chocolate');
var transformacionActual = window.getComputedStyle(elemento).getPropertyValue('transform');
document.getElementById("stop").addEventListener("click", activarStop);
document.getElementById("martxa").addEventListener("click", activarMartxa);
var comprobarEstado = null;
var modoManual = false;
var fetchAutomaticoActivo = null;
var posActual = '0';
var encendido = false;

let contadorNegro = parseInt(localStorage.getItem('contadorNegro')) || 0;
let contadorBlanco = parseInt(localStorage.getItem('contadorBlanco')) || 0;


function modoClaro() {
    try {
        document.body.style.backgroundColor = "white"
        document.getElementById("oscuro").style.backgroundColor = "grey";
        document.getElementById("barra-derecha").style.backgroundColor = "darkgrey"
        document.getElementById("barra-izquierda").style.backgroundColor = "darkgrey"
        document.getElementById("contenedor").style.backgroundColor = "lightgrey"
        document.body.style.color = "black"
        document.getElementById("claro").style.backgroundColor = "yellow";
    } catch (error) {
        console.log(error);
    }
}
//opcion pantalla oscura
function modoOscuro() {
    try {
        document.getElementById("claro").style.backgroundColor = "grey";
        document.getElementById("oscuro").style.backgroundColor = "#00ffcc";
        document.body.style.backgroundColor = "#111"
        document.getElementById("barra-derecha").style.backgroundColor = "#333"
        document.getElementById("barra-izquierda").style.backgroundColor = "#333"
        document.getElementById("contenedor").style.backgroundColor = "#222"
        document.body.style.color = "white"
    } catch (error) {
        console.log(error);
    }
}


function reproducirAudio() {
    // Reproducir el audio
    audio.play();


}

//reset de la pagina , localStorage a 0
function resett() {

    try {
        //vaciar array
        posicionesOcupadas = [];

        encendido = false;
        reproducirAudio();
        setTimeout(() => {
            var resultado = window.confirm('Estas seguro?');
            if (resultado === true) {

                contadorNegro = 0;
                contadorBlanco = 0;
                //resetear localstorage
                localStorage.removeItem('contadorNegro');
                localStorage.removeItem('contadorBlanco');
                location.reload();
            }

        }, 200)

        //poner variables a false
        const data = new URLSearchParams();
        data.append('"DB_DATOS_DAW".automatico', '0');

        enviarDatos(urlPlc, data);

        data.append('"DB_DATOS_DAW".martxa', '0');

        enviarDatos(urlPlc, data);




    } catch (error) {
        console.log(error);
    }
}



function detenerAnimacion() {
    try {
        encendido = false;
        elemento.style.transform = 'none';
    } catch (error) {
        console.log(error);
    }
}

const radioAutomatico = document.getElementById("automatico");

radioAutomatico.addEventListener("click", function () {
    try {
        comprobarEstado = true;
        modoManual = false;
        document.getElementById("martxa").style.display = "block";
        //console.log('prueba true: ' + comprobarEstado)
        activarAutomatico();
    } catch (error) {
        console.log(error);
    }
});

function activarAutomatico() {
    try {
        comprobarEstado = true;
        modoManual = false;
        if (fetchAutomaticoActivo) {
            clearInterval(fetchAutomaticoActivo);
            fetchAutomaticoActivo = null;
        }
        fetchAutomaticoActivo = setInterval(cogerValoresAutomatico, 10000);
        document.getElementById("dContinuar").style.display = "none";
        document.getElementById("continuar").style.display = "none";

        const data = new URLSearchParams();
        data.append('"DB_DATOS_DAW".automatico', '1');
        enviarDatos(urlPlc, data);
        cogerValoresAutomatico();
        cambiarPosicionAutomatico();
        cambiarColorAutomatico();
    } catch (error) {
        console.log(error);
    }
}

var radioManual = document.getElementById("manual");

radioManual.addEventListener("click", function () {
    try {
        document.getElementById("dContinuar").style.display = "block";
        document.getElementById("continuar").style.display = "block";
        document.getElementById("martxa").style.display = "block";
        comprobarEstado = false;
        if (encendido) {
            modoManual = true;
            //console.log('prueba false: ' + comprobarEstado)
            activarManual();
        }
    } catch (error) {
        console.log(error);
    }
});

function activarManual() {
    try {
        //console.log("estoy en activar manual");
        comprobarEstado = false;
        modoManual = true;
        if (fetchAutomaticoActivo) {
            clearInterval(fetchAutomaticoActivo);
            fetchAutomaticoActivo = null;
        }
        // console.log("estoy en activarManual(): " + modoManual)
        if (encendido) {

            const data = new URLSearchParams();
            data.append('"DB_DATOS_DAW".automatico', '0');
            enviarDatos(urlPlc, data);
        }
    } catch (error) {
        console.log(error);
    }
}

document.getElementById("continuar").addEventListener("click", function () {
    //console.log("continuar pulsado");
    //console.log("continuar pulsado");
    console.log(encendido);
    if (encendido) {
        document.getElementById("dContinuar").style.display = "none";
        document.getElementById("continuar").style.display = "none";
        cogerValoresManual();
        cambiarColorAutomatico();
        cambiarPosicionAutomatico();
    } else {
        alert("Marcha debe estar activado")
    }


});

function activarMartxa() {
    try {
        encendido = true;
        document.getElementById("martxa").style.backgroundColor = "greenyellow";
        document.getElementById("stop").style.backgroundColor = "red";
        if (comprobarEstado) {
            if (fetchAutomaticoActivo) {
                clearInterval(fetchAutomaticoActivo);
                fetchAutomaticoActivo = null;
            }
            fetchAutomaticoActivo = setInterval(cogerValoresAutomatico, 10000);
            cogerValoresAutomatico();
            cambiarPosicionAutomatico();
            cambiarColorAutomatico();
        } else {
            cogerValoresManual();
        }
        const data = new URLSearchParams();
        data.append('"DB_DATOS_DAW".martxa', '1');
        enviarDatos(urlPlc, data);
    } catch (error) {
        console.log(error);
    }
}

function activarStop() {
    try {
        detenerAnimacion();
        comprobarEstado = null;
        radioManual.checked = false;
        radioAutomatico.checked = false;
        document.getElementById("continuar").style.display = "none";
        if (fetchAutomaticoActivo) {
            clearInterval(fetchAutomaticoActivo);
            fetchAutomaticoActivo = null;
        }
        encendido = false;
        //console.log(comprobarEstado);
        document.getElementById("martxa").style.backgroundColor = "red";
        document.getElementById("stop").style.backgroundColor = "greenyellow";
        const data = new URLSearchParams();
        data.append('"DB_DATOS_DAW".martxa', '0');
        enviarDatos(urlPlc, data);
    } catch (error) {
        console.log(error);
    }
}

function cogerValoresAutomatico() {
    try {
        //console.log(comprobarEstado + ".......................");
        if (!comprobarEstado) {
            //console.log("En modo manual, no se ejecuta el fetch automático.");
            return;
        } else {
            fetch("variables.html")
                .then(response => response.text())
                .then(data => {
                    var variables = data.trim().split("\n");
                    //console.log("Variables recuperadas:", variables);
                    var martxa = variables[0].trim();
                    var resett = variables[1].trim();
                    var pos = variables[2].trim();
                    var contadorNegro = variables[3].trim();
                    var contadorBlanco = variables[4].trim();
                    var automatico = variables[5].trim();
                    var color = variables[6].trim();
                    var posicion = "a" + pos;
                    posActual = posicion;
                    //console.log(posicionesOcupadas, " ", posActual);
                    // console.log(comprobarPosiciones(posicionesOcupadas))
                    if (encendido) {
                        if (!comprobarPosiciones(posicionesOcupadas, posActual)) {
                            posicionesOcupadas.push(posActual);
                            cambiarImagen(color);
                            moverElemento(color, martxa, posicion);
                            sumarContador(color);
                            guardarContador();
                            cambiarPosicionAutomatico();
                            cambiarColorAutomatico();
                        }
                    } else{
                        alert("Marcha debe estar activado")
                    }

                    /*
                    console.log("Posición actual: " + posicion);
                    console.log("Color: " + color);
                    console.log("martxa: " + martxa);
                    console.log("automatico: " + automatico);
                    console.log("contador blanco: " + contadorBlanco);
                    console.log("contador negro: " + contadorNegro);
                    */
                })
                .catch(error => {
                    console.error("Error en la solicitud: ", error);
                });
        }
    } catch (error) {
        console.log(error);
    }
}

function cogerValoresManual() {
    try {
        fetch("variables.html")
            .then(response => response.text())
            .then(data => {
                var variables = data.trim().split("\n");
                //console.log("Variables recuperadas:", variables);
                var martxa = variables[0].trim();
                var resett = variables[1].trim();
                var pos = variables[2].trim();
                var contadorNegro = variables[3].trim();
                var contadorBlanco = variables[4].trim();
                var automatico = variables[5].trim();
                var color = variables[6].trim();
                var posicion = "a" + pos;
                /*
                console.log("Posición actual: " + posicion);
                console.log("Color: " + color);
                console.log("martxa: " + martxa);
                console.log("automatico: " + automatico);
                console.log("contador blanco: " + contadorBlanco);
                console.log("contador negro: " + contadorNegro);
                */
                if (comprobarEstado !== null) {
                    comprobar(color, martxa, automatico, posicion);
                    posActual = posicion;
                    if (!comprobarPosiciones(posicionesOcupadas, posActual)) {
                        posicionesOcupadas.push(posActual);
                        cambiarImagen(color);
                        moverElemento(color, martxa, posicion);
                        sumarContador(color);
                        guardarContador();
                    } else {
                        radioManual.checked = false;
                        alert("Casilla ocupada por otro chocolate!")

                    }
                }
            })
            .catch(error => {
                console.error("Error en la solicitud: ", error);
            });
    } catch (error) {
        console.log(error);
    }
}

function comprobarPosiciones(lista, posicion) {
    return lista.includes(posicion);
}

function comprobar(color, martxa, automatico, posicion) {
    try {
        if (color === '2' || martxa === '0') {
            document.getElementById("mensaje").style.color = "white";
            //console.log("no he salido");
            document.getElementById("mensaje").style.display = "block";
            document.getElementById("dContinuar").style.display = "none";
        } else {
            if (automatico === '1') {
                document.getElementById("mensaje").style.display = "none";
                document.getElementById("dContinuar").style.display = "none";
                //console.log("he salido");
                //console.log(comprobarEstado);
                sumarContador(color);
                guardarContador();
            } else {
                //console.log("manual");
                //console.log('estoy en el else del comprobar: ' + comprobarEstado);
                //document.getElementById("continuar").style.display = "block";
                document.getElementById("mensaje").style.display = "block";
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function cambiarPosicionAutomatico() {
    let posRandom;
    do {
        posRandom = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
        posActual = "a" + posRandom;
        //console.log("prueba do while");

    } while (posicionesOcupadas.includes(posActual));
    const data = new URLSearchParams();
    data.append('"DB_DATOS_DAW".color', Math.floor(Math.random() * 2));
    data.append('"DB_DATOS_DAW".posicion', posRandom);
    enviarDatos(urlPlc, data);
}

function cambiarImagen(color) {
    try {
        if (color === '1') {
            document.getElementById("chocolate").style.backgroundImage = "url('imagenes/cn.png')";
            document.getElementById("chocolate").style.height = '10em';
            document.getElementById("chocolate").style.width = '10em';
        } else {
            document.getElementById("chocolate").style.backgroundImage = "url('imagenes/cb.png')";
            document.getElementById("chocolate").style.height = '5em';
            document.getElementById("chocolate").style.width = '5em';
        }
    } catch (error) {
        console.log(error);
    }
}

function enviarDatos(url, data) {
    try {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error de red');
                }
                const contentType = response.headers.get('Content-Type');
                return contentType.includes('application/json') ? response.json() : response.text();
            })
            .catch((error) => {
                console.error('Fetch Error:', error);
            });
    } catch (error) {
        console.log(error);
    }
}

function moverElemento(color, martxa, posicion) {
    try {
        if (martxa === '1') {
            //console.log("pos: " + posicion);
            // console.log("actual: " + posActual);

            document.getElementById("mensaje").textContent = "Moviendo...";

            // console.log("moverElemento: color = " + color + " posicion = " + posicion);

            // Obtiene referencias a los elementos relevantes
            const chocolate = document.getElementById("chocolate");
            const divObjetivo = document.querySelector(`.tabla-chocolates .${posicion}`);

            // Obtiene dimensiones y posiciones de los elementos
            const rectChoco = chocolate.getBoundingClientRect();
            const rectObjetivo = divObjetivo.getBoundingClientRect();
            const distanciaX = rectObjetivo.left + (rectObjetivo.width / 2) - (rectChoco.width / 2) - rectChoco.left;
            const distanciaY = rectObjetivo.top + (rectObjetivo.height / 2) - (rectChoco.height / 2) - rectChoco.top;

            //console.log("[moverElemento()]: distanciaX = " + distanciaX + " distanciaY =  " + distanciaY);

            // Aplica una transformación CSS para mover el elemento
            chocolate.style.transform = `translate(${distanciaX}px, ${distanciaY}px)`;

            if (color === '1') {
                divObjetivo.style.backgroundColor = "#804000";
            } else {
                divObjetivo.style.backgroundColor = "white";
                divObjetivo.style.color = "black";
            }

            // console.log("acabado");

            // Después de 4 segundos, restaura la posición original del chocolate
            setTimeout(() => {
                chocolate.style.transform = `translate(0, 0)`;
                document.getElementById("mensaje").textContent = "Espere...";
            }, 4000);

            document.getElementById("dContinuar").style.display = "none";
            document.getElementById("continuar").style.display = "none";

            // Desmarca el radio button con el id "radioManual"
            radioManual.checked = false;
        }
    } catch (error) {
        console.log(error)
    }
}


function cambiarColorAutomatico() {
    const data = new URLSearchParams();

    colorRandom = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
    data.append('"DB_DATOS_DAW".color', colorRandom);

    enviarDatos(urlPlc, data);
}
function cambiarImagen(color) {
    try {
        if (color === '1') {
            document.getElementById("chocolate").style.backgroundImage = "url('imagenes/cn.png')";
            document.getElementById("chocolate").style.height = '10em';
            document.getElementById("chocolate").style.width = '10em';
        } else {
            document.getElementById("chocolate").style.backgroundImage = "url('imagenes/cb.png')";
            document.getElementById("chocolate").style.height = '5em';
            document.getElementById("chocolate").style.width = '5em';
        }
    } catch (error) {
        console.log(error);
    }
}

function enviarDatos(url, data) {
    try {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error de red');
                }
                const contentType = response.headers.get('Content-Type');
                return contentType.includes('application/json') ? response.json() : response.text();
            })
            .catch((error) => {
                console.error('Fetch Error:', error);
            });
    } catch (error) {
        console.log(error);
    }
}

function sumarContador(color) {
    if (color === '1') {
        contadorNegro++;
    } else {
        contadorBlanco++;
    }
}

function guardarContador() {
    localStorage.setItem('contadorNegro', contadorNegro);
    localStorage.setItem('contadorBlanco', contadorBlanco);
}



document.addEventListener('DOMContentLoaded', function () {
    // Crear un nuevo gráfico de barras con colores azul y rojo
    const ctx = document.getElementById('miGrafico').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Azul (contadorBlanco)', 'Rojo (contadorNegro)'],
            datasets: [{
                label: 'Contador de Colores',
                data: [contadorBlanco, contadorNegro], // Utiliza las variables correctas
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)', // Azul (transparente)
                    'rgba(255, 99, 132, 0.2)' // Rojo (transparente)
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)', // Azul
                    'rgba(255, 99, 132, 1)' // Rojo
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});