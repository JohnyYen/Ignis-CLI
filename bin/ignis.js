const { program } = require('commander')
const listCommand = require('../commands/list')
const initCLI = require('../commands/init')
//const initCommand = require('../commands/init')


initCLI()

//initCommand(program)
//helpCommand(program)
listCommand(program)

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse(process.argv);
