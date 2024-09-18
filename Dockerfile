FROM maven:3.8.6-eclipse-temurin-17 as builder
WORKDIR /DocumentAccounting2/opt/app
COPY mvnw pom.xml /DocumentAccounting2
COPY /DocumentAccounting2/src /DocumentAccounting2/src
RUN mvn clean install -DskipTests


FROM eclipse-temurin:17-jre-jammy
WORKDIR /DocumentAccounting2/opt/app
EXPOSE 8080
COPY --from=builder /DocumentAccounting2/opt/app/target/*.jar /DocumentAccounting2/opt/app/*jar
ENTRYPOINT ["java", "-jar", "/DocumentAccounting2/opt/app/*jar"]


FROM node:18-alpine
WORKDIR /frontend/app
EXPOSE 3000
COPY /frontend/package.json .
COPY /frontend/package-lock.json .
RUN npm install
COPY /frontend/. .
CMD ["npm", "run", "start:production"]