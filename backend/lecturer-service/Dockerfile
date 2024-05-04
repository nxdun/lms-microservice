# Springboot base image
FROM openjdk:17-jdk-alpine

# add argument to run
ARG JAR_FILE=target/*.jar

#copy to vm
COPY ./target/lecsrv-0.0.1-SNAPSHOT.jar app.jar

# expose the port
EXPOSE 1113

#set entry
ENTRYPOINT [ "java", "-jar", "/app.jar" ]
