## Intro

This project consist of two separate applications

- **Frontend**
- **Backend**

Each separate project directory contains individual README file.

## Stack

### Frontend

The frontend application uses Angular 16. For end-to-end testing Cypress is used.

### Backend

Backend application is created with ExpressJS library of NodeJS.

### Database

MongoDB has been used in order to stor the data. The backend uses the library called **mongoose** in order to interact with MongoDB.

### Deployment using docker-compose

All three components of the project can be installed and run separately following individual README files. An easier way would be using docker compose tool. A configuration file is given in the root directory of the project titled **"docker-compose.yml"**. The following command need to be run to make all the docker containers up and running from the source code.

```
docker-compose up -d
```

The flag **"-d"** is used for detaching the whole process from the terminal session once done. After successful running of the command the frontend and backend application should be accessible in the following URLs.

- **Frontend**: http://localhost:4200
- **Frontend**: http://localhost:3000

This docker compose file keeps the backend and mongo container in the same network so that backend can interact with the database properly. Otherwise it could be done using editing the routing table of the host system which is comparatively complex.
