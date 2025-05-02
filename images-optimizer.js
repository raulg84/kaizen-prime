// Script para optimizar imágenes con sharp

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'src/images';  // Ruta donde están las imágenes originales
const staticDir = 'src/icon';    // Ruta para iconos y recursos estáticos originales
const outputDirImages = 'src/images/optimized'; // Ruta de salida para las imágenes optimizadas
const outputDirIcon = 'src/icon/optimized'; // Ruta de salida para los iconos optimizados

const sizes = [480, 768, 1200]; // Tamaños de imágenes deseados
const recortar = ['sushi-salmon.jpg', 'makis-variados.jpg', 'ramen-cerdo.jpg', 'ramen-pollo.jpg', 'te-verde.jpg', 'cheesecake-japones.jpg', 'edamame.jpg', 'gyozas.jpg'
  , 'katsudon.jpg', 'gyudon.jpg', 'kate-udom.png', 'tempura-soba.jpg', 'yakitori.jpg', 'salmon-teriyaki.jpg', 'bento-clasico.jpg', 'bento-pollo.jpg', 'sake-tradicional.jpg'
  , 'cerveza-asahi.jpg', 'te-verde.jpg', 'te-matcha.jpg'
];

// Creamos las carpetas de salida si no existen
if (!fs.existsSync(outputDirImages)) {
  fs.mkdirSync(outputDirImages, { recursive: true });
}
if (!fs.existsSync(outputDirIcon)) {
  fs.mkdirSync(outputDirIcon, { recursive: true });
}

// Procesar imágenes JPEG de toda la aplicación
fs.readdirSync(inputDir).forEach(file => {
  // Excluir archivos no válidos como el .DS_Store creado en el finder del mac
  if (file.startsWith('.') || !['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase())) {
    return;
  }

  const inputFile = path.join(inputDir, file);
  const baseName = path.parse(file).name;

  sizes.forEach(size => {

    //Imágenes de menú (Recortamos desde 0,0)
    if (recortar.includes(path.basename(file).toLowerCase()) && 1200 != size) {

      // WebP
      sharp(inputFile)
        .extract({ left: 0, top: 0, width: size, height: size })
        .resize({ width: size })
        .webp({ quality: 75 })
        .toFile(path.join(outputDirImages, `${baseName}-${size}.webp`))
        .then(() => {
          const sizeInBytes = getFileSize(path.join(outputDirImages, `${baseName}-${size}.webp`));
          console.log(` ${baseName}-${size}.webp - ${(sizeInBytes / 1024).toFixed(2)} KB`);
          //console.log(`Creado: ${baseName}-${size}.webp - ${(sizeInBytes / 1024).toFixed(2)} KB`);

        })
        .catch(err => console.error(`ERROR WebP ${file}:`, err));

      // JPEG
      sharp(inputFile)
        .extract({ left: 0, top: 0, width: size, height: size })
        .resize({ width: size })
        .jpeg({ quality: 80 })
        .toFile(path.join(outputDirImages, `${baseName}-${size}.jpg`))
        .then(() => {
          const sizeInBytes = getFileSize(path.join(outputDirImages, `${baseName}-${size}.jpg`));
          console.log(` ${baseName}-${size}.jpg - ${(sizeInBytes / 1024).toFixed(2)} KB`);
          //console.log(`Creado: ${baseName}-${size}.jpg - ${(sizeInBytes / 1024).toFixed(2)} KB`);

        })
        .catch(err => console.error(`ERROR JPEG ${file}:`, err));

      //Resto de imágenes 8reducimos tamaño)
    } else {

      // WebP
      sharp(inputFile)
        .resize({ width: size })
        .webp({ quality: 75 })
        .toFile(path.join(outputDirImages, `${baseName}-${size}.webp`))
        .then(() => {
          const sizeInBytes = getFileSize(path.join(outputDirImages, `${baseName}-${size}.webp`));
          console.log(` ${baseName}-${size}.webp - ${(sizeInBytes / 1024).toFixed(2)} KB`);
          //console.log(`Creado: ${baseName}-${size}.webp - ${(sizeInBytes / 1024).toFixed(2)} KB`);

        })
        .catch(err => console.error(`ERROR WebP ${file}:`, err));

      // JPEG
      sharp(inputFile)
        .resize({ width: size })
        .jpeg({ quality: 80 })
        .toFile(path.join(outputDirImages, `${baseName}-${size}.jpg`))
        .then(() => {
          const sizeInBytes = getFileSize(path.join(outputDirImages, `${baseName}-${size}.jpg`));
          console.log(` ${baseName}-${size}.jpg - ${(sizeInBytes / 1024).toFixed(2)} KB`);
          //console.log(`Creado: ${baseName}-${size}.jpg - ${(sizeInBytes / 1024).toFixed(2)} KB`);

        })
        .catch(err => console.error(`ERROR JPEG ${file}:`, err));

    }
  });
});

// Procesar logos y recursos estáticos (sin redimensionar)
fs.readdirSync(staticDir).forEach(file => {
  // Excluir archivos no válidos como el .DS_Store creado en el finder del mac
  if (file.startsWith('.') || !['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase())) {
    return;
  }

  const inputFile = path.join(staticDir, file);
  const baseName = path.parse(file).name;

  // WebP
  sharp(inputFile)
    .webp({ quality: 80 })
    .toFile(path.join(outputDirIcon, `${baseName}.webp`))
    .then(() => {
      const sizeInBytes = getFileSize(path.join(outputDirIcon, `${baseName}.webp`));
      console.log(` ${baseName}.webp - ${(sizeInBytes / 1024).toFixed(2)} KB`)
      //console.log(`Icono WebP optimizado: ${baseName}.webp - ${(sizeInBytes / 1024).toFixed(2)} KB`)

    })
    .catch(err => console.error(`ERROR Icono WebP ${file}:`, err));

  // JPEG
  sharp(inputFile)
    .jpeg({ quality: 85 })
    .toFile(path.join(outputDirIcon, `${baseName}.jpg`))
    .then(() => {
      const sizeInBytes = getFileSize(path.join(outputDirIcon, `${baseName}.jpg`));
      console.log(` ${baseName}.jpg - ${(sizeInBytes / 1024).toFixed(2)} KB`)
      //console.log(`Icono JPEG optimizado: ${baseName}.jpg - ${(sizeInBytes / 1024).toFixed(2)} KB`)

    })
    .catch(err => console.error(`ERROR Icono JPEG ${file}:`, err));
});

console.log('Procesando las imágenes...');

// Función para obtener el tamaño de un archivo en bytes
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size; // Tamaño en bytes
  } catch (err) {
    console.error(`Error al obtener el tamaño del archivo: ${filePath}`, err);
  }
}
