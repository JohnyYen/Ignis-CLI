const fs = require('fs-extra');
const path = require('path');

async function deleteCommand(program) {
    program
        .command('remove')
        .option('-t, --template <name>', 'Eliminar un template específico dado un framework')
        .option('-f, --framework <name>', 'Eliminar un framework completo')
        .description("Para eliminar templates o frameworks completos")
        .action(async (options) => {
            const { template, framework } = options;
            const frameworksPath = path.resolve(__dirname, '../config/frameworks.json');

            try {
                const data = await fs.readJson(frameworksPath);

                if (template && framework) {
                    // Eliminar template específico
                    if (data[framework]) {
                        const templateIndex = data[framework].templates.findIndex(t => t.id === template);
                        if (templateIndex !== -1) {
                            data[framework].templates.splice(templateIndex, 1);
                            await fs.writeJson(frameworksPath, data, { spaces: 2 });
                            console.log(`✅ Template "${template}" eliminado del framework "${framework}"`);
                        } else {
                            console.log(`❌ No se encontró el template "${template}" en el framework "${framework}"`);
                        }
                    } else {
                        console.log(`❌ No se encontró el framework "${framework}"`);
                    }
                } else if (framework && !template) {
                    // Eliminar framework completo
                    if (data[framework]) {
                        delete data[framework];
                        await fs.writeJson(frameworksPath, data, { spaces: 2 });
                        console.log(`✅ Framework "${framework}" eliminado correctamente`);
                    } else {
                        console.log(`❌ No se encontró el framework "${framework}"`);
                    }
                } else {
                    console.log('Debe especificar el framework (-f) o el template (-t) en específico');
                    console.log('Ejemplos:');
                    console.log('  ignis remove -f react -t basic → Elimina el template "basic" de React');
                    console.log('  ignis remove -f nestjs → Elimina todo el framework NestJS');
                }
            } catch (error) {
                console.error('❌ Error al procesar la eliminación');
            }
        });
}

module.exports = deleteCommand;
