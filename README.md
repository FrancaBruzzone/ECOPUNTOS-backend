# ECOPUNTOS-backend

Este repositorio contiene el código fuente del backend para el sistema ECOPUNTOS

## 1. Ejecución

### 1.1. Base de Datos

Se necesita tener MySQL corriendo localmente y configurar las variables de entorno en un archivo .env:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=user
DB_PASSWORD=password
DB_DATABASE=dbName
```

### 1.2. En la carpeta app ejecutar el siguiente comando:

```
npm run build
```

### 1.3. En la carpeta app ejecutar el siguiente comando:

```
npm start
```

# Prettier

Se instala Prettier para tener todos los integrantes del equipo el mismo formato de código, especialmente útil para evitar conflictos.

## Como configurarlo:

- [Guía de instalación](https://prettier.io/docs/en/install.html).
- En Visual Studio Code:

Paso 1: Descargar la extensión

<img width="740" alt="1" src="https://github.com/IngSoft-ASP-2023-2/234065_147434_242951/assets/44500737/cf456c3d-7b09-4bb7-a3c2-29b6e07b192d">

Paso 2: Seleccionarlo como el editor de formateo por defecto, para cambiar este ajuste, abra el menú de Settings y busque en el editor: Default Formatter

<img width="684" alt="2" src="https://github.com/IngSoft-ASP-2023-2/234065_147434_242951/assets/44500737/c61336d3-f0df-4544-8770-8f9d78fd1539">

Paso 3: Configurar el formateo al guardar, para cambiar este ajuste, abra el menú de Settings y busque en el editor: Format On Save

<img width="725" alt="3" src="https://github.com/IngSoft-ASP-2023-2/234065_147434_242951/assets/44500737/e1d71f4f-030d-48a3-bd6f-be1af877cf27">

## Comandos Útiles:

**Ejecutar el formateo de prettier:**

```bash
npx prettier . --write
```

**Validar la solución en cuanto al formato de código:**

```bash
npm run check-format
```

**Inicializar un proyecto de Node.js:**

```
npm init -y
```

**Crear un archivo de configuración de Typescript ('tsconfig.json'):**

```
tsc --init
```
