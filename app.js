"use strict"
import { 
    seleccionAsiento,
    bloqueoAsiento,
    conteoEntradasPrecio
} from "./funciones.js";

let butacas=document.querySelector("table.asientos");
let asientos_disponibles=butacas.querySelectorAll(".seat-av, .discseat-av, .vipseat-av");
let boton_compra=document.getElementById("compra");
let num_entradas=document.querySelector("p.entradas");
let precio_total=document.querySelector("p.precio");
let tarjeta_info=document.querySelector("div.info-asiento");
let contadores={
    "entradas":0,
    "precio": 0
     //lo trabajo como objeto para poder alterarlo globalmente (en las funciones) y que su valor se guarde/actualice
};

asientos_disponibles.forEach((asiento) => {
    seleccionAsiento(asiento, contadores, num_entradas, precio_total, tarjeta_info);
});

boton_compra.addEventListener("click", ()=>{
    alert("Gracias por su compra");
    contadores["entradas"]=0;
    contadores["precio"]=0;
    conteoEntradasPrecio(contadores, num_entradas, precio_total);
    let asientos_seleccionados=butacas.querySelectorAll(".seat-sel, .discseat-sel, .vipseat-sel");
    asientos_seleccionados.forEach((asiento) => {
        bloqueoAsiento(asiento);
    });
})

