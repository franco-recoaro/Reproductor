import canciones from "./canciones.json" assert { type: "json" };
import albums from "./albums.json" assert { type: "json" };
import playlist from "./playlist.json" assert { type: "json" };

const botonReproducir = document.querySelectorAll("#reproducir");
const reproductorMusica = document.querySelector("audio");
const botonPlay = document.querySelector("#botonPlay");
const botonPause = document.querySelector("#botonPause");
const botonFiveNext = document.querySelector("#botonFiveNext");
const botonStop = document.querySelector("#botonStop");
const botonFiveBack = document.querySelector("#botonFiveBack");
const botonAtrasReproductor = document.querySelector("#botonAtras");
const botonNextReproductor = document.querySelector("#botonNext");
const volume = document.querySelector("#volume-control");
const nombreCancionReproducida = document.querySelector(
  "#nombreCancionReproducida"
);

/*********************************************FUNCIONALIDADES REPRODUCTOR********************************************/

let regex = /\S+/g;

let indiceInicio;
let estado;

function modificarBotonAtras(){
if(estado === "albumes"){
    let indiceF;
  let indiceFiltro;
  let indiceFiltro2;
    function cancionAtras() {
    albums.forEach((song) => {
      song.listado.forEach((c) => {
        if (c.id === indiceInicio) {
          indiceF = c;
        }
      });
    });
    indiceFiltro = albums.findIndex((song) => {
      return song.listado.includes(indiceF);
    });
    indiceFiltro2 = albums[indiceFiltro].listado.findIndex((c) => {
      return c.id === indiceF.id;
    });
  
    if (indiceFiltro2 > 0) {
      indiceInicio = albums[indiceFiltro].listado[indiceFiltro2 - 1].id;
      reproductorMusica.src =
        albums[indiceFiltro].listado[indiceFiltro2 - 1].url;
      reproductorMusica.play();
      botonPlay.style.display = "none";
      botonPause.style.display = "block";
      crearSpan.textContent = `${
        albums[indiceFiltro].listado[indiceFiltro2 - 1].nombre
      } - ${albums[indiceFiltro].listado[indiceFiltro2 - 1].artista}`;
    }
  }
cancionAtras()
  }
  else if(estado === "canciones"){
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
cancionAtras()
  }
  else if(estado === "playlist"){

let indiceF;
  let indiceFiltro;
  let indiceFiltro2;

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
cancionAtras()
  }

}

function modificarBotonNext(){
  if(estado === "albumes"){
  let indiceF;
  let indiceFiltro;
  let indiceFiltro2;
  
  function cancionSiguiente() {
    albums.forEach((song) => {
      song.listado.forEach((c) => {
        if (c.id === indiceInicio) {
          indiceF = c;
        }
      });
    });
    indiceFiltro = albums.findIndex((song) => {
      return song.listado.includes(indiceF);
    });
    indiceFiltro2 = albums[indiceFiltro].listado.findIndex((c) => {
      return c.id === indiceF.id;
    });
    if (indiceFiltro2 < albums[indiceFiltro].listado.length - 1) {
      indiceInicio = albums[indiceFiltro].listado[indiceFiltro2 + 1].id;
      reproductorMusica.src =
        albums[indiceFiltro].listado[indiceFiltro2 + 1].url;
      reproductorMusica.play();
      botonPlay.style.display = "none";
      botonPause.style.display = "block";
      crearSpan.textContent = `${
        albums[indiceFiltro].listado[indiceFiltro2 + 1].nombre
      } - ${albums[indiceFiltro].listado[indiceFiltro2 + 1].artista}`;
    }
  }
cancionSiguiente()
  }
  else if(estado === "canciones"){
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
cancionSiguiente()
  }
  else if(estado === "playlist"){
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
cancionSiguiente()
  }

}


botonReproducir.forEach(boton => {
  const botones = boton.parentNode;
  boton.value = botones.querySelector("span").textContent.match(regex).join(" ");


});


let crearSpan = document.createElement("span");
crearSpan.setAttribute("id", "spanReproductor")
nombreCancionReproducida.appendChild(crearSpan);


reproductorMusica.volume = 0.25;  
botonReproducir.forEach(boton => {
 
  boton.addEventListener("click", () => {
    for (let cancion of canciones) { 
      if (cancion.nombre.toLowerCase() === boton.value.toLowerCase())
      {
        reproductorMusica.src = `${cancion.url}`
estado = "canciones"
        indiceInicio = cancion.id;  
        reproductorMusica.play(); 
        botonPlay.style.display = "none";
        botonPause.style.display = "block";
        crearSpan.setAttribute("id", "spanReproductor")
        crearSpan.textContent = `${cancion.nombre} - ${cancion.artista}` 
      }
    }

    botonNextReproductor.removeEventListener("click", modificarBotonNext);
    botonNextReproductor.addEventListener("click", modificarBotonNext);
    botonAtrasReproductor.removeEventListener("click", modificarBotonAtras);
    botonAtrasReproductor.addEventListener("click",modificarBotonAtras);
  })

});


botonFiveNext.addEventListener("click", () => {
  reproductorMusica.currentTime += 5; 
}
)

botonPause.addEventListener("click", () => {
  reproductorMusica.pause(); 
  botonPlay.style.display = "block";
  botonPause.style.display = "none";
}
)

botonStop.addEventListener("click", () => { 
  reproductorMusica.pause(); 
  reproductorMusica.currentTime = 0;
  if (botonPause.style.display = "block") { 
    botonPlay.style.display = "block";
    botonPause.style.display = "none";
  }
}
)


botonPlay.addEventListener("click", (e) => { 
  e.preventDefault()
  if (reproductorMusica.src != "#") { 
    reproductorMusica.play()

    botonPlay.style.display = "none";
    botonPause.style.display = "block";
  }
}
);


botonFiveNext.addEventListener("click", () => {
  reproductorMusica.currentTime += 5;
}
);


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


function renderizadoDeAlbums(){


divAlbums.forEach((divsAlbunes) => {
  divsAlbunes.addEventListener("click", () => {
    renderizadoSecundario.innerHTML = '<div id="renderizadoSecundario"></div>';
    renderizadoPrimario.style.display = "none";
    renderizadoSecundario.style.display = "flex";
    crearSpan.setAttribute("id", "spanReproductor");
    estado = "albumes"
        botonNextReproductor.removeEventListener("click", modificarBotonNext);
    botonNextReproductor.addEventListener("click", modificarBotonNext);
    botonAtrasReproductor.removeEventListener("click", modificarBotonAtras);
    botonAtrasReproductor.addEventListener("click",modificarBotonAtras);

    botonAtras.addEventListener("click", () => {
       botonNextReproductor.removeEventListener("click", modificarBotonNext);
       botonAtrasReproductor.removeEventListener("click", modificarBotonAtras)
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



function renderizadoDePlaylist(){

listasReproduccion.forEach((divPlaylist) => {

  divPlaylist.addEventListener("click", () => {

    botonNextReproductor.removeEventListener("click", modificarBotonNext);
    botonNextReproductor.addEventListener("click", modificarBotonNext);
    botonAtrasReproductor.removeEventListener("click", modificarBotonAtras);
    botonAtrasReproductor.addEventListener("click",modificarBotonAtras);
    estado = "playlist";
    botonAtras.addEventListener("click", () => {
    botonNextReproductor.removeEventListener("click", modificarBotonNext);
       botonAtrasReproductor.removeEventListener("click", modificarBotonAtras)
    });

  
    renderizadoPrimario.style.display = "none"; 
    renderizadoSecundario.style.display = "flex"; 

    for (let playLista of divPlaylist.children) {
      let spanListas = playLista.querySelector("span"); 

      playlist.forEach((jsonPlaylist) => {
        if (spanListas) {

          if (
            jsonPlaylist.nombre.toLowerCase() ===
            spanListas.textContent.toLowerCase()
          ) {
            if (renderizadoSecundario.length === 0) {

              jsonPlaylist.listado.forEach((cancionesListados) => {
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
                spanArtista.setAttribute("id", "spanArtista");

                renderizadoSecundario.appendChild(divPlaylist);
                divPlaylist.appendChild(divCancion);
                divCancion.appendChild(divSpanMasSpan);
                divCancion.appendChild(botonPlaylist);
                divSpanMasSpan.appendChild(spanCancion);
                divSpanMasSpan.appendChild(spanArtista);

                spanArtista.textContent = `${cancionesListados.artista}`;
                spanCancion.textContent = `${cancionesListados.nombre}`;
                botonPlaylist.innerHTML =
                  '<img src="./Assets/PLAY.png" width="20px" heigth="20px">';



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
                  }
                });
              });
            } else {
              renderizadoSecundario.innerHTML = `<div id="renderizadoSecundario"></div>`;
              jsonPlaylist.listado.forEach((cancionesListados) => {
                const divPlaylist = document.createElement("div");
                const botonPlaylist = document.createElement("button");
                const divCancion = document.createElement("div");
                const divSpanMasSpan = document.createElement("div");
                const spanArtista = document.createElement("span");
                const spanCancion = document.createElement("span");
                const imagenBotonLista = document.createElement("img");

                divPlaylist.setAttribute("id", "playlistDiv");
                botonPlaylist.setAttribute("id", "botonPlaylist");
                divCancion.setAttribute("id", "divCancion");
                divSpanMasSpan.setAttribute("id", "divSpanMasSpan");
                spanArtista.setAttribute("id", "spanArtista");

                renderizadoSecundario.appendChild(divPlaylist);
                divPlaylist.appendChild(divCancion);
                divCancion.appendChild(divSpanMasSpan);
                divCancion.appendChild(botonPlaylist);
                divSpanMasSpan.appendChild(spanCancion);
                divSpanMasSpan.appendChild(spanArtista);
                botonPlaylist.appendChild(imagenBotonLista);

 
                spanArtista.textContent = `${cancionesListados.artista}`;
                spanCancion.textContent = `${cancionesListados.nombre}`;
                botonPlaylist.innerHTML =
                  '<img  src="./Assets/PLAY.png" width="20px" heigth="20px">';


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
                  } 
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

    canciones.forEach((cancion) => {
      let cancionInput = cancion.nombre.toLowerCase();

      if (cancionInput.includes(valorInput)) {
        let renglonLista = document.createElement("div");
        renglonLista.className = "renglonLista";

        let botonLista = document.createElement("a");
        botonLista.className = "botonLista";

        botonLista.addEventListener("click", () => {
          reproductorMusica.src = `${cancion.url}`;
          reproductorMusica.play();
          botonPlay.style.display = "none";
          botonPause.style.display = "block";
          crearSpan.setAttribute("id", "spanReproductor");
          crearSpan.textContent = `${cancion.nombre} - ${cancion.artista}`;
        });

        let contenedorSpans = document.createElement("div");
        contenedorSpans.setAttribute("id", "contenedorSpansListas");

        let spanCancion = document.createElement("span");
        spanCancion.className = "spanCancion";

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
    renderizadoSecundario.appendChild(listaInput);
  }
});

/*******************************************LOGIN Y SIGNUP********************************************/
let botonReg = document.querySelector("#inicioReg");
let signupFormulario = document.querySelector("#registro");
let inputUserRegistro = document.querySelector("#formularioMailReg");
let inputPassRegistro = document.querySelector("#formularioPassReg");

botonReg.addEventListener("click", () => {
  signupFormulario.style.display = "flex";
});

let botonCancelar = document.querySelectorAll("#botonCancelar");

botonCancelar.forEach((boton) => {
  boton.addEventListener("click", () => {
    if ((signupFormulario.style.display = "flex")) {
      signupFormulario.style.display = "none";
    }
    if ((loginFormulario.style.display = "flex")) {
      loginFormulario.style.display = "none";
    }
  });
});

signupFormulario.addEventListener("submit", (e) => {
  let user = inputUserRegistro.value;
  let pass = inputPassRegistro.value;
  const guardarCuenta = (clave, valor) => {
    localStorage.setItem(clave, valor);
  };
  guardarCuenta("usuarios", JSON.stringify({ user: user, pass: pass }));
});

let botonLogin = document.querySelector("#inicioLogin");
let loginFormulario = document.querySelector("#login");
let inputUserLogin = document.querySelector("#formularioMail");
let inputPassLogin = document.querySelector("#formularioPass");
let botonLoginSubmit = document.querySelector("#botonSubmitLogin");

botonLogin.addEventListener("click", () => {
  loginFormulario.style.display = "flex";
});

let baseDatosLogin = JSON.parse(localStorage.getItem("usuarios"));

console.log(baseDatosLogin);

botonLoginSubmit.addEventListener("click", () => {
  if (
    inputUserLogin.value === baseDatosLogin.user &&
    inputPassLogin.value === baseDatosLogin.pass
  ) {
    loginFormulario.style.display = "none";
    alert("Bienvenido Nuevamente");
  } else {
    alert("Credenciales incorrectas");
  }
});

/***********************BOTON ATRAS*******************************/

const botonAtras = document.querySelector(".atrasBut");

botonAtras.addEventListener("click", () => {
  if (renderizadoPrimario.style.display === "none") {
    renderizadoPrimario.style.display = "block";
    renderizadoSecundario.style.display = "none";
  }
});