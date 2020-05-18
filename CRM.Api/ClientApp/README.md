# Angular BoilerPlate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Architecture

Under src/app folder you can find the main structure.

## Core

Core module imports Browser,Router and other Modules such as Material. It contains global singleton services, and other components like layout (toolbar etc)

## Shared

Shared module imports Common and RouterModule as well as specific MatCard or MatButton that it might use for shared components like ListComponent. It also exports the above so that they can be used form our Feature Modules.
It might also contain shared custom directives and pipes.

## Features

Feature Modules import the shared module and usually the FeatureRoutingModule. They declare their own components and provide their own services. They scarcely export any of those.
Feature-View components have the View suffix to show that they are connected to a url. This is not mandatory, but can help the developers with readability.

# Docker

Install Docker. For more info on how to install and setup docker see [Docker Documentation](https://docs.docker.com/)

## Build Image

Run `docker build -t app-img .` to build the image.

## Run Container

Run `docker run --name app-container -d -p 8888:80 app-img` to run a container based on the image built.
Navigate to `localhost:8888` to access your application.

## Other useful docker commands

## Remove all stoped containers

Run `docker rm $(docker ps -a -q)`.

## Force stop all containers

Run `docker rm $(docker ps -a -q) -f`.

## Remove last created image

Run `docker rmi app-img`.
