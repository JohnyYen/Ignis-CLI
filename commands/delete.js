const fs = require('fs-extra');

async function deleteCommand(program) {
    program
    .command('delete')
    .option('-t, --template <name>', 'Eliminar un template especifico dado un framework')
    .option('-f, --framework <name>', 'Eliminar un framework completo')
    .description("Para eliminar templates o frameworks completos")
    .action((options) => {
        const {template, framework} = options

        if(template && framework){
            console.log("Eliminando template")
        }
        else if (framework && !template){
            console.log("Eliminando framework")
        }
        else{
            console.log('Debe de especificar el framework o el template en especifico')
        }
    })
}

module.exports = deleteCommand
