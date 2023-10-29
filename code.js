import canciones from "./canciones.json" assert { type: "json" };
import albums from "./albums.json" assert { type: "json" };
import playlist from "./playlist.json" assert { type: "json" };


const botonReproducir = document.querySelectorAll("#reproducir");
const reproductorMusica = document.querySelector("audio");
const botonPlay = document.querySelector("#botonPlay");
const botonPause = document.querySelector("#botonPause")
const botonNext = document.querySelector("#botonNext")
const botonStop = document.querySelector("#botonStop")
const botonBack = document.querySelector("#botonBack")
const volume = document.querySelector("#volume-control");
const nombreCancionReproducida = document.querySelector("#nombreCancionReproducida")

/*********************************************FUNCIONALIDADES REPRODUCTOR********************************************/


let regex = /\w+/gi;
//Busca los espacios en blanco y los elimina
///\w+/ de regex encuentra los caracteres alfanumericos seguidos
//gi no importa que sean minisculas o mayusculas

botonReproducir.forEach(boton => {
  const botones = boton.parentNode; //parent node se utiliza para que trabaje en cada bloque padre de cada elemento y no se utilice siempre el primero
  boton.value = botones.querySelector("span").textContent.match(regex).join(" "); //(.querySelector) va a seleccionar el primer elemento hijo del elemento padre})

  //textContent : todo el texto que tiene adentro el elemento seleccionado previamente

  //funcion match: captura todos los alfanumericos y los mete en un array - y el metodo join (" ") le da espacio a las palabras almacenadas con el match.
});


/* CREA UN ELEMENTO SPAN Y SE LO AGREGO AL DIV DECLARADO EN EL HTML*/
let crearSpan = document.createElement("span");
nombreCancionReproducida.appendChild(crearSpan);


botonReproducir.forEach(boton => {
  boton.addEventListener("click", () => {
    for (let cancion of canciones) { //separa en constantes diferentees cada objeto en el JSON
      if (cancion.nombre.toLowerCase() === boton.value.toLowerCase()) // Comparamos si canciones.nombre es igual a boton.value (toLowerCase es una funcion predeterminada que si existe alguna mayuscula la toma como igual)
      {
        reproductorMusica.src = `${cancion.url}` //Se coloca template string porque debe pasarse como texto al html
        reproductorMusica.play(); //si encuentra todo va a pasar el URL a audio y le da play a la musica
        reproductorMusica.volume = 0.5;  // Hago que la cancion empiece con el 50% del volumen para despues interactuar con el
        botonPlay.style.display = "none";
        botonPause.style.display = "block";
        crearSpan.textContent = `${cancion.nombre} - ${cancion.artista}` //El span creado cambia su contenido de texto dependiendo la cancion pasada al elemento audio. El objeto cancion toma como dato el nombre de la cancion y el nombre del artista.
      }
    }
  })
});



botonNext.addEventListener("click", () => {
  reproductorMusica.currentTime += 5; //.currenTime es la propiedad que me marca el tiempo actual de la cancion
}
)

botonPause.addEventListener("click", () => {
  reproductorMusica.pause(); //.pause es una funcion ya predeterminada del elemento audio
  botonPlay.style.display = "block";
  botonPause.style.display = "none";
}
)

botonStop.addEventListener("click", () => { // evento boton Stop
  reproductorMusica.pause(); //Damos el mismo valor al evento del boton Pause
  reproductorMusica.currentTime = 0;//A diferencia igualamos el conteo a "0"
  if (botonPause.style.display = "block") { //Condicional si el boton pause esta visible, hacemos que cuando apretamos en "stop", aparezca nuevamente el boton play.
    botonPlay.style.display = "block";
    botonPause.style.display = "none";
  }
}
)


botonPlay.addEventListener("click", () => { //Evento boton play para que se reproduzca si hay una cancion enviada al elemento audio
  if (reproductorMusica.src != "#") { //Condicion si el src no se encuentra vacio = se ejecuta la funcion play y se esconde el play y aparece el pause.
    reproductorMusica.play()
    botonPlay.style.display = "none";
    botonPause.style.display = "block";
  }
}
);

//funcion que cuando aprete click, adelante 5 seg la cancion
botonNext.addEventListener("click", () => {
  reproductorMusica.currentTime += 5; //.currenTime es la propiedad que me marca el tiempo actual de la cancion
}
);

//funcion que cuando aprete click, atrase 5 seg la cancion
botonBack.addEventListener("click", () => {
  if (reproductorMusica.currentTime >= 6) {
    reproductorMusica.currentTime -= 5
  }
});

volume.addEventListener("change", (ev) => {
  reproductorMusica.volume = ev.currentTarget.value / 100;
  console.log(reproductorMusica.volume);
})

/*************************************************RENDERIZADO DE PLAYLIST***********************************************************/

let renderizadoPrimario = document.querySelector("#renderizadoPrimario");
let renderizadoSecundario = document.querySelector("#renderizadoSecundario");
let listasReproduccion = document.querySelectorAll("#listasReproduccion");

//Metodo forEach = coloco una funcion a cada elemento del array - identifica cada elemento dentro de un array
//Dentro se coloca una funcion callback que va a retornar por pantalla
//Parametro = valor que doy para que interactue dentro de una funcion
//Argumento = valores que paso cuando llamo la funcion

listasReproduccion.forEach((divPlaylist) => { //Recorro cada div con id "listasRe..." con el parametro divPlaylist
  divPlaylist.addEventListener("click", () => { //Una vez que ya tengo cada div separado, escribo la funcionalidad a cada uno
    renderizadoPrimario.style.display = "none"; //Hago desaparecer el contenedor principal
    renderizadoSecundario.style.display = "flex"; //Hago aparecer el contenedor secundario que va alojar los span de las listas
    for (let playLista of divPlaylist.children) { //divPlaylist que son los div por separados tomados con anterioridad, accedo .children a  los elementos que contiene cada div
      let spanListas = playLista.querySelector("span") //la variable va a tener el valor del elemento recorrido por playLista, en este caso, cada span dentro de cada div (trae el elemento).


      playlist.forEach((jsonPlaylist) => { //Recorro el json playlist y doy un parametro para que lo recorra
        if (spanListas) { //Creo un if de SpanListas para obviar el primer resultado que arroja que es "null"

          if (jsonPlaylist.nombre.toLowerCase() === spanListas.textContent.toLowerCase()) { //Si el nombre del objeto recorrido coincide con el texto del span 
            if (renderizadoSecundario.length === 0) { //si la longitud de renderizado secundario es igual a 0, imprimo el listado de canciones

              jsonPlaylist.Listados.forEach((cancionesListados) => {
                const divPlaylist = document.createElement("div");
                const botonPlaylist = document.createElement("button");
                const divCancion = document.createElement("div");
                const divSpanMasSpan = document.createElement("div");
                const spanArtista = document.createElement("span");
                const spanCancion = document.createElement("span");

                divPlaylist.setAttribute("id", "playlistDiv");
                botonPlaylist.setAttribute("id", "botonPlaylist");
                divCancion.setAttribute("id", "divCancion");
                divSpanMasSpan.setAttribute("id", "divSpanMasSpan");

                renderizadoSecundario.appendChild(divPlaylist);
                divPlaylist.appendChild(divCancion);
                divCancion.appendChild(divSpanMasSpan);
                divCancion.appendChild(botonPlaylist);
                divSpanMasSpan.appendChild(spanCancion);
                divSpanMasSpan.appendChild(spanArtista);

                spanArtista.textContent = `${cancionesListados.artista}`;
                spanCancion.textContent = `${cancionesListados.nombre}`;

                botonPlaylist.textContent = "Play"

                botonPlaylist.addEventListener("click", () => {
                  if (divSpanMasSpan.children[0].textContent.toLowerCase() === cancionesListados.nombre.toLowerCase()) {
                    reproductorMusica.src = `${cancionesListados.url}`;
                    reproductorMusica.play();
                    reproductorMusica.volume = 0.5;
                    botonPlay.style.display = "none";
                    botonPause.style.display = "block";
                    crearSpan.textContent = `${cancionesListados.nombre} - ${cancionesListados.artista}`
                  } //Si el contenido del primer elemento del divSpanMasSpan(spanCancion) coincide con el nombre de la cancion dentro de Listado dentro de playlist.json, se le pasa el url al reproductor.
                });
              })

            } else { //Al pasar nuevamente el div, se borra todo lo anterior impreso y se crea nuevamente el elemento con ID RenderizadoSecundario.
              renderizadoSecundario.innerHTML = `<div id="renderizadoSecundario"></div>`
              jsonPlaylist.Listados.forEach((cancionesListados) => {
                const divPlaylist = document.createElement("div");
                const botonPlaylist = document.createElement("button");
                const divCancion = document.createElement("div");
                const divSpanMasSpan = document.createElement("div");
                const spanArtista = document.createElement("span");
                const spanCancion = document.createElement("span");
                divPlaylist.setAttribute("id", "playlistDiv");
                botonPlaylist.setAttribute("id", "botonPlaylist");
                divCancion.setAttribute("id", "divCancion");
                divSpanMasSpan.setAttribute("id", "divSpanMasSpan");


                renderizadoSecundario.appendChild(divPlaylist);
                divPlaylist.appendChild(divCancion);
                divCancion.appendChild(divSpanMasSpan);
                divCancion.appendChild(botonPlaylist);
                divSpanMasSpan.appendChild(spanCancion);
                divSpanMasSpan.appendChild(spanArtista);


                spanArtista.textContent = `${cancionesListados.artista}`;
                spanCancion.textContent = `${cancionesListados.nombre}`;

                botonPlaylist.textContent = "Play"

                botonPlaylist.addEventListener("click", () => {
                  if (divSpanMasSpan.children[0].textContent.toLowerCase() === cancionesListados.nombre.toLowerCase()) {
                    reproductorMusica.src = `${cancionesListados.url}`;
                    reproductorMusica.play();
                    reproductorMusica.volume = 0.5;
                    botonPlay.style.display = "none";
                    botonPause.style.display = "block";
                    crearSpan.textContent = `${cancionesListados.nombre} - ${cancionesListados.artista}`
                  } //Si el contenido del primer elemento del divSpanMasSpan(spanCancion) coincide con el nombre de la cancion dentro de Listado dentro de playlist.json, se le pasa el url al reproductor
                })
              })
            }
          }
        }
      })
    }
  });
});


/******************************************BOTON ATRAS**************************************************/


/************************************INPUT BUSCAR CANCION***********************************************/


/**************************************PASAR DE CANCION ************************************************/


