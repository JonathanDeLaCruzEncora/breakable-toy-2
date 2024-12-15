# Usa una imagen oficial de Node.js como base
FROM node

# Define el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del frontend
COPY . .

# Construye la aplicación Next.js
#RUN npm run build

# Expón el puerto en el que se ejecutará la app (por defecto Next.js usa el 3000)
EXPOSE 3000

# Comando para ejecutar la aplicación
# CMD ["npm", "start"]
CMD ["npm", "run", "dev"]
