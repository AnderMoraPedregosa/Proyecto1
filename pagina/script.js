// script.js
document.getElementById("claro").addEventListener("click", modoClaro)
document.getElementById("oscuro").addEventListener("click", modoOscuro)
document.getElementById("oscuro").style.backgroundColor = "grey";


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
