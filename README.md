# Ignis CLI - Gestor de Templates de Desarrollo

![Ignis CLI Logo](https://via.placeholder.com/150x50?text=Ignis+CLI)
*Herramienta para crear y gestionar plantillas de proyectos de desarrollo*

## 📦 Instalación

```bash
npm install -g ignis-cli
```

## 🚀 Uso Básico

```bash
ignis [comando] [opciones]
```

## 🔧 Comandos Principales

### 1. Crear un nuevo proyecto
```bash
ignis init -f react -t basic -n mi-proyecto
```

O en modo interactivo:
```bash
ignis init
```

### 2. Gestionar Templates
| Comando | Ejemplo | Descripción |
|---------|---------|-------------|
| `list`  | `ignis list -t` | Lista todos los frameworks y templates |
| `add`   | `ignis add -f vue -t admin -u https://repo.com` | Añade un nuevo template |
| `remove`| `ignis remove -f react -t basic` | Elimina un template |
| `update`| `ignis update -f nestjs -t api -u https://nuevo-repo.com` | Actualiza un template |

## 📚 Ejemplos Completos

### Crear proyecto React con TypeScript
```bash
ignis init -f react -t typescript -n mi-app-react --git
```

### Actualizar template existente
```bash
ignis update -f react -t basic -u https://github.com/nuevo-repo.git -d "Nueva versión"
```

### Listar todos los templates disponibles
```bash
ignis list -t
```

## 🛠️ Configuración

Configura rutas por defecto:
```bash
ignis config set templates_path ~/mis-templates
```

## 📄 Estructura de frameworks.json

```json
{
  "react": {
    "name": "React",
    "templates": [
      {
        "id": "basic",
        "description": "Plantilla básica con React",
        "repo": "https://github.com/ejemplo/react-basic.git"
      }
    ]
  }
}
```

## 🤝 Contribuir

1. Haz fork del proyecto
2. Crea tu rama (`git checkout -b feature/nueva-funcion`)
3. Haz commit de tus cambios (`git commit -am 'Añade nueva función'`)
4. Haz push a la rama (`git push origin feature/nueva-funcion`)
5. Abre un Pull Request
