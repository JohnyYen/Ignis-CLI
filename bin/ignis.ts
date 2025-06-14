import { program } from 'commander';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templates = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/templates.json')));

// Cargar generadores dinámicamente
const generators = {};
Object.keys(templates).forEach((lang) => {
  generators[lang] = import(`../generators/${lang}.js`).then(m => m.default);
});

program
  .command('create <language>')
  .description('Crea un proyecto desde un template')
  .action(async (language) => {
    if (!templates[language]) {
      console.error(`❌ Lenguaje no soportado: ${language}`);
      console.log("Frameworks soportados:", Object.keys(templates));
      return;
    }

    const generator = await generators[language];
    await generator({
      language,
      templates: templates[language].templates,
    });
  });

program.parse(process.argv);