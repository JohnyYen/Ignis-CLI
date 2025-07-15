# 🐉 Ignis CLI – Herramienta modular para crear proyectos desde plantillas

Ignis CLI es una herramienta de línea de comandos diseñada para ayudarte a **crear proyectos desde plantillas predefinidas**, con soporte para múltiples frameworks como React, NestJS, FastAPI, .NET y más.  
Es ideal para desarrolladores que quieren **arrancar proyectos rápidamente**, manteniendo consistencia en estructura, configuración y arquitectura.


## 🧰 Construido con

- **Node.js** + `npm`
- **commander** – Manejo de comandos y opciones
- **inquirer** – Preguntas interactivas en consola
- **fs-extra** – Operaciones avanzadas con archivos y carpetas
- **path** – Manipulación segura de rutas


## 📦 Instalación local

1. **Clona el repositorio:**

```bash
git clone https://github.com/JohnyYen/ignis-cli.git
cd ignis-cli
```

2. **Instala dependencias:**

```bash
npm install
```

3. **Enlaza globalmente (para probar el CLI):**

```bash
npm link
```

Ahora podrás usar el CLI desde cualquier carpeta:

```bash
ignis --help
```

---

## 🚀 Comandos principales

### 1. `ignis init`

Crea un nuevo proyecto desde una plantilla predefinida.

#### Uso:
```bash
ignis init [opciones]
```

#### Opciones:
| Flag | Descripción |
|------|-------------|
| `-f`, `--framework <name>` | Selecciona el framework (ej: react, nestjs) |
| `-t`, `--template <name>` | Selecciona la plantilla (ej: basic, clean-architecture) |
| `-n`, `--name <name>` | Nombre del proyecto |


#### Ejemplo:
```bash
ignis init -f react -t basic -n mi-app
```

Si omites alguna opción, el CLI te hará preguntas interactivas.

---

### 2. `ignis help`

Muestra la ayuda del CLI.

#### Uso:
```bash
ignis help
# o
ignis --help
# o
ignis init --help
```

---

## 📁 Estructura del proyecto

```
ignis-cli/
├── bin/
│   └── ignis.js            # Punto de entrada del CLI
├── commands/
│   └── init.js              # Comando principal para crear proyectos
├── config/
│   └── frameworks.json      # Frameworks y sus templates
├── templates/
│   └── react/
│       └── basic/
│           ├── package.json.ejs
│           └── README.md.ejs
├── utils/
│   └── generator.js         # Copiar y renderizar plantillas
└── package.json
```

---

## 🛠️ Características clave

- ✅ Soporta múltiples frameworks y plantillas
- ✅ Permite añadir nuevas funcionalidades fácilmente
- ✅ Modular y listo para escalar (features, nuevos frameworks, etc.)
- ✅ Funciona en Windows, macOS y Linux


## 🧩 Cómo agregar nuevos frameworks y templates

Añade el framework utilizando el comando `ignis add` y respondiendo las preguntas interactivas. Del resto se encargará el cli


## 💡 Próximos pasos posibles (extensiones)

- Implementar features dinámicas (`payment`, `auth`, etc.)
- Publicarlo en NPM para compartirlo
- Soportar Dockerfile, internacionalización, testing, etc., por plantilla

## 📌 Contribuir

¿Quieres mejorar Ignis CLI? ¡Perfecto!  
Puedes:
- Mejorar el sistema de features
- Crear comandos adicionales
- Documentar mejoras o errores


## 🎉 ¡Listo para empezar!

Con Ignis CLI, puedes **crear proyectos profesionales en segundos**, con **estructuras limpias y personalizables**, sin repetir configuraciones ni copiar manualmente archivos.

Empieza a construir tus propias plantillas y haz que otros también puedan arrancar rápido.
