const { exec } = require("child_process");
const path = require("path");
const fs = require("fs-extra");

async function cloneTemplate(repoUrl, framework, template) {
  const targetDir = path.resolve(`./templates/${framework}/${template}`);

  try {
    await executeCommand(
      `git clone --depth 1 ${repoUrl} "${targetDir}"`,
      { stdio: "inherit" } // Mostrar output en tiempo real
    );
  } catch (error) {
    console.error(`❌ Error al clonar template:`);
    console.error(error.message);

    if (fs.existsSync(targetDir)) {
      await fs.remove(targetDir);
    }
    return false;
  }
}

async function pullTemplate(repoUrl, framework, template) {
  const targetDir = path.resolve(`./templates/${framework}/${template}`);

  try {
    await executeCommand(
      `git pull --depth 1 ${repoUrl}`,
      { stdio: "inherit" } // Mostrar output en tiempo real
    );
  } catch (error) {
    console.error(`❌ Error al actualizar el template:`);
    console.error(error.message);
    return false;
  }
}

// Helper para ejecutar comandos con promesas
function executeCommand(cmd, options = {}) {
  return new Promise((resolve, reject) => {
    exec(cmd, options, (error, stdout, stderr) => {
      if (error) {
        error.stderr = stderr;
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

// Validación básica de URL Git
function isValidGitUrl(url) {
  return (
    /^(https?|git):\/\/.+\..+$/.test(url) || /^git@.+:.+\/.+\.git$/.test(url)
  );
}

// Actualizar el Json de Templates
async function readTemplateJson() {
  const frameworksPath = path.resolve(__dirname, "../config/frameworks.json");
  const frameworks = JSON.parse(await fs.readFile(frameworksPath, "utf8"));

  return frameworks;
}

async function deleteTemplateInJson(framework, name) {
  const templates = await readTemplateJson();
  console.log(templates);
}

async function writeTemplateInJson(framework, name, description, url) {
  const templates = await readTemplateJson();
  const lowerFramework = framework.toLowerCase();

  if (templates[lowerFramework]) {
    const newTemplate = {
      id: name,
      description,
      repo: url,
    };

    const exists = templates[lowerFramework].templates.some(
      (t) => t.id === name
    );

    if (exists) {
      console.log(`❌ La plantilla "${name}" ya existe en "${framework}".`);
      return false;
    }

    templates[lowerFramework].templates.push(newTemplate);
    console.log(`✅ Plantilla "${name}" agregada al framework "${framework}".`);

  } else {
    templates[lowerFramework] = {
      name: framework,
      templates: [
        {
          id: name,
          description,
          repo: url,
        },
      ],
    };

    console.log(`✅ Framework "${framework}" creado y plantilla "${name}" agregada.`);
  }

  const filePath = path.resolve(__dirname, '../config/frameworks.json');
  await fs.writeJson(filePath, templates, { spaces: 2 });

  console.log(`💾 Configuración guardada en ${filePath}`);

  return true;
}

async function updateTemplateInJson(framework, name, description) {
  const templates = await readTemplateJson();
  for (const framework of templates) {
    console(templates);
  }
  console.log(templates);
}

module.exports = {
  isValidGitUrl,
  pullTemplate,
  cloneTemplate,
  readTemplateJson,
  deleteTemplateInJson,
  writeTemplateInJson,
  updateTemplateInJson,
};
