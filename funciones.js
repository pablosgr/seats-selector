"use strict"

function seleccionAsiento(asiento, contadores, num_entradas, precio_total, tarjeta_info){
    
    asiento.addEventListener("mouseenter", ()=>{
        let tipo=comprobarCategoria(asiento);
        let num_fila=asiento.getAttribute("data-fila");
        let num_asiento=asiento.getAttribute("data-asiento");

        tarjeta_info.children[1].innerHTML=`<p class='resaltado'>${tipo_asientos[tipo]["nombre"]}</p>`;
        tarjeta_info.children[1].style="font-weight: 600; color: #0A5B7F";
        tarjeta_info.children[2].children[0].src=tipo_asientos[tipo]["imagen"];
        if(asiento.classList.contains("seat-unav") ||
            asiento.classList.contains("discseat-unav") ||
            asiento.classList.contains("vipseat-unav")
        ){
            tarjeta_info.children[3].innerHTML="<p class='resaltado'>No disponible</p>";
        }else{
            tarjeta_info.children[3].innerHTML="<p class='resaltado'>Disponible</p>";
        }
        tarjeta_info.children[4].innerHTML=`<p>Precio: <span class='resaltado'>${tipo_asientos[tipo]["precio"]} Euros</span></p>`;
        tarjeta_info.children[5].innerHTML=`<p>Características: <span class='resaltado'>${tipo_asientos[tipo]["caracteristicas"]}</span></p>`;
        tarjeta_info.children[6].innerHTML=`<p>Posición: <span class='resaltado'>F-${num_fila}  |  B-${num_asiento}</span></p>`;
    });

    asiento.addEventListener("mouseleave", ()=>{
        tarjeta_info.children[1].innerHTML="<p>Pasa el ratón sobre un asiento</p>";
        tarjeta_info.children[1].style="";
        tarjeta_info.children[2].children[0].src="";
        tarjeta_info.children[3].innerHTML="<p>Disponibilidad</p>";
        tarjeta_info.children[4].innerHTML="<p>Precio</p>";
        tarjeta_info.children[5].innerHTML="<p>Características</p>";
        tarjeta_info.children[6].innerHTML="<p>Posición</p>";
    });

    asiento.addEventListener("click", ()=>{
        if(asiento.classList.contains("seat-unav") ||
            asiento.classList.contains("discseat-unav") ||
            asiento.classList.contains("vipseat-unav")
        ){
            return; //sale de la función
        }

        if(asiento.getAttribute("data-selected")===null){
            let precio_asiento=comprobarPrecio(asiento);
            asiento.setAttribute("data-selected", "t");
            addSeleccion(asiento);
            contadores["entradas"]++;
            contadores["precio"]+=precio_asiento;
            conteoEntradasPrecio(contadores, num_entradas, precio_total);
        }else if(asiento.getAttribute("data-selected")==="t"){
            let precio_asiento=comprobarPrecio(asiento);
            asiento.removeAttribute("data-selected");
            removeSeleccion(asiento);
            contadores["entradas"]--;
            contadores["precio"]-=precio_asiento;
            conteoEntradasPrecio(contadores, num_entradas, precio_total);
        }
    });
}

function addSeleccion(asiento){
    if(asiento.classList.contains("seat-av")){
        asiento.classList.remove("seat-av");
        asiento.classList.add("seat-sel");
    }else if(asiento.classList.contains("discseat-av")){
        asiento.classList.remove("discseat-av");
        asiento.classList.add("discseat-sel");
    }else if(asiento.classList.contains("vipseat-av")){
        asiento.classList.remove("vipseat-av");
        asiento.classList.add("vipseat-sel");
    }
}

function removeSeleccion(asiento){
    if(asiento.classList.contains("seat-sel")){
        asiento.classList.remove("seat-sel");
        asiento.classList.add("seat-av");
    }else if(asiento.classList.contains("discseat-sel")){
        asiento.classList.remove("discseat-sel");
        asiento.classList.add("discseat-av");
    }else if(asiento.classList.contains("vipseat-sel")){
        asiento.classList.remove("vipseat-sel");
        asiento.classList.add("vipseat-av");
    }
}

function bloqueoAsiento(asiento){
    if(asiento.classList.contains("seat-sel")){
        asiento.classList.replace("seat-sel", "seat-unav");
    }else if(asiento.classList.contains("discseat-sel")){
        asiento.classList.replace("discseat-sel", "discseat-unav");
    }else if(asiento.classList.contains("vipseat-sel")){
        asiento.classList.replace("vipseat-sel", "vipseat-unav");
    }
}

function conteoEntradasPrecio(contadores, num_entradas, precio_total){
    num_entradas.innerText="Entradas: " + contadores["entradas"];
    precio_total.innerText="Precio: " + contadores["precio"] + " Euros";
}

function comprobarPrecio(asiento){
    let tipo=asiento.getAttribute('data-categoria');
    let precio=Math.round(tipo_asientos[tipo]["precio"] * 100) / 100;
    return precio;
}

function comprobarCategoria(asiento){
    let categoria=asiento.getAttribute('data-categoria');
    return categoria;
}

export {seleccionAsiento, bloqueoAsiento, conteoEntradasPrecio};