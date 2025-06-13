# Use the official Node.js 20 image
FROM node:20

# Instala pnpm usando corepack (viene con Node 20+)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set the working directory
WORKDIR /usr/src/app

# Copia package.json y lockfile
COPY package*.json ./

# Instala dependencias
RUN pnpm install

# Copia el resto del código
COPY . .

# Compila el proyecto
RUN pnpm build

# Expone el puerto (ajusta si cambia)
EXPOSE 4001

# Comando por defecto
CMD ["node", "dist/main"]
