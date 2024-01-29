# Backend Mock

Used to mock a REST backend with json-server ([docs](https://github.com/typicode/json-server))  
dsd

## Run the backend via node

- cd (...)/microfrontends/00_backend_mock
- yarn install
- yarn start

## Run the backend via Docker

- cd (...)/microfrontends/00_backend_mock
- docker build -t backend_mock .
- docker run -d -p 8080:3000 --name backend_mock backend_mock
