# Usa una imagen oficial de OpenJDK como base
FROM eclipse-temurin:21

# Define el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo JAR de la aplicación desde el backend
COPY build/libs/*.jar /app/backend.jar
#COPY . /app

# Expón el puerto en el que Spring Boot ejecuta la aplicación (por defecto 8080)
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "/app/backend.jar"]