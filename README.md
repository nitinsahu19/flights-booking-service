# 📦 Node.js Project Boilerplate

This is a **base Node.js project template** that anyone can use as a starting point.
It follows modern coding practices and project-management recommendations to help you build clean and scalable applications.

Feel free to modify anything according to your needs.


## 📁 Project Structure

All actual source code lives inside the `src` folder.
This template does **not** include tests by default (you may add a separate `tests` folder if needed).

Below is an overview of what’s inside the `src` directory:


### ### `config/`

This folder contains **all configuration-related setup** for libraries, modules, and project-level settings.

Examples:

* Setting up **dotenv** so environment variables can be used anywhere cleanly (`server-config.js`)
* Initializing a logging library and setting default logging behavior
* Preparing reusable configuration utilities for different parts of the app

Any configuration logic should be placed here.


### ### `routes/`

This folder contains all the application routes.
Each route can be connected with its corresponding **middleware** and **controllers**.

Example:

* Registering API endpoints
* Attaching middleware functions
* Mapping routes to controllers



