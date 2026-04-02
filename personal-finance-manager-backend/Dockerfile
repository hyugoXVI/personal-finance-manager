FROM eclipse-temurin:21
WORKDIR /app
COPY target/.*jar pfm.jar
RUN ["java", "-jar", "pfm.jar"]