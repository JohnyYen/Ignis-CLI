const fs = require('fs-extra')

async function updateCommand(program) {
    program
    .command('update')
    .option('-f, --framework <name>', "Debe de especificarse")
    .option('-t, --template <name>', 'Especificar el nombre del template')
    .option('-u, --url', 'Especificar la url del nuevo template')
    .description('Para actualizar un template con una version nueva')
    .action((options) => {
        const {framework, template, url} = options
    })
}

module.exports = updateCommand
