# Etapa de construcción
FROM node:16-alpine AS builder

# Crea el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de definición de paquetes
COPY package.json yarn.lock ./

# Instala las dependencias
RUN yarn install --frozen-lockfile

# Copia los archivos y carpetas restantes del proyecto
COPY . .

# Construye la aplicación
RUN yarn build

# Etapa de ejecución
FROM node:16-alpine AS runner

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia la construcción desde la etapa de construcción
COPY --from=builder /usr/src/app/dist ./dist

# Copia solo las dependencias de producción
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/yarn.lock ./yarn.lock

RUN yarn install --production --frozen-lockfile

# Expone el puerto en el que tu aplicación se ejecutará
EXPOSE 3000

# Define el comando para ejecutar tu aplicación
CMD ["node", "dist/main"]
