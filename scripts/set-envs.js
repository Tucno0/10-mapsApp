require("dotenv").config();

const { writeFileSync, mkdirSync } = require('fs');

const targetPath = `./src/environments/environment.ts`; // Path donde se encuentra environment.ts
const envFileContent = `
  export const environment = {
    mapbox_key: "${process.env.MAPBOX_KEY}",
    otra: "PROPIEDAD",
  };
`; // Este es el contenido del archivo environment.ts, aqui se pueden agregar mas propiedades

mkdirSync('./src/environments', { recursive: true }); // Crea la carpeta environments si no existe y si ya existe lo vuelvo a crear
writeFileSync(targetPath, envFileContent); // Escribo el archivo environment.ts con el contenido de envFileContent
