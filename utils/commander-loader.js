import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function loadCommands(program) {
  const commandsPath = path.resolve(__dirname, '../commands');

  if (!fs.existsSync(commandsPath)) return;

  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const commandName = file.replace('.js', '');
    const commandPath = path.join(commandsPath, file);
    import(`../commands/${file}`).then(commandModule => {
      if (typeof commandModule.default === 'function') {
        commandModule.default(program);
      } else {
        console.warn(`⚠️ El comando "${commandName}" no exporta una función por defecto`);
      }
    });
  }
}