const { cloneTemplate, isValidGitUrl } = require('../utils/helper')
const path = require('path');
const fs = require('fs-extra');
const inq = require('inquirer')
const { frameworks } = require('../config/index');
const { log } = require('console');

function getCommand(program) {
    program
        .command('add')
        .option('-u, --url <name>', 'Url del repositorio de git')
        .option('-n, --name <name>', "Nombre de la plantilla")
        .option('-f, --framework <name>', "Framework al que pertenece la plantilla")
        .option("-d, --description <name>", "Descripción de la plantilla")
        .description('Obtener el template desde la url de un repositorio de git')
        .action(async (options) => {
            let { url, name, description, framework } = options;
            let valid = true;
            const targetDir = path.resolve(`./templates/${framework}/${name}`);
            if (!framework) {
                const answer = await inq.default.prompt([
                    {
                        type: 'select',
                        name: "framework",
                        message: "Con que framework vas a trabajar?",
                        choices: frameworks.map(key => ({
                            name: `${key}`,
                            value: key
                        }))
                    }
                ])
                framework = answer.framework
            }
            if (!name) {
                const answer = await inq.default.prompt([
                    {
                        type: 'input',
                        name: "name",
                        message: "Dale un nombre a tu template",
                        default: 'default-template'
                    }
                ])

                name = answer.name
            }

            if (!description) {
                const answer = await inq.default.prompt([
                    {
                        type: 'input',
                        name: "description",
                        message: "Dale una descripción a la plantilla",
                        default: '....'
                    }
                ])

                description = answer.description
            }

            if (!url) {
                const answer = await inq.default.prompt([
                    {
                        type: 'input',
                        name: "url",
                        message: "Cúal es la url del repo del template"
                    }
                ])

                url = answer.url                
            }
            if (!isValidGitUrl(url)){
                console.log(`❌ URL de repositorio inválida: ${url}`);
                valid = false;
            }

            if(valid){

                await fs.ensureDir(path.dirname(targetDir));

                if (fs.existsSync(targetDir))
                    console.log(`El template "${name}" ya existe en ${framework}`);

                console.log(`🔄 Clonando ${url} a ${targetDir}...`);

                await cloneTemplate(url, framework, name);

                console.log(`✅ Template agregado exitosamente`);
            }


        })
}

module.exports = getCommand
