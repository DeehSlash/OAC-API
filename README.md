# OAC-API

> Obstacle Avoiding Car - API

## Acronyms

- **OAC** - Obstacle Avoiding Car
- **npm** - Node Package Manager
- **ANN** - Artificial Neural Network
- **API** - Application Programming Interface

## Description

This is the **API** project for **OAC**.

This project serves as the Back End for the **OAC** project. It provides the following routes:

- ```POST /network``` - Creates a new **ANN** and trains it with the data sent in the body of the request
- More routes will be documented later.

Check the **OAC-FrontEnd** project for details on integration and use of the API.

## Requirements

- Node.js
- npm (included in Node.js)

## Setup

1. Install the dependencies with ```npm install``` (or another compatible package manager)
2. Copy and rename ```.env.example``` file to ```.env```
3. Edit ```.env``` file to your taste
4. Run in development mode with ```npm run dev``` or in production mode with ```npm run start```
