const fs = require('fs-extra')
const inq = require('inquirer')
const path = require('path')
const generateProject = require('../utils/generator')

const inquirer = inq.default

function createCommand(program) {
  const frameworksPath = path.resolve(__dirname, '../config/frameworks.json');
  const frameworks = JSON.parse(fs.readFileSync(frameworksPath, 'utf8'));

  program
    .command('new')
    .description('Crea un proyecto desde una plantilla')
    .option('-f, --framework <name>', 'Framework del proyecto (ej: react, nestjs)')
    .option('-t, --template <name>', 'Nombre de la plantilla (ej: basic, hexagonal)')
    .option('-n, --name <name>', 'Nombre del proyecto')
    .action(async (options) => {
      let { framework, template, name } = options;

      // 1. Seleccionar framework si no se provee
      if (!framework) {
        const answer = await inquirer.prompt([
          {
            type: 'list',
            name: 'framework',
            message: '¿Qué tipo de proyecto deseas crear?',
            choices: Object.keys(frameworks).map(key => ({
              name: `${frameworks[key].name} (${key})`,
              value: key,
            })),
          },
        ]);
        framework = answer.framework;
      } else if (!frameworks[framework]) {
        console.error(`❌ Framework no soportado: ${framework}`);
        console.log("Frameworks soportados:", Object.keys(frameworks));
        return;
      }

      const frameworkConfig = frameworks[framework];

      // 2. Seleccionar template si no se provee
      if (!template) {
        const answer = await inquirer.prompt([
          {
            type: 'list',
            name: 'template',
            message: 'Selecciona una plantilla:',
            choices: frameworkConfig.templates.map(t => ({
              name: t.description,
              value: t.id,
            })),
          },
        ]);
        template = answer.template;
      } else if (!frameworkConfig.templates.some(t => t.id === template)) {
        console.error(`❌ Template "${template}" no válido para framework "${framework}"`);
        console.log(`Templates válidos para ${framework}:`, frameworkConfig.templates.map(t => t.id));
        return;
      }

      // 3. Seleccionar nombre si no se provee
      if (!name) {
        const answer = await inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'Nombre del proyecto:',
            default: `my-${framework}-app`,
          },
        ]);
        name = answer.name;
      }

      const templatePath = path.resolve(`./templates/${framework}/${template}`);
      const targetPath = path.resolve(name);

      try {
        await generateProject(templatePath, targetPath);
        console.log(`✅ Proyecto "${name}" creado exitosamente.`);
      } catch (err) {
        console.error(`❌ Error al crear el proyecto: ${err.message}`);
      }
    });
}


module.exports = createCommand
