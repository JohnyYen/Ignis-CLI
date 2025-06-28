import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function listCommand(program) {
  const frameworksPath = path.resolve(__dirname, '../config/frameworks.json');

  program
    .command('list')
    .description('Lista todos los frameworks soportados')
    .action(async () => {
      const frameworks = JSON.parse(await fs.readFile(frameworksPath, 'utf8'));
      console.log("Frameworks soportados:");
      for (const [key, value] of Object.entries(frameworks)) {
        console.log(` - ${key}: ${value.name}`);
      }
    });
}