import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

export async function generateFromTemplate(templatePath, targetPath, data) {
  if (fs.existsSync(targetPath)) {
    throw new Error(`La carpeta ${targetPath} ya existe.`);
  }

  await fs.copy(templatePath, targetPath);

  const walk = async (dir) => {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        await walk(filePath);
      } else if (file.endsWith('.ejs')) {
        const content = await fs.readFile(filePath, 'utf8');
        const rendered = ejs.render(content, data);
        const newFilePath = filePath.replace('.ejs', '');
        await fs.writeFile(newFilePath, rendered);
        await fs.unlink(filePath);
      }
    }
  };

  await walk(targetPath);
}