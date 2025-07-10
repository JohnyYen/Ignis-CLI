const fs = require('fs-extra');
const path = require('path');
const { URL } = require('url');

async function updateCommand(program) {
    program
        .command('update')
        .option('-f, --framework <name>', 'Framework al que pertenece el template (ej: react, nestjs)')
        .option('-t, --template <name>', 'Nombre del template a actualizar (ej: basic, clean-architecture)')
        .option('-d, --desc <description>', 'Nueva descripción para el template')
        .description('Actualiza un template específico con una nueva versión')
        .action(async (options) => {
            let { framework, template, desc } = options;
            const frameworksPath = path.resolve(__dirname, '../config/frameworks.json');

            try {
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

                    template = answer.name
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

                    desc = answer.name
                }

                // Leer el archivo frameworks.json
                const data = await fs.readJson(frameworksPath);

                // Verificar si el framework existe
                if (!data[framework]) {
                    throw new Error(`El framework "${framework}" no existe`);
                }

                // Buscar el template
                const templateToUpdate = data[framework].templates.find(t => t.id === template);
                if (!templateToUpdate) {
                    throw new Error(`El template "${template}" no existe en el framework "${framework}"`);
                }

                if (desc) templateToUpdate.description = desc;

                // Guardar los cambios
                await fs.writeJson(frameworksPath, data, { spaces: 2 });

                // Mostrar resultado
                console.log('\n✅ Template actualizado correctamente:');
                console.log(`\nFramework: ${framework}`);
                console.log(`Template: ${template}`);
                if (url) console.log(`Nueva URL: ${url}`);
                if (desc) console.log(`Nueva descripción: ${desc}`);
                console.log('\nLos cambios han sido guardados en frameworks.json\n');

            } catch (error) {
                console.error('\n❌ Error al actualizar el template:');
                console.error(error.message);
                console.log('\nEjemplo de uso correcto:');
                console.log('ignis update -f react -t basic -u https://nueva-url.com/repo.git -d "Nueva descripción"');
                process.exit(1);
            }
        });
}

module.exports = updateCommand;
