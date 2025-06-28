import inquirer from 'inquirer';
import path from 'path';
import { generateProject } from '../utils/generator';

export default async function genericGenerator({ framework, config }) {
  const TEMPLATES_DIR = path.resolve('./templates', framework);

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'base',
      message: `Selecciona una plantilla base para ${framework}:`,
      choices: config.templates.map(t => ({ name: t.description, value: t.id }))
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'Nombre del proyecto:',
      default: `my-${framework}-project`
    },
    {
      type: 'checkbox',
      name: 'features',
      message: '¿Qué características deseas incluir?',
      choices: config.features.map(f => ({ name: f, value: f }))
    }
  ]);

  const templateBasePath = path.join(TEMPLATES_DIR, answers.base);
  const targetDir = path.resolve(answers.projectName);

  await generateProject(
    templateBasePath,
    targetDir,
  );

  console.log(`✅ Proyecto "${answers.projectName}" creado exitosamente.`);
}