# echo-service
Simple echo service

This is an echo service that will listen on 9595 and return a 200 OK

The PARALLELISM variable defaults to 2. Set an environment variable with the same name to change parallelism.

To build the docker image, execute docker build --tag echoservice:0.0.1 .