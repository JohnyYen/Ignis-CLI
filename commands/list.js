const fs = require('fs-extra')
const path = require('path')
const {fileURLToPath} = require("url")

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

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

        if (template && !framework){
            console.log("Plantillas por framework: ");

            for(const [key, value] of Object.entries(frameworks)) {
                console.log(`- ${value.name}`)
                for(const [_, templ] of Object.entries(value.templates)) {
                    console.log(`* ${templ.id}   ${templ.description}`);
                }
            }
        }
        else if(template && framework){
            let find = false;

            for(const [_, value] of Object.entries(frameworks)) {
                if( value.name === framework){
                    console.log(`Plantillas para ${value.name}: `);
                    find = true
                    for(const [_, templ] of Object.entries(value.templates))
                        console.log(`* ${templ.id}   ${templ.description}`);
                }

            }

            if(!find)
                console.log("El framework específicado no existe")
        }
        else{
            console.log("Frameworks soportados:");
            for (const [key, value] of Object.entries(frameworks)) {
                console.log(` - ${value.name}`);
            }
        }
    });
}

module.exports = listCommand
