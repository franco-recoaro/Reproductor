let canciones = [{

  nombre:"Amorfoda",
  url: "./Bad Bunny - Amorfoda.mp3",
  artista:"Bad Bunny"
},
{
  nombre:"Columbia",
  url: "Url Cancion 2",
  artista:"Quevedo"
},
{
  nombre:"Changes",
  url: "Url Cancion 3",
  artista:"2pac"
}]

const botonReproducir = document.querySelectorAll("#reproducir");
const reproductorMusica = document.querySelector("audio");
const botonPlay = document.querySelector("#botonPlay");
const botonPause = document.querySelector("#botonPause")

let regex = /\w+/gi; //Busca los espacios en blanco y los elimina
///\w+/ de regex encuentra los caracteres alfanumericos seguidos
//gi no importa que sean minisculas o mayusculas

botonReproducir.forEach (boton => {
const botones = boton.parentNode ; //parent node se utiliza para que trabaje en cada bloque padre de cada elemento y no se utilice siempre el primero
boton.value = botones.querySelector("span").textContent.match(regex).join(" "); //(.querySelector) va a seleccionar el primer elemento hijo del elemento padre})

//textContent : todo el texto que tiene adentro el elemento seleccionado previamente

//funcion match: captura todos los alfanumericos y los mete en un array - y el metodo join (" ") le da espacio a las palabras almacenadas con el match.
});

botonReproducir.forEach(boton => {
  boton.addEventListener("click", ()=>{
    for (let cancion of canciones) { //separa en constantes diferentees cada objeto en el JSON
      if(cancion.nombre.toLowerCase() === boton.value.toLowerCase()) // Comparamos si canciones.nombre es igual a boton.value (toLowerCase es una funcion predeterminada que si existe alguna mayuscula la toma como igual)
      {
        reproductorMusica.src = `${cancion.url}` //Se coloca template string porque debe pasarse como texto al html
        reproductorMusica.play(); //si encuentra todo va a pasar el URL a audio y le da play a la musica
        botonPlay.style.display = "none";
        botonPause.style.display = "block";
    }
    }
  } )
})

