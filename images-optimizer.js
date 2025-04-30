// Script para optimizar imágenes con sharp

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'src/images';  // Ruta donde están las imágenes originales
const staticDir = 'src/icon';    // Ruta para iconos y recursos estáticos originales
const outputDirImages = 'src/images/optimized'; // Ruta de salida para las imágenes optimizadas
const outputDirIcon = 'src/icon/optimized'; // Ruta de salida para los iconos optimizados

const sizes = [480, 768, 1200]; // Tamaños de imágenes deseados

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
    // WebP
    sharp(inputFile)
      .resize({ width: size })
      .webp({ quality: 75 })
      .toFile(path.join(outputDirImages, `${baseName}-${size}.webp`))
      .then(() => console.log(`Creado: ${baseName}-${size}.jpg`))
      .catch(err => console.error(`ERROR WebP ${file}:`, err));

    // JPEG
    sharp(inputFile)
      .resize({ width: size })
      .jpeg({ quality: 80 })
      .toFile(path.join(outputDirImages, `${baseName}-${size}.jpg`))
      .then(() => console.log(`Creado: ${baseName}-${size}.jpg`))
      .catch(err => console.error(`ERROR JPEG ${file}:`, err));
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
    .then(() => console.log(`Icono WebP optimizado: ${baseName}.webp`))
    .catch(err => console.error(`ERROR Icono WebP ${file}:`, err));

  // JPEG
  sharp(inputFile)
    .jpeg({ quality: 85 })
    .toFile(path.join(outputDirIcon, `${baseName}.jpg`))
    .then(() => console.log(`Icono JPEG optimizado: ${baseName}.jpg`))
    .catch(err => console.error(`ERROR Icono JPEG ${file}:`, err));
});

console.log('Procesando las imágenes...');