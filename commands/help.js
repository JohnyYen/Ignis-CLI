export default function helpCommand(program) {
  program
    .command('help')
    .description('Muestra la ayuda del CLI')
    .action(() => {
      console.log(`
Ignis CLI - Herramienta para crear proyectos desde plantillas predefinidas

📌 Uso básico:
  ignis <comando> [opciones]

🔧 Comandos disponibles:
  create      Crea un nuevo proyecto desde una plantilla
  help        Muestra esta ayuda

⚙️ Opciones para 'create':
  -f, --framework <name>     Framework del proyecto (ej: react, nestjs)
  -t, --template <name>      Nombre de la plantilla (ej: basic, hexagonal)
  -n, --name <name>          Nombre del proyecto

📝 Ejemplos:
  ignis create
  ignis create -f react -t basic -n mi-app
  ignis create -f nestjs -t hexagonal --name api-proyecto

📄 Más información: https://github.com/tuuser/ignis 
`);
    });
}