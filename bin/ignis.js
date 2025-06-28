import { program } from 'commander';
import loadCommands from '../utils/commander-loader';
import createCommand from '../commands/create';
import helpCommand from '../commands/help';
import listCommand from '../commands/list';

createCommand(program)
helpCommand(program)
listCommand(program)

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse(process.argv);