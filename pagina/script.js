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

document.getElementById("continuar").style.display = "none"; // Oculta el botón por ID


function detenerAnimacion() {
	elemento.style.transform = 'none';
}

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
						cambiarImagen();
						moverElemento();
					}


					else {
						console.log("manual");
						document.getElementById("continuar").style.display = "block";

						document.getElementById("continuar").addEventListener("click", cambiarImagen);
						document.getElementById("continuar").addEventListener("click", moverElemento);

						//cambiar
						//moverElemento();
					}
				}

				function cambiarImagen() {
					if (color === '1') {
						numChocoNegro = +1;
						document.getElementById("chocolate").style.backgroundImage = "url('imagenes/cn.png')";

						document.getElementById("chocolate").style.height = '10em';
						document.getElementById("chocolate").style.width = '10em';

					}
					else {
						document.getElementById("chocolate").style.backgroundImage = "url('imagenes/cb.png')";
						document.getElementById("chocolate").style.height = '5em';
						document.getElementById("chocolate").style.width = '5em';
						numChocoBlanco = +1;
					}

				}

				//AUTOMATICO Y MANUAL

				document.getElementById("automatico").addEventListener("click", opciones);
				document.getElementById("manual").addEventListener("click", opciones);

				function opciones(e) {
					if (e.target.id === "automatico") {
						automatico === '1';
					}
					else {
						if (e.target.id === "martxa") {
							martxa = '1';
						}
						else {
							automatico = '0';
						}
					}

					const url = 'http://10.0.2.100:80';
					const data = {
						martxa: martxa,
						automatico: automatico
					};

					document.getElementById('submitButton').addEventListener('click', () => {
						const inputField = document.getElementById('inputField');
						const inputValue = inputField.value;

						// Create a data object to send as the request body
						const data = new URLSearchParams();
						data.append('"DB".p1', inputValue);

						fetch("http://10.0.2.100/awp/pruebas/index.html", {
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
								return response.text(); // Assuming the response is text
							})
							.then((responseText) => {
								// Check the Content-Type of the response
								const contentType = response.headers.get('Content-Type');

								// Handle JSON response
								if (contentType && contentType.includes('application/json')) {
									const response = JSON.parse(responseText);
									document.getElementById('etiqueta').textContent = response.field1;
								} else {
									// Handle HTML response
									document.getElementById('etiqueta').innerHTML = responseText;
								}
							})
							.catch((error) => {
								console.error('Fetch Error:', error);
							});
					});


				}


				//document.getElementById("martxa").addEventListener("click", opciones);



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
						contadorNegro = contadorNegro + 1;

					}
					else {
						divObjetivo.style.backgroundColor = "white";
						divObjetivo.style.color = "black";
						contadorBlanco = contadorBlanco + 1;


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
	}, 1);
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

function resett() {
	location.reload();
	contadorNegro = 0;
	contadorBlanco = 0;
}






