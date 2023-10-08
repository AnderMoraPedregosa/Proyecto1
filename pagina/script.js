//URL para los Fetch GET y POST
urlPlc = "http://10.0.2.100/awp/reto1/index.html";

// script.js
document.getElementById("claro").addEventListener("click", modoClaro);
document.getElementById("oscuro").addEventListener("click", modoOscuro);
document.getElementById("oscuro").style.backgroundColor = "#00ffcc";

document.getElementById("reset").addEventListener("click", resett);


//mensaje espere
document.getElementById("mensaje").textContent = "Espere...";

//saber si esta en automatico o manual (sin fetch)
var modoAutomatico = null; // Inicialmente, el modo es manual
var posActual = '0';



var elemento = document.getElementById('chocolate');
//stop
document.getElementById("stop").addEventListener("click", detenerAnimacion);

//variable global, valor transformacion actual
var transformacionActual = window.getComputedStyle(elemento).getPropertyValue('transform');

//manual

/*
var boton = document.createElement("button");
boton.id = "continuar"; // Establece un ID
boton.classList.add("bContinuar"); // Agrega una clase CSS

document.getElementById("dContinuar").appendChild(boton); // Agrega el botón al div dContinuar
*/


//GRAFICO
// Recuperar contadores de localStorage o inicializarlos si no existen
let contadorNegro = parseInt(localStorage.getItem('contadorNegro')) || 0;
let contadorBlanco = parseInt(localStorage.getItem('contadorBlanco')) || 0;

//paramos animación
function detenerAnimacion() {
	try {
		elemento.style.transform = 'none';
	} catch (error) {
		console.log(error);
	}
}



document.getElementById("martxa").addEventListener("click", activarMartxa);
document.getElementById("stop").addEventListener("click", activarStop);

//cuando cambie el Radiobutton a automatico
const radioAutomatico = document.getElementById("automatico");

radioAutomatico.addEventListener("change", function () {
	try {
		activarAutomatico();
		cogerValores();
		document.getElementById("martxa").style.display = "block";

	} catch (error) {
		console.log(error);
	}
});
//cuando cambie el Radiobutton a manual

const radioManual = document.getElementById("manual");

radioManual.addEventListener("change", function () {
	document.getElementById("martxa").style.display = "block";

	try {
		activarManual();

	} catch (error) {
		console.log(error);
	}
});

//"animacion" movimiento del muffin
function moverElemento(color, posicion) {
	try {
		console.log("pos: " + posicion);
		console.log("actual: " + posActual);
		if (posActual !== posicion) {
			document.getElementById("mensaje").textContent = "Moviendo...";


			console.log("moverElemento: color = " + color + " posicion = " + posicion);
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

			posActual = posicion;


			setTimeout(() => {
				// Regresar el círculo al principio
				chocolate.style.transform = `translate(0, 0)`;
				document.getElementById("mensaje").textContent = "Espere...";

			}, 4000)



		}
	} catch (error) {
		console.log(error)
	}
}

/*
document.addEventListener("DOMContentLoaded", function () {
	try {
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
		
	} catch (error) {
		console.log(error);
	}
});
*/

//Fetch GET
function cogerValores() {
	try {
		console.log(modoAutomatico + ".......................");
		if (modoAutomatico) {

			setInterval(function () {
				fetch("variables.html")
					.then(response => response.text())
					.then(data => {
						var variables = data.trim().split("\n");
						console.log("Variables recuperadas:", variables);

						console.log("ander estuvo aqui")

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
			}, 9000);
		}
		else {
			fetch("variables.html")
				.then(response => response.text())
				.then(data => {
					var variables = data.trim().split("\n");
					console.log("Variables recuperadas:", variables);

					console.log("javi estuvo aqui")

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
		}
	} catch (error) {
		console.log(error);
	}
}
//Funcion para ver si los datos han sido recogidos
function comprobar(color, martxa, automatico, posicion) {

	try {
		if (color === '2' || martxa === '0')  //0 = false
		{
			document.getElementById("mensaje").style.color = "white";
			console.log("no he salido");
			document.getElementById("mensaje").style.display = "block";
			document.getElementById("continuar").style.display = "none";


		}

		else {
			if (modoAutomatico) { // 1 = true
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
				document.getElementById("mensaje").style.display = "block";


				document.getElementById("continuar").addEventListener("click", function () {

					cogerValores();

					cambiarImagen(color);
					moverElemento(color, posicion);
				});
				//GRAFICO
				document.getElementById("continuar").addEventListener("click", function () {
					sumarContador(color);
				});
				document.getElementById("continuar").addEventListener("click", guardarContador);

			}
		}
	} catch (error) {
		console.log(error);
	}
}



// cambia variable PLC "martxa" a True cuando se llama a esta funcion
function activarMartxa() {
	try {
		/* document.getElementById("opciones").style.display = "block"; */
		document.getElementById("martxa").style.backgroundColor = "greenyellow";
		document.getElementById("stop").style.backgroundColor = "grey";


		if (modoAutomatico === null) {
			cogerValores();

			const data = new URLSearchParams();
			data.append('"DB_DATOS_DAW".martxa', '1');
			enviarDatos(urlPlc, data);
		}

	} catch (error) {
		console.log(error);
	}
}
//cambia variable PLC "martxa" a false cuando llama a esta funcion
function activarStop() {
	try {
		console.log(modoAutomatico);
		document.getElementById("stop").style.backgroundColor = "red";
		document.getElementById("martxa").style.display = "none";



		if (modoAutomatico !== null) {
			const data = new URLSearchParams();
			data.append('"DB_DATOS_DAW".martxa', '0');
			enviarDatos(urlPlc, data);
			modoAutomatico = null;
		}
	} catch (error) {
		console.log(error);
	}
}

function activarAutomatico() {
	document.getElementById("martxa").style.display = "block";
	try {
		if (!modoAutomatico) {


			modoAutomatico = true;
			document.getElementById("continuar").style.display = "none"; // Oculta el botón por ID
			const data = new URLSearchParams();
			data.append('"DB_DATOS_DAW".automatico', '1');
			enviarDatos(urlPlc, data);
			document.getElementById("martxa").style.display = "none";

		}
	} catch (error) {
		console.log(error);
	}
}

function activarManual() {
	try {
		if (modoAutomatico) {
			modoAutomatico = false;
			//mostrar boton
			document.getElementById("continuar").style.display = "block"; // Oculta el botón por ID
			const data = new URLSearchParams();
			data.append('"DB_DATOS_DAW".automatico', '0');
			enviarDatos(urlPlc, data);
		}
	} catch (error) {
		console.log(error);
	}
}

//muffin blanco para chocolate blanco
//muffin negro para chocolate negro
function cambiarImagen(color) {
	try {
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
	} catch (error) {
		console.log(error);
	}

}
//Fetch POST
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
					throw new Error('Network response was not ok');
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
//opcion pantalla clara
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
//reset de la pagina , localStorage a 0
function resett() {
	try {
		location.reload();
		contadorNegro = 0;
		contadorBlanco = 0;
						//resetear localstorage
				//localStorage.removeItem('contadorNegro');
                //localStorage.removeItem('contadorBlanco');
	} catch (error) {
		console.log(error);
	}
}

//funcion para la variable PLC contadorNegro y contadorBlanco
function sumarContador(color) {
	try {
		if (color === '1') {
			contadorNegro++;
		} else if (color === '0') {
			contadorBlanco++;
		}
	} catch (error) {
		console.log(error);
	}
}
function guardarContador() {
	try {
		localStorage.setItem('contadorNegro', contadorNegro);
		localStorage.setItem('contadorBlanco', contadorBlanco);
	} catch (error) {
		console.log(error);
	}
}

//GRAFICO
document.addEventListener('DOMContentLoaded', function () {
	try {
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
	} catch (error) {
		console.log(error);
	}
});

