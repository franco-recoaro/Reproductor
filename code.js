import canciones from "./canciones.json" assert { type: "json" };
import albums from "./albums.json" assert { type: "json" };
import playlist from "./playlist.json" assert { type: "json" };


const botonReproducir = document.querySelectorAll("#reproducir");
const reproductorMusica = document.querySelector("audio");
const botonPlay = document.querySelector("#botonPlay");
const botonPause = document.querySelector("#botonPause")
const botonFiveNext = document.querySelector("#botonFiveNext");
const botonStop = document.querySelector("#botonStop");
const botonFiveBack = document.querySelector("#botonFiveBack");
const botonAtrasReproductor = document.querySelector("#botonAtras")
const botonNextReproductor = document.querySelector("#botonNext")
const volume = document.querySelector("#volume-control");
const nombreCancionReproducida = document.querySelector("#nombreCancionReproducida");


/********************************************************FUNCIONALIDADES REPRODUCTOR*******************************************************/


let regex = /\S+/g;
//Busca los espacios en blanco y los elimina
///\S+/ matchea todos los caracteres sin contar los espacios en blanco
//g no importa que sean minisculas o mayusculas

botonReproducir.forEach(boton => {
  const botones = boton.parentNode; //parent node se utiliza para que trabaje en cada bloque padre de cada elemento y no se utilice siempre el primero
  boton.value = botones.querySelector("span").textContent.match(regex).join(" "); //(.querySelector) va a seleccionar el primer elemento hijo del elemento padre})

  //textContent : todo el texto que tiene adentro el elemento seleccionado previamente

  //funcion match: captura todos los alfanumericos y los mete en un array - y el metodo join (" ") le da espacio a las palabras almacenadas con el match.
});


/* CREA UN ELEMENTO SPAN Y SE LO AGREGO AL DIV DECLARADO EN EL HTML*/
let crearSpan = document.createElement("span");
crearSpan.setAttribute("id", "spanReproductor")
nombreCancionReproducida.appendChild(crearSpan);

//MANEJO DE VOLUMEN AL INICIAR CANCION

reproductorMusica.volume = 0.5;  // Hago que la cancion empiece con el 50% del volumen para despues interactuar con el

botonReproducir.forEach(boton => {
  let indiceInicio;
  boton.addEventListener("click", () => {
    for (let cancion of canciones) { //separa en constantes diferentees cada objeto en el JSON
      if (cancion.nombre.toLowerCase() === boton.value.toLowerCase()) // Comparamos si canciones.nombre es igual a boton.value (toLowerCase es una funcion predeterminada que si existe alguna mayuscula la toma como igual)
      {
        reproductorMusica.src = `${cancion.url}` //Se coloca template string porque debe pasarse como texto al html
        indiceInicio = cancion.id;  
        reproductorMusica.play(); //si encuentra todo va a pasar el URL a audio y le da play a la musica
        botonPlay.style.display = "none";
        botonPause.style.display = "block";
        crearSpan.setAttribute("id", "spanReproductor")
        crearSpan.textContent = `${cancion.nombre} - ${cancion.artista}` //El span creado cambia su contenido de texto dependiendo la cancion pasada al elemento audio. El objeto cancion toma como dato el nombre de la cancion y el nombre del artista.
      }
    }
    function cancionSiguiente() {
      let indiceFiltro = canciones.findIndex((song) => song.id === indiceInicio)
      if (indiceFiltro < canciones.length - 1) {
        crearSpan.textContent = `${canciones[indiceFiltro + 1].nombre} - ${canciones[indiceFiltro + 1].artista}`
        indiceInicio = canciones[indiceFiltro + 1].id;
        console.log(canciones[indiceFiltro + 1].url);
        reproductorMusica.src = canciones[indiceFiltro + 1].url;
        reproductorMusica.play()
      }
    }

    function cancionAtras() {
      let indiceFiltro = canciones.findIndex((song) => song.id === indiceInicio)
      if(reproductorMusica.currentTime > 1){
        reproductorMusica.currentTime = 0;
        reproductorMusica.play()  
      }else{
      if (indiceFiltro > 0) {
        indiceInicio = canciones[indiceFiltro - 1].id;
        crearSpan.textContent = `${canciones[indiceFiltro - 1].nombre} - ${canciones[indiceFiltro - 1].artista}`
        reproductorMusica.src = canciones[indiceFiltro - 1].url;
        reproductorMusica.play()
      }
    }
  }

    botonNextReproductor.removeEventListener("click", cancionSiguiente);
    botonNextReproductor.addEventListener("click", cancionSiguiente);
    botonAtrasReproductor.removeEventListener("click", cancionAtras);
    botonAtrasReproductor.addEventListener("click",cancionAtras);
  })

});


botonFiveNext.addEventListener("click", () => {
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


botonPlay.addEventListener("click", (e) => { //Evento boton play para que se reproduzca si hay una cancion enviada al elemento audio
  e.preventDefault()
  if (reproductorMusica.src != "#") { //Condicion si el src no se encuentra vacio = se ejecuta la funcion play y se esconde el play y aparece el pause.
    reproductorMusica.play()

    botonPlay.style.display = "none";
    botonPause.style.display = "block";
  }
}
);

//funcion que cuando aprete click, adelante 5 seg la cancion
botonFiveNext.addEventListener("click", () => {
  reproductorMusica.currentTime += 5; //.currenTime es la propiedad que me marca el tiempo actual de la cancion
}
);

//funcion que cuando aprete click, atrase 5 seg la cancion
botonFiveBack.addEventListener("click", () => {
  if (reproductorMusica.currentTime >= 6) {
    reproductorMusica.currentTime -= 5
  }
});


volume.addEventListener("change", (ev) => {
  reproductorMusica.volume = ev.currentTarget.value / 100;
  console.log(reproductorMusica.volume);
})

/*****************************************************RENDERIZAR ALBUMS*********************************************************/
const divAlbums = document.querySelectorAll("#divAlbums");

//CAMBIAR A PARTIR DE ACA 
function renderizadoDeAlbums(){

  let indiceInicio;
  let indiceF;
  let indiceFiltro;
  let indiceFiltro2;
  
  function cancionSiguiente() {
    playlist.forEach((song) => {
      song.listado.forEach((c) => {
        if (c.id === indiceInicio) {
          indiceF = c;
        }
      });
    });
    indiceFiltro = playlist.findIndex((song) => {
      return song.listado.includes(indiceF);
    });
    indiceFiltro2 = playlist[indiceFiltro].listado.findIndex((c) => {
      return c.id === indiceF.id;
    });
    if (indiceFiltro2 < playlist[indiceFiltro].listado.length - 1) {
      indiceInicio = playlist[indiceFiltro].listado[indiceFiltro2 + 1].id;
      reproductorMusica.src =
        playlist[indiceFiltro].listado[indiceFiltro2 + 1].url;
      reproductorMusica.play();
      botonPlay.style.display = "none";
      botonPause.style.display = "block";
      crearSpan.textContent = `${
        playlist[indiceFiltro].listado[indiceFiltro2 + 1].nombre
      } - ${playlist[indiceFiltro].listado[indiceFiltro2 + 1].artista}`;
    }
  }
  
  function cancionAtras() {
    playlist.forEach((song) => {
      song.listado.forEach((c) => {
        if (c.id === indiceInicio) {
          indiceF = c;
        }
      });
    });
    indiceFiltro = playlist.findIndex((song) => {
      return song.listado.includes(indiceF);
    });
    indiceFiltro2 = playlist[indiceFiltro].listado.findIndex((c) => {
      return c.id === indiceF.id;
    });
  
    if (indiceFiltro2 > 0) {
      indiceInicio = playlist[indiceFiltro].listado[indiceFiltro2 - 1].id;
      reproductorMusica.src =
        playlist[indiceFiltro].listado[indiceFiltro2 - 1].url;
      reproductorMusica.play();
      botonPlay.style.display = "none";
      botonPause.style.display = "block";
      crearSpan.textContent = `${
        playlist[indiceFiltro].listado[indiceFiltro2 - 1].nombre
      } - ${playlist[indiceFiltro].listado[indiceFiltro2 - 1].artista}`;
    }
  }
  
//CAMBIAR HASTA ACA


divAlbums.forEach((divsAlbunes) => {
  divsAlbunes.addEventListener("click", () => {
    renderizadoSecundario.innerHTML = '<div id="renderizadoSecundario"></div>';
    renderizadoPrimario.style.display = "none";
    renderizadoSecundario.style.display = "flex";
    crearSpan.setAttribute("id", "spanReproductor");

    botonNextReproductor.removeEventListener("click", cancionSiguiente);
    botonAtrasReproductor.removeEventListener("click", cancionAtras);
    botonNextReproductor.addEventListener("click", cancionSiguiente);
    botonAtrasReproductor.addEventListener("click", cancionAtras);

    botonAtras.addEventListener("click", () => {
      botonNextReproductor.removeEventListener("click", cancionSiguiente);
      botonAtrasReproductor.removeEventListener("click", cancionAtras);
    });

    let spanAlbumes = divsAlbunes.querySelector("span").textContent;

    let resultadoSpan = spanAlbumes.match(regex).join(" ");

    for (let albuns of albums) {
      if (resultadoSpan.toLowerCase() === albuns.nombre.toLowerCase()) {
        if (renderizadoSecundario.length === 0) {
          albuns.listado.forEach((cancionAlbun) => {
            const divAlbuns = document.createElement("div");
            const botonAlbun = document.createElement("button");
            const divCancion = document.createElement("div");
            const divSpanMasSpan = document.createElement("div");
            const spanArtista = document.createElement("span");
            const spanCancion = document.createElement("span");

            divAlbuns.setAttribute("id", "divAlbuns");
            botonAlbun.setAttribute("id", "botonAlbun");
            divCancion.setAttribute("id", "divCancion");
            divSpanMasSpan.setAttribute("id", "divSpanMasSpan");
            spanArtista.setAttribute("id", "spanArtista");

            renderizadoSecundario.appendChild(divAlbuns);
            divAlbuns.appendChild(divCancion);
            divCancion.appendChild(divSpanMasSpan);
            divCancion.appendChild(botonAlbun);
            divSpanMasSpan.appendChild(spanCancion);
            divSpanMasSpan.appendChild(spanArtista);

            spanCancion.textContent = `${cancionAlbun.nombre}`;
            spanArtista.textContent = `${cancionAlbun.artista}`;
            botonAlbun.innerHTML =
              '<img src="./Assets/PLAY.png" width="20px" heigth="20px">';

            divCancion.addEventListener("click", () => {
              if (
                divSpanMasSpan.children[0].textContent.toLowerCase() ===
                cancionAlbun.nombre.toLowerCase()
              ) {
                reproductorMusica.src = `${cancionAlbun.url}`;
                indiceInicio = cancionAlbun.id;
                reproductorMusica.play();
                console.log(reproductorMusica.volume);
                botonPlay.style.display = "none";
                botonPause.style.display = "block";
                crearSpan.setAttribute("id", "spanReproductor");
                crearSpan.textContent = `${cancionAlbun.nombre} - ${cancionAlbun.artista}`;
              }
            });
          });
        } else {
          renderizadoSecundario.innerHTML = `<div id="renderizadoSecundario"></div>`;
          albuns.listado.forEach((cancionAlbun) => {
            const divAlbuns = document.createElement("div");
            const botonAlbun = document.createElement("button");
            const divCancion = document.createElement("div");
            const divSpanMasSpan = document.createElement("div");
            const spanArtista = document.createElement("span");
            const spanCancion = document.createElement("span");

            divAlbuns.setAttribute("id", "divAlbuns");
            botonAlbun.setAttribute("id", "botonAlbun");
            divCancion.setAttribute("id", "divCancion");
            divSpanMasSpan.setAttribute("id", "divSpanMasSpan");
            spanArtista.setAttribute("id", "spanArtista");

            renderizadoSecundario.appendChild(divAlbuns);
            divAlbuns.appendChild(divCancion);
            divCancion.appendChild(divSpanMasSpan);
            divCancion.appendChild(botonAlbun);
            divSpanMasSpan.appendChild(spanCancion);
            divSpanMasSpan.appendChild(spanArtista);

            spanCancion.textContent = `${cancionAlbun.nombre}`;
            spanArtista.textContent = `${cancionAlbun.artista}`;
            botonAlbun.innerHTML =
              '<img src="./Assets/PLAY.png" width="20px" heigth="20px">';

            divCancion.addEventListener("click", () => {
              if (
                divSpanMasSpan.children[0].textContent.toLowerCase() ===
                cancionAlbun.nombre.toLowerCase()
              ) {
                reproductorMusica.src = `${cancionAlbun.url}`;
                indiceInicio = cancionAlbun.id;
                reproductorMusica.play();
                console.log(reproductorMusica.volume);
                botonPlay.style.display = "none";
                botonPause.style.display = "block";
                crearSpan.setAttribute("id", "spanReproductor");
                crearSpan.textContent = `${cancionAlbun.nombre} - ${cancionAlbun.artista}`;
              }
            });
          });
        }
      }
    }
  });
});
}

renderizadoDeAlbums();

/*************************************************RENDERIZADO DE PLAYLIST***********************************************************/

let renderizadoPrimario = document.querySelector("#renderizadoPrimario");
let renderizadoSecundario = document.querySelector("#renderizadoSecundario");
let listasReproduccion = document.querySelectorAll("#listasReproduccion");

//Metodo forEach = coloco una funcion a cada elemento del array - identifica cada elemento dentro de un array
//Dentro se coloca una funcion callback que va a retornar por pantalla
//Parametro = valor que doy para que interactue dentro de una funcion
//Argumento = valores que paso cuando llamo la funcion

function renderizadoDePlaylist(){

let indiceInicio;
let indiceF;
let indiceFiltro;
let indiceFiltro2;

function cancionSiguiente() {
  playlist.forEach((song) => {
    song.listado.forEach((c) => {
      if (c.id === indiceInicio) {
        indiceF = c;
      }
    });
  });
  indiceFiltro = playlist.findIndex((song) => {
    return song.listado.includes(indiceF);
  });
  indiceFiltro2 = playlist[indiceFiltro].listado.findIndex((c) => {
    return c.id === indiceF.id;
  });
  if (indiceFiltro2 < playlist[indiceFiltro].listado.length - 1) {
    indiceInicio = playlist[indiceFiltro].listado[indiceFiltro2 + 1].id;
    reproductorMusica.src =
      playlist[indiceFiltro].listado[indiceFiltro2 + 1].url;
    reproductorMusica.play();
    botonPlay.style.display = "none";
    botonPause.style.display = "block";
    crearSpan.textContent = `${
      playlist[indiceFiltro].listado[indiceFiltro2 + 1].nombre
    } - ${playlist[indiceFiltro].listado[indiceFiltro2 + 1].artista}`;
  }
}

function cancionAtras() {
  playlist.forEach((song) => {
    song.listado.forEach((c) => {
      if (c.id === indiceInicio) {
        indiceF = c;
      }
    });
  });
  indiceFiltro = playlist.findIndex((song) => {
    return song.listado.includes(indiceF);
  });
  indiceFiltro2 = playlist[indiceFiltro].listado.findIndex((c) => {
    return c.id === indiceF.id;
  });

  if (indiceFiltro2 > 0) {
    indiceInicio = playlist[indiceFiltro].listado[indiceFiltro2 - 1].id;
    reproductorMusica.src =
      playlist[indiceFiltro].listado[indiceFiltro2 - 1].url;
    reproductorMusica.play();
    botonPlay.style.display = "none";
    botonPause.style.display = "block";
    crearSpan.textContent = `${
      playlist[indiceFiltro].listado[indiceFiltro2 - 1].nombre
    } - ${playlist[indiceFiltro].listado[indiceFiltro2 - 1].artista}`;
  }
}


listasReproduccion.forEach((divPlaylist) => {
  //Recorro cada div con id "listasRe..." con el parametro divPlaylist

  divPlaylist.addEventListener("click", () => {


    botonNextReproductor.removeEventListener("click", cancionSiguiente);
    botonAtrasReproductor.removeEventListener("click", cancionAtras);
    botonNextReproductor.addEventListener("click", cancionSiguiente);
    botonAtrasReproductor.addEventListener("click", cancionAtras);

    botonAtras.addEventListener("click", () => {
      botonNextReproductor.removeEventListener("click", cancionSiguiente);
      botonAtrasReproductor.removeEventListener("click", cancionAtras);
    });

    //Una vez que ya tengo cada div separado, escribo la funcionalidad a cada uno
    renderizadoPrimario.style.display = "none"; //Hago desaparecer el contenedor principal
    renderizadoSecundario.style.display = "flex"; //Hago aparecer el contenedor secundario que va alojar los span de las listas

    for (let playLista of divPlaylist.children) {
      //divPlaylist que son los div por separados tomados con anterioridad, accedo .children a  los elementos que contiene cada div
      let spanListas = playLista.querySelector("span"); //la variable va a tener el valor del elemento recorrido por playLista, en este caso, cada span dentro de cada div (trae el elemento).

      playlist.forEach((jsonPlaylist) => {
        //Recorro el json playlist y doy un parametro para que lo recorra
        if (spanListas) {
          //Creo un if de SpanListas para obviar el primer resultado que arroja que es "null"

          if (
            jsonPlaylist.nombre.toLowerCase() ===
            spanListas.textContent.toLowerCase()
          ) {
            //Si el nombre del objeto recorrido coincide con el texto del span
            if (renderizadoSecundario.length === 0) {
              //si la longitud de renderizado secundario es igual a 0, imprimo el listado de canciones

              jsonPlaylist.listado.forEach((cancionesListados) => {
                //Si coincide creo la estructura de los elementos que se encuentran dentro de la propiedad "Listados"
                const divPlaylist = document.createElement("div"); //div principal con todo el listado
                const botonPlaylist = document.createElement("button"); //boton play
                const divCancion = document.createElement("div"); //div de cancion general spans + button
                const divSpanMasSpan = document.createElement("div"); //div donde se alojan los spans
                const spanArtista = document.createElement("span"); //span con nombre artista
                const spanCancion = document.createElement("span"); //span con nombre cancion

                //doy atributos a los elementos creados
                divPlaylist.setAttribute("id", "playlistDiv");
                botonPlaylist.setAttribute("id", "botonPlaylist");
                divCancion.setAttribute("id", "divCancion");
                divSpanMasSpan.setAttribute("id", "divSpanMasSpan");
                spanArtista.setAttribute("id", "spanArtista");

                //entrelazo los elementos dentro de los contenedores que corresponden
                renderizadoSecundario.appendChild(divPlaylist);
                divPlaylist.appendChild(divCancion);
                divCancion.appendChild(divSpanMasSpan);
                divCancion.appendChild(botonPlaylist);
                divSpanMasSpan.appendChild(spanCancion);
                divSpanMasSpan.appendChild(spanArtista);

                //Agrego contenido a los elementos creados dependiendo el nombre de la cancion y el artista
                spanArtista.textContent = `${cancionesListados.artista}`;
                spanCancion.textContent = `${cancionesListados.nombre}`;
                botonPlaylist.innerHTML =
                  '<img src="./Assets/PLAY.png" width="20px" heigth="20px">';

                //reutilizo el evento play del reproductor modificando los valores

                divCancion.addEventListener("click", () => {
                  if (
                    divSpanMasSpan.children[0].textContent.toLowerCase() ===
                    cancionesListados.nombre.toLowerCase()
                  ) {
                    reproductorMusica.src = `${cancionesListados.url}`;
                    indiceInicio = cancionesListados.id;
                    reproductorMusica.play();
                    botonPlay.style.display = "none";
                    botonPause.style.display = "block";
                    crearSpan.setAttribute("id", "spanReproductor");
                    crearSpan.textContent = `${cancionesListados.nombre} - ${cancionesListados.artista}`;
                    console.log(indiceInicio);
                  } //Si el contenido del primer elemento del divSpanMasSpan(spanCancion) coincide con el nombre de la cancion dentro de Listado dentro de playlist.json, se le pasa el url al reproductor.
                });
              });
            } else {
              //Al pasar nuevamente el div, se borra todo lo anterior impreso y se crea nuevamente el elemento con ID RenderizadoSecundario.
              renderizadoSecundario.innerHTML = `<div id="renderizadoSecundario"></div>`;
              jsonPlaylist.listado.forEach((cancionesListados) => {
                const divPlaylist = document.createElement("div");
                const botonPlaylist = document.createElement("button");
                const divCancion = document.createElement("div");
                const divSpanMasSpan = document.createElement("div");
                const spanArtista = document.createElement("span");
                const spanCancion = document.createElement("span");
                const imagenBotonLista = document.createElement("img");

                //doy atributos a los elementos creados
                divPlaylist.setAttribute("id", "playlistDiv");
                botonPlaylist.setAttribute("id", "botonPlaylist");
                divCancion.setAttribute("id", "divCancion");
                divSpanMasSpan.setAttribute("id", "divSpanMasSpan");
                spanArtista.setAttribute("id", "spanArtista");

                //entrelazo los elementos dentro de los contenedores que corresponden
                renderizadoSecundario.appendChild(divPlaylist);
                divPlaylist.appendChild(divCancion);
                divCancion.appendChild(divSpanMasSpan);
                divCancion.appendChild(botonPlaylist);
                divSpanMasSpan.appendChild(spanCancion);
                divSpanMasSpan.appendChild(spanArtista);
                botonPlaylist.appendChild(imagenBotonLista);

                //Agrego contenido a los elementos creados dependiendo el nombre de la cancion y el artista
                spanArtista.textContent = `${cancionesListados.artista}`;
                spanCancion.textContent = `${cancionesListados.nombre}`;
                botonPlaylist.innerHTML =
                  '<img  src="./Assets/PLAY.png" width="20px" heigth="20px">';

                //reutilizo el evento play del reproductor modificando los valores
                divCancion.addEventListener("click", () => {
                  if (
                    divSpanMasSpan.children[0].textContent.toLowerCase() ===
                    cancionesListados.nombre.toLowerCase()
                  ) {
                    reproductorMusica.src = `${cancionesListados.url}`;
                    indiceInicio = cancionesListados.id;
                    reproductorMusica.play();
                    botonPlay.style.display = "none";
                    botonPause.style.display = "block";
                    crearSpan.setAttribute("id", "spanReproductor");
                    crearSpan.textContent = `${cancionesListados.nombre} - ${cancionesListados.artista}`;
                    console.log(indiceInicio);
                  } //Si el contenido del primer elemento del divSpanMasSpan(spanCancion) coincide con el nombre de la cancion dentro de Listado dentro de playlist.json, se le pasa el url al reproductor.
                });
              });
            }
          }
        }
      });
    }
  });
});
}

renderizadoDePlaylist()

/************************************INPUT BUSCAR CANCION***********************************************/

let buscadorCancion = document.querySelector("#buscadorCanciones");

buscadorCancion.addEventListener("input", (e) => {
  if (e.target.value == "") {
    renderizadoSecundario.style.display = "none";
    renderizadoPrimario.style.display = "block";
  } else {
    renderizadoSecundario.style.display = "flex";
    renderizadoPrimario.style.display = "none";
    let valorInput = e.target.value.trim().toLowerCase();
    renderizadoSecundario.innerHTML = "";
    let listaInput = document.createElement("div");
    listaInput.className = "listaInput";

    canciones.forEach(cancion => {

      let cancionInput = cancion.nombre.toLowerCase();

      if (cancionInput.includes(valorInput)) {

        let renglonLista = document.createElement("div");
        renglonLista.className = "renglonLista"

        let botonLista = document.createElement("a");
        botonLista.className = "botonLista";

        botonLista.addEventListener("click", () => {
          reproductorMusica.src = `${cancion.url}` //Se coloca template string porque debe pasarse como texto al html
          reproductorMusica.play(); //si encuentra todo va a pasar el URL a audio y le da play a la musica
          botonPlay.style.display = "none";
          botonPause.style.display = "block";
          crearSpan.setAttribute("id", "spanReproductor")
          crearSpan.textContent = `${cancion.nombre} - ${cancion.artista}` //paso el valor obtenido de nombre y artista al span de reproductor

        });

        let contenedorSpans = document.createElement("div");
        contenedorSpans.setAttribute("id", "contenedorSpansListas")

        let spanCancion = document.createElement("span");
        spanCancion.className = "spanCancion"

        let spanArtista = document.createElement("span");
        spanArtista.className = "spanArtista";

        listaInput.appendChild(renglonLista);
        renglonLista.append(botonLista);
        botonLista.appendChild(contenedorSpans);
        contenedorSpans.append(spanCancion);
        contenedorSpans.appendChild(spanArtista);

        spanCancion.textContent = `${cancion.nombre}`;
        spanArtista.textContent = `${cancion.artista}`;

      }
    });
    renderizadoSecundario.appendChild(listaInput)
  }
});

/*******************************************LOGIN Y SIGNUP********************************************/
let botonReg = document.querySelector("#inicioReg");
let signupFormulario = document.querySelector("#registro");
let inputUserRegistro = document.querySelector("#formularioMailReg");
let inputPassRegistro = document.querySelector("#formularioPassReg");

botonReg.addEventListener("click", () => {
  signupFormulario.style.display="flex";
})

let botonCancelar = document.querySelectorAll("#botonCancelar");

botonCancelar.forEach(boton => {
  boton.addEventListener("click", () => {
  if(signupFormulario.style.display="flex"){
    signupFormulario.style.display="none";
  }
  if(loginFormulario.style.display="flex"){
    loginFormulario.style.display="none";
  }
});
})


signupFormulario.addEventListener("submit", (e) => {
  let user = inputUserRegistro.value;
  let pass = inputPassRegistro.value;
  const guardarCuenta = (clave,valor) => { localStorage.setItem(clave,valor) }
  guardarCuenta("usuarios",JSON.stringify({"user": user, "pass": pass}));
  });



let botonLogin = document.querySelector("#inicioLogin");
let loginFormulario = document.querySelector("#login");
let inputUserLogin = document.querySelector("#formularioMail");
let inputPassLogin = document.querySelector("#formularioPass");
let botonLoginSubmit = document.querySelector("#botonSubmitLogin");

botonLogin.addEventListener("click", () => {
loginFormulario.style.display="flex";
});

let baseDatosLogin = JSON.parse(localStorage.getItem("usuarios"));

console.log(baseDatosLogin);

botonLoginSubmit.addEventListener("click", () => {
  if(inputUserLogin.value === baseDatosLogin.user && inputPassLogin.value === baseDatosLogin.pass){
    loginFormulario.style.display="none";
    alert("Bienvenido Nuevamente")
  }else{
    alert("Credenciales incorrectas")
  }
})


/***********************BOTON ATRAS*******************************/

const botonAtras = document.querySelector(".atrasBut");

botonAtras.addEventListener("click", () => {
  if (renderizadoPrimario.style.display === "none") {
    renderizadoPrimario.style.display = "block";
    renderizadoSecundario.style.display = "none";

  }
});

/**************************************PASAR DE CANCION ************************************************/