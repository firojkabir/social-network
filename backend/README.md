## Intro

This is the backend REST API project for the Social Network project. It is implemented using **ExpressJS** library powered by **NodeJS**. The **NoSQL** database platform **MongoDB** has been used for data storage.

## Running the project

The project can be run as a generic NodeJS application in the development environment or in a docker container.

### Setting up environment variables

The database connection string is passed to the application using environment variable. A sample environment file is added in the project directory. It need to be copied as **.env**.

```
cp .env.example .env
```

The values in the newly created environment file need to be replaced according to the development enviroment.

```
MONGO_URL=mongodb://localhost:27017/crud-db
PORT=3000
```

### Running using Docker

There is a Dockerfile inside the project directory. Using docker command a docker image can be built from this file. The command needs to be run from inside the **backend** project directory.

```
docker build -t firojkabir/backend .
```

The "**-t**" flag is for tagging the image with a name. The "**.**" refers to the current directory. The image building time can take a while. Once done, the newly created image can be run as a docker container with the following command.

```
docker run -d --name backend -p 3000:3000 firojkabir/backend
```

The "**--name**" flag tags the container with a name. The "**-p**" flag maps port **3000** of host machine to the internal port **3000** of the docker container which was exposed using the Dockerfile. After this the name of the docker image, created in last step, is passed.

### Running without Docker

The project can be run in the local machine using npm. At first the dependencies need to be installed using following command.

```
npm install
```

Till this point the dependencies are installed and the project is ready to be run using following command.

```
npm run start
```
