# FullStack Proyecto Final Modulo 1
 
El proyecto consiste en una aplicación web de gestión de tareas que implementa las operaciones CRUD (crear, visualizar, editar, marcar como completadas y eliminar tareas). La información se sincroniza y actualiza en tiempo real, reflejando los cambios inmediatamente en la interfaz del usuario.

[![CI](https://github.com/La-Rivkah/fullstack-finalproject/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/La-Rivkah/fullstack-finalproject/actions/workflows/ci.yml)
 
## 🚀 Instalación local
 
```bash
git clone https://github.com/La-Rivkah/fullstack-finalproject.git
cd fullstack-finalproject
npm install
```
 
### Variables de entorno
Crea un archivo `.env` en la raíz con las siguientes claves (sin valores reales en este documento):
 
```
DATABASE_URL=
JWT_SECRET=
PORT=
```
 
## 📜 Comandos disponibles
 
| Comando          | Descripción                                |
|------------------|--------------------------------------------|
| `npm run dev`    | Levanta el entorno de desarrollo           |
| `npm run build`  | Genera el build de producción              |
| `npm test`       | Corre las pruebas automatizadas (pendiente — Sesión 3) |
 
## 🗄️ Base de datos
 
PostgreSQL con migraciones y seeds gestionados con Prisma (ver Módulo 2).

# Funcionalidades

- Crear nuevas tareas.
- Editar tareas existentes.
- Marcar tareas como completadas.
- Eliminar tareas.
- Actualización de la información en tiempo real.

# Estructura del proyecto

- `frontend/`: interfaz de usuario.
- `backend/`: API y lógica de negocio.
- `prisma/`: esquema y migraciones de la base de datos.

# Tecnologías utilizadas

- React
- TypeScript
- Node.js
- Express
- PostgreSQL
- Prisma