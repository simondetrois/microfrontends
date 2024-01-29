# iframes

Micro-Fronted with horizontal split which loads fragments as iframes during runtime.

## Run the iframes

1. Make sure to first build the docker image of the backend mock
2. cd (...)/microfrontends/00_backend_mock
3. docker build -t backend_mock .
4. cd (...)/microfrontends/02_iframes/applicationShell
5. yarn install
6. yarn build
7. docker build -t iframe_applicationshell .
8. Repeat step 5-7 with all subfolders; for the right image name checkout the docker compose file
9. docker compose up -d
