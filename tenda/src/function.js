const fs = require('fs');
const https = require('https');

export function descargarImagen(url, carpetaDestino, nombreArchivo) {
  https.get(url, (response) => {
    if (response.statusCode !== 200) {
      console.error(`Error al descargar la imagen. Código de estado: ${response.statusCode}`);
      return;
    }

    const archivoDestino = `${carpetaDestino}/${nombreArchivo}`;
    const escrituraStream = fs.createWriteStream(archivoDestino);

    response.pipe(escrituraStream);

    escrituraStream.on('finish', () => {
      console.log(`Imagen descargada y guardada en ${archivoDestino}`);
    });

    escrituraStream.on('error', (error) => {
      console.error(`Error al guardar la imagen: ${error}`);
    });
  });
}

