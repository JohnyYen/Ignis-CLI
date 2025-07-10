const { exec } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

async function cloneTemplate(repoUrl, framework, template) {
    const targetDir = path.resolve(`./templates/${framework}/${template}`);

    try {
        await executeCommand(
            `git clone --depth 1 ${repoUrl} "${targetDir}"`,
            { stdio: 'inherit' } // Mostrar output en tiempo real
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
            { stdio: 'inherit' } // Mostrar output en tiempo real
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
    return /^(https?|git):\/\/.+\..+$/.test(url) ||
        /^git@.+:.+\/.+\.git$/.test(url);
}


module.exports = {
    isValidGitUrl,
    pullTemplate,
    cloneTemplate
}
