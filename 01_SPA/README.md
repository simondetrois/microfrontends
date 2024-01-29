# SPA

Vertical split (represented through a single page, implemented with a SPA).

## Run the SPA

1. Make sure to first build the docker image of the backend mock
2. cd (...)/microfrontends/00_backend_mock
3. docker build -t backend_mock .
4. cd (...)/microfrontends/01_SPA
5. yarn install
6. yarn build
7. docker build -t spa .
8. docker compose up -d
