# SocialNetworkApp

This is the frontend project for the Social Network REST API project. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.2. From the application a user can perform following actions.

- See the list of all users
- See details of the individual user
- Register a new user
- Update information of a user
- Follow other users
- Delete a user
- Create a post
- See lists of posts
- Update the content of a post
- Delete a post
- Add comments to the post

---

## Running the project

The project can be run as a generic NodeJS application in the development environment or in a docker container.

### Setting up environment variables

The base API URL for the angular application is configured by configuration file in **src/environments/environment.ts**.

```
export const environment = {
  apiBaseUrl: 'http://localhost:3000',
};
```

### Running using Docker

There is a Dockerfile inside the project directory. Using docker command a docker image can be built from this file. The command needs to be run from inside the **frontend** project directory.

```
docker build -t firojkabir/frontend .
```

The "**-t**" flag is for tagging the image with a name. The "**.**" refers to the current directory. The image building time can take a while. Once done, the newly created image can be run as a docker container with the following command.

```
docker run -d --name frontend -p 4200:80 firojkabir/frontend
```

The "**--name**" flag tags the container with a name. The "**-p**" flag maps port **4200** of host machine to the internal port **80** of the docker container which was exposed using the Dockerfile. After this the name of the docker image, created in last step, is passed. Once the container runs successfully, the angular application can be accessed from localhost http://localhost:4200.

### Running without Docker

The project can be run in the local machine using npm. At first the dependencies need to be installed using following command.

```
npm install
```

Till this point the dependencies are installed and the project is ready to be run using following command.

```
npm run start
```

If the project is running successfully in localhost, it can be accessed at http://localhost:4200.

---

## Project structure

Modular file structure pattern have been followed as per angular style guide. Important files necessary for building the user interface is stored in **src**.

**cypress** directory holds all necessary files needed for end-to-end testing.

### src/app directory

Angular components, services, models, routing file are kept in this directory.

There are several components in this project but the listed are the main:

- Register component - to register a new user
- Login component - to login
- User component - to list users, user details, add, edit and delete user
- Post component - to create a new post, post details, edit and delete etc.

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. End-to-end testing written in cypress checks if some functionalities of the UI is accessible from the browser or not.
