const fs = require('fs-extra');
const path = require('path');

async function listCommand(program) {
  const frameworksPath = path.resolve(__dirname, '../config/frameworks.json');

  program
    .command('list')
    .option('-t, --template', "Lista además todos las plantillas por framework")
    .option('-f, --framework <name>', "Lista todos los templates de un framework en específico")
    .description('Lista todos los frameworks soportados')
    .action(async (options) => {
        const frameworks = JSON.parse(await fs.readFile(frameworksPath, 'utf8'));
        const {framework, template} = options;

        console.log('\nIGNIS CLI - LISTA DE RECURSOS\n');

        if (template && !framework){
            console.log('PLANTILLAS POR FRAMEWORK:\n');

            for(const [key, value] of Object.entries(frameworks)) {
                console.log(`┌─ ${value.name.toUpperCase()} ${'─'.repeat(50 - value.name.length)}`);
                for(const templ of value.templates) {
                    console.log(`│  • ${templ.id.padEnd(20)} ${templ.description}`);
                }
                console.log(`└${'─'.repeat(52)}\n`);
            }
        }
        else if(template && framework){
            let find = false;

            for(const [_, value] of Object.entries(frameworks)) {
                if(value.name.toLowerCase() === framework.toLowerCase()){
                    find = true;
                    console.log(`PLANTILLAS PARA ${value.name.toUpperCase()}:\n`);
                    console.log(`┌${'─'.repeat(52)}`);
                    for(const templ of value.templates) {
                        console.log(`│  • ${templ.id.padEnd(20)} ${templ.description}`);
                    }
                    console.log(`└${'─'.repeat(52)}\n`);
                    break;
                }
            }

            if(!find) {
                console.log('El framework especificado no existe\n');
                console.log('FRAMEWORKS DISPONIBLES:');
                for(const [_, value] of Object.entries(frameworks)) {
                    console.log(`- ${value.name}`);
                }
            }
        }
        else{
            console.log('FRAMEWORKS SOPORTADOS:\n');
            console.log('┌'+'─'.repeat(52));
            for (const [_, value] of Object.entries(frameworks)) {
                console.log(`│  • ${value.name.padEnd(20)} (${value.templates.length} plantillas)`);
            }
            console.log('└'+'─'.repeat(52)+'\n');
        }

        console.log('Usa --help para ver más opciones\n');
    });
}

module.exports = listCommand;
