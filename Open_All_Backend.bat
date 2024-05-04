@echo off

rem Start API gateway
start cmd /k "cd .\backend\API-gateway\ & npm start"

rem Start authentication service
start cmd /k "cd .\backend\authentication-service\ & npm start"

rem Start lecturer service (Spring Boot)
start cmd /k "cd .\backend\lecturer-service\target\ & java -jar lecsrv-0.0.1-SNAPSHOT.jar"