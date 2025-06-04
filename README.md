# Pre-requisitos a considerar. 
- NodeJs >= 20.*.*
- Docker desktop

## Correr en development

1. Clonar el repositorio 
3. Renombrar el archivo `.env.template` a `.env` y cambiar las variables de entorno
2. Instalar dependencias `npm install`
4. Levantar la base de datos con `docker compose up -d` 
5. correr las migraciones `npx prisma migrate dev`
6. Ejecutar el seed `npm run seed`
7. Ejecutar el proyecto `npm run dev`


- Inicializamos prisma en modo desarrollo `npm install prisma --save-dev`
- `npx prisma init --datasource-provider PostgreSQL`
- Correr las migraciones de prisma`npx prisma migrate dev --name name_of_migrate`
 