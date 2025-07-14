const fs = require("fs-extra");
const path = require("path");

async function generateProject(templatePath, targetPath) {
  if (await fs.pathExists(targetPath)) {
    throw new Error(`La carpeta "${targetPath}" ya existe.`);
  }

  await fs.copy(templatePath, targetPath);

  console.log(`📁 Copiando desde ${templatePath} a ${targetPath}`);
}

module.exports = generateProject;
