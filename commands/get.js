function getCommand(program){
    program
    .command('add')
    .description('Obtener el template desde la url de un repositorio de git')
    .action((options) => {
        console.log('Comando get')
    })
}

module.exports = getCommand
