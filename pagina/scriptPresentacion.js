let urlPlc = "http://10.0.2.100/awp/reto1/index.html";
//modo claro y modo oscuro
document.getElementById("claro").addEventListener("click", modoClaro);
document.getElementById("oscuro").addEventListener("click", modoOscuro);
document.getElementById("oscuro").style.backgroundColor = "#00ffcc";
let audio = document.getElementById("audio")
//reset


document.getElementById("reset").addEventListener("click", resett);


document.getElementById("opciones").style.display = "block";
document.getElementById("martxa").style.display = "none";
document.getElementById("dContinuar").style.display = "none";

//mensaje espere
document.getElementById("mensaje").textContent = "Espere...";


//stop

var elemento = document.getElementById('chocolate');

document.getElementById("stop").addEventListener("click", detenerAnimacion);

//variable global, valor transformacion actual
var transformacionActual = window.getComputedStyle(elemento).getPropertyValue('transform');

//post stop
document.getElementById("stop").addEventListener("click", activarStop);

//martxa
document.getElementById("martxa").addEventListener("click", activarMartxa);

var modoAutomatico = null;

var modoManual = false;

var fetchManualActivo = false;

var posActual = '0';

//abortar fetch
// Declarar el controlador a nivel global
// Crear un nuevo AbortController para el modo automático
let controllerAutomatico = null;
let signalAutomatico = null;



//GRAFICO
// Recuperar contadores de localStorage o inicializarlos si no existen
let contadorNegro = parseInt(localStorage.getItem('contadorNegro')) || 0;
let contadorBlanco = parseInt(localStorage.getItem('contadorBlanco')) || 0;


function detenerAnimacion() {
	try {
		elemento.style.transform = 'none';
	} catch (error) {
		console.log(error);
	}
}



//automatico

const radioAutomatico = document.getElementById("automatico");

radioAutomatico.addEventListener("click", function () {
	try {
		modoAutomatico = true;
		modoManual = false;
		document.getElementById("martxa").style.display = "block";




		console.log('prueba true: ' + modoAutomatico)

		activarAutomatico();

	} catch (error) {
		console.log(error);
	}
});


function activarAutomatico() {
	try {
		modoAutomatico = true;
		modoManual = false;

		// Crear un nuevo AbortController para el modo automático
		controllerAutomatico = new AbortController();
		signalAutomatico = controllerAutomatico.signal; // Define signalAutomatico aquí


		document.getElementById("dContinuar").style.display = "none"; // Oculta el botón por ID
		const data = new URLSearchParams();
		data.append('"DB_DATOS_DAW".automatico', '1');


		enviarDatos(urlPlc, data);


		cogerValoresAutomatico();

	} catch (error) {
		console.log(error);
	}
}


//manual

const radioManual = document.getElementById("manual");

radioManual.addEventListener("click", function () {
	try {

		document.getElementById("martxa").style.display = "block";
		modoAutomatico = false;
		modoManual = true;
		console.log('prueba false: ' + modoAutomatico)
		activarManual();
	} catch (error) {
		console.log(error);
	}
});



function activarManual() {
	try {

		modoAutomatico = false;
		modoManual = true;

		if (controllerAutomatico) {
			// Abortar la solicitud fetch si existe
			controllerAutomatico.abort();
		}

		console.log("estoy en activarManual(): " + modoManual)

		//mostrar boton
		document.getElementById("dContinuar").style.display = "block";
		const data = new URLSearchParams();
		data.append('"DB_DATOS_DAW".automatico', '0');
		enviarDatos(urlPlc, data);

	} catch (error) {
		console.log(error);
	}
}

document.getElementById("continuar").addEventListener("click", function () {
	console.log("continuar pulsado");

	cogerValoresManual();
	cambiarColorAutomatico();
	cambiarPosicionAutomatico();
	document.getElementById("dContinuar").style.display = "none";
});


function activarMartxa() {
	try {

		document.getElementById("martxa").style.backgroundColor = "greenyellow";
		document.getElementById("stop").style.backgroundColor = "red";


		if (modoAutomatico === null) {
			cogerValoresManual();

			const data = new URLSearchParams();
			data.append('"DB_DATOS_DAW".martxa', '1');
			enviarDatos(urlPlc, data);
		}

	} catch (error) {
		console.log(error);
	}
}

function activarStop() {
	try {
		console.log(modoAutomatico);
		document.getElementById("martxa").style.backgroundColor = "red";

		document.getElementById("stop").style.backgroundColor = "greenyellow";



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

function cogerValoresAutomatico() {
	try {
		console.log(modoAutomatico + ".......................");
		if (modoManual) {
			console.log("En modo manual, no se ejecuta el fetch automático.");
			return;
		} else {
			const fetchInterval = setInterval(function () {
				fetch("variables.html", { signal: signalAutomatico }) // Pasa el signal aquí
					.then(response => response.text())
					.then(data => {
						var variables = data.trim().split("\n");
						console.log("Variables recuperadas:", variables);


						// Usar las variables almacenadas en el array
						var martxa = variables[0].trim();
						var resett = variables[1].trim();
						var pos = variables[2].trim(); var contadorNegro = variables[3].trim();
						var contadorBlanco = variables[4].trim();
						var automatico = variables[5].trim();
						var color = variables[6].trim();

						var posicion = "a" + pos;

						cambiarImagen(color);


						moverElemento(color, posicion,);


						//comprobaciones
						console.log("Posición actual: " + posicion);
						console.log("Color: " + color);
						console.log("martxa: " + martxa);
						console.log("automatico: " + automatico);
						console.log("contador blanco: " + contadorBlanco);
						console.log("contador negro: " + contadorNegro);

					})
					.catch(error => {
						if (error.name === 'AbortError') {
							return error;

						} else {
							console.error("Error en la solicitud: ", error);
						}
					});


			}, 9000);

			controllerAutomatico.fetchInterval = fetchInterval;

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


				if (modoAutomatico !== null) {
					comprobar(color, martxa, automatico, posicion);

					if (posActual != posicion) {
						cambiarImagen(color);
						moverElemento(color, posicion);
						//GRAFICO
						sumarContador(color);
						guardarContador();
						posActual = posicion;
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
				console.log(modoAutomatico);


				//GRAFICO
				sumarContador(color);
				guardarContador();

			}


			else {
				console.log("manual");
				console.log('estoy en el else del comprobar: ' + modoAutomatico);

				document.getElementById("continuar").style.display = "block";
				document.getElementById("mensaje").style.display = "block";

				console.log('esperando pulsar boton continuar')

				console.log('me he saltado el boton continuar')

				//GRAFICO


			}
		}
	} catch (error) {
		console.log(error);
	}
}

function cambiarPosicionAutomatico() {
	const data = new URLSearchParams();
	posRandom = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
	colorRandom = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
	data.append('"DB_DATOS_DAW".color', colorRandom);
	data.append('"DB_DATOS_DAW".posicion', posRandom);
	enviarDatos(urlPlc, data);

}
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


			cambiarPosicionAutomatico();

			setTimeout(() => {
				// Regresar el círculo al principio
				chocolate.style.transform = `translate(0, 0)`;
				document.getElementById("mensaje").textContent = "Espere...";

			}, 4000)
			document.getElementById("dContinuar").style.display = "block";


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
	// Resto de tu lógica aquí

}


function resett() {

	try {

		reproducirAudio();
		setTimeout(() => {
			var resultado = window.confirm('Estas seguro?');
			if (resultado === true) {

				contadorNegro = 0;
				contadorBlanco = 0;
			}

			location.reload();
		}, 200)


	} catch (error) {
		console.log(error);
	}
}

//GRAFICO
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


document.addEventListener('DOMContentLoaded', function () {
	try {
		const ctx = document.getElementById('miGrafico').getContext('2d');
		const myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['Azul (contadorBlanco)', 'Rojo (contadorNegro)'],
				datasets: [{
					label: 'Contador de Colores',
					data: [contadorBlanco, contadorNegro],
					backgroundColor: [
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 99, 132, 0.2)'
					],
					borderColor: [
						'rgba(54, 162, 235, 1)',
						'rgba(255, 99, 132, 1)'
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

		// Función para redibujar el gráfico cuando cambia el tamaño de la pantalla
		window.addEventListener('resize', function () {
			myChart.update(); // Actualiza el gráfico
		});

	} catch (error) {
		console.log(error);
	}
});