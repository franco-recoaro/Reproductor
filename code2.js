let indiceInicio;


function cancionSiguiente() {
    let indiceAlbum = -1;
    let indiceCancion = -1;

    albums.forEach((cancion) => {
      indiceCancion = cancion.Listado.findIndex((can) => {
      return can.id == indiceInicio})
    })

    albums.forEach((cancion, index) => {
    if (cancion.Listado[indiceCancion].id === indiceInicio) {
    indiceAlbum = index;
    return;
  }
    });
    reproductorMusica.src = albums[indiceAlbum].Listado[indiceCancion + 1].url
  }

  indiceInicio = cancionesListados.id;

  botonNextReproductor.addEventListener("click", cancionSiguiente);
