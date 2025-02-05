# ABCJKM Online Store

This repository contains a webshop built by Group 5 for the FRWAW course at ITU.
![](demo.jpg)
## Installation

Our application is divided into two areas, representing the functionality of two different components; backend and client (frontend). As these components are essentially distinct applications that are hosted on separate instances, they have individual dependencies that are required in order to run.

1. Clone the repository

    ``` git clone https://github.itu.dk/jiaz/webshop.git ```

2. Install dependencies for backend

    ```cmd
    cd backend
    npm install
    ```

3. Install dependencies for client

    ```cmd
    cd client
    npm install
    ```

## Running the application

Both backend and client applications will need to be initialized.

* The backend application runs on http://localhost:3000
* The client application runs on http://localhost:3001.

Create two separate terminal sessions for doing this.

1. Run the backend

    ``` cmd
    cd backend
    npm run watch
    ```

2. Run the client

    ```cmd
    cd client
    npm start
    ```
