// script.js
document.getElementById("claro").addEventListener("click", modoClaro);
document.getElementById("oscuro").addEventListener("click", modoOscuro);
document.getElementById("oscuro").style.backgroundColor = "#00ffcc";

document.getElementById("reset").addEventListener("click", resett);

document.getElementById("automatico").addEventListener("click", opciones);
document.getElementById("manual").addEventListener("click", opciones);

//stop
var elemento = document.getElementById('chocolate'); // Reemplaza 'miElemento' con el ID de tu elemento

document.getElementById("stop").addEventListener("click", detenerAnimacion);

//variable global, valor transformacion actual
var transformacionActual = window.getComputedStyle(elemento).getPropertyValue('transform');

//manual

var boton = document.createElement("button");
boton.id = "continuar"; // Establece un ID
boton.classList.add("bContinuar"); // Agrega una clase CSS

document.getElementById("dContinuar").appendChild(boton); // Agrega el botón al cuerpo del documento

//document.getElementById("continuar").style.display = "none"; // Oculta el botón por ID


//GRAFICO
// Recuperar contadores de localStorage o inicializarlos si no existen
let contadorNegro = parseInt(localStorage.getItem('contadorNegro')) || 0;
let contadorBlanco = parseInt(localStorage.getItem('contadorBlanco')) || 0;


function detenerAnimacion() {
	elemento.style.transform = 'none';
}

//POST

document.getElementById("martxa").addEventListener("click", activarMartxa);
document.getElementById("stop").addEventListener("click", activarStop);

const radioAutomatico = document.getElementById("automatico");

radioAutomatico.addEventListener("change", function() {
	activarAutomatico();
});

const radioManual = document.getElementById("manual");

radioManual.addEventListener("change", function() {
	activarManual();
});


function moverElemento(color, posicion) {
	console.log("moverElemento: color = "+color+" posicion = "+posicion);
	const chocolate = document.getElementById("chocolate");

	// Obtener el div objetivo
	const divObjetivo = document.querySelector(`.tabla-chocolates .${posicion}`);

	const rectChoco = chocolate.getBoundingClientRect();
	const rectObjetivo = divObjetivo.getBoundingClientRect();

	// Calcular la distancia
	const distanciaX = rectObjetivo.left + (rectObjetivo.width / 2) - (rectChoco.width / 2) - rectChoco.left;
	const distanciaY = rectObjetivo.top + (rectObjetivo.height / 2) - (rectChoco.height / 2) - rectChoco.top;

	console.log("[moverElemento()]: distanciaX = " + distanciaX + " distanciaY =  " + distanciaY);
	// Mover el chocolate al centro del objetivo
	chocolate.style.transform = `translate(${distanciaX}px, ${distanciaY}px)`;

	//cambiar color fondo, 1 blanco 0 negro
	if (color === '1') {
		divObjetivo.style.backgroundColor = "#804000";

	}
	else {
		divObjetivo.style.backgroundColor = "white";
		divObjetivo.style.color = "black";
	}
	
	console.log("acabado")

	setTimeout(() => {
		// Regresar el círculo al principio
		chocolate.style.transform = `translate(0, 0)`;
	}, 10000)
	

}
		
/*
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

				//comprobaciones
				console.log("Posición actual: " + posicion);
				console.log("Color: " + color);
				console.log("martxa: " + martxa);
				console.log("automatico: " + automatico);
				console.log("contador blanco: " + contadorBlanco);
				console.log("contador negro: " + contadorNegro);


				comprobar(color, martxa, automatico, posicion);
				
				

			})
			.catch(error => {
				console.error("Error en la solicitud: ", error);
			});
	}, 18000);
	
});
*/

function cogerValores(){
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

				//comprobaciones
				console.log("Posición actual: " + posicion);
				console.log("Color: " + color);
				console.log("martxa: " + martxa);
				console.log("automatico: " + automatico);
				console.log("contador blanco: " + contadorBlanco);
				console.log("contador negro: " + contadorNegro);


				comprobar(color, martxa, automatico, posicion);
				
				

			})
			.catch(error => {
				console.error("Error en la solicitud: ", error);
			});
	}, 18000);
}

function comprobar(color, martxa, automatico, posicion){

	if (color === '2' || martxa === '0')  //0 = false
	{
		document.getElementById("mensaje").textContent = "Espere...";
		document.getElementById("mensaje").style.color = "white";
		console.log("no he salido");
		document.getElementById("mensaje").style.display = "block";
		document.getElementById("continuar").style.display = "none";


	}

	else {
		if (automatico === '1') { // 1 = true
			document.getElementById("mensaje").style.display = "none";
			document.getElementById("continuar").style.display = "none";

			console.log("he salido");
			cambiarImagen(color);
			moverElemento(color, posicion);
			
			//GRAFICO
			sumarContador(color);
			guardarContador();

		}


		else {
			console.log("manual");
			document.getElementById("continuar").style.display = "block";

			document.getElementById("continuar").addEventListener("click", function() {
			cambiarImagen(color); 
			moverElemento(color, posicion); 
		});
			//GRAFICO
			document.getElementById("continuar").addEventListener("click", function(){
				sumarContador(color);
			});
			document.getElementById("continuar").addEventListener("click", guardarContador);
			
		}
	}
}




function activarMartxa() {
	cogerValores();
	
    const data = new URLSearchParams();
    data.append('"DB_DATOS_DAW".martxa', '1');
    enviarDatos("http://10.0.2.100/awp/reto1/index.html", data);
}

function activarStop() {
    const data = new URLSearchParams();
    data.append('"DB_DATOS_DAW".martxa', '0');
    enviarDatos("http://10.0.2.100/awp/reto1/index.html", data);
}

function activarAutomatico() {
		document.getElementById("continuar").style.display = "none"; // Oculta el botón por ID
    const data = new URLSearchParams();
    data.append('"DB_DATOS_DAW".automatico', '1');
    enviarDatos("http://10.0.2.100/awp/reto1/index.html", data);
}

function activarManual() {
	//mostrar boton
		document.getElementById("continuar").style.display = "block"; // Oculta el botón por ID
    const data = new URLSearchParams();
    data.append('"DB_DATOS_DAW".automatico', '0');
    enviarDatos("http://10.0.2.100/awp/reto1/index.html", data);
}


	function cambiarImagen(color) {
		if (color === '1') {
			document.getElementById("chocolate").style.backgroundImage = "url('imagenes/cn.png')";

			document.getElementById("chocolate").style.height = '10em';
			document.getElementById("chocolate").style.width = '10em';

		}
		else {
			document.getElementById("chocolate").style.backgroundImage = "url('imagenes/cb.png')";
			document.getElementById("chocolate").style.height = '5em';
			document.getElementById("chocolate").style.width = '5em';
		}

	}
	
	function enviarDatos(url, data) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const contentType = response.headers.get('Content-Type');
        return contentType.includes('application/json') ? response.json() : response.text();
    })
    .catch((error) => {
        console.error('Fetch Error:', error);
    });
}

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

function resett() {
	location.reload();
	contadorNegro = 0;
	contadorBlanco = 0;
}

	//GRAFICO
			function sumarContador(color){
				if (color === '1') {
					contadorNegro++;
				} else if (color === '0') {
					contadorBlanco++;
				}
				}
				function guardarContador(){
				localStorage.setItem('contadorNegro', contadorNegro);
				localStorage.setItem('contadorBlanco', contadorBlanco);
				}


document.addEventListener('DOMContentLoaded', function() {
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

