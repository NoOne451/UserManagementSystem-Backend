


# User Management System Backend

This repository contains the backend code for the User Management System, developed using Express.js.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The User Management System backend provides a RESTful API to handle user data. It supports user registration, authentication, and basic user management operations.

## Features

- User registration and authentication
- JWT-based authentication

## Installation

To get started with the project, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/NoOne451/UserManagementSystem-Backend.git
cd UserManagementSystem-Backend
npm install
```

## Configuration

Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
ENV=your_environment
FRONTEND_BASE_URL=your_frontend_base_url
EMAIL=your_email
PASSWORD=your_password
```

## Usage

To start the server, run:

```bash
npm start
```

The server will be running on `http://localhost:3000`.

## API Endpoints

### Authentication

- **POST /signup**
  - Registers a new user.
  - Request body:
    ```json
    {
      "username": "example",
      "email": "example@example.com",
      "password": "password"
    }
    ```

- **POST /login**
  - Logs in an existing user.
  - Request body:
    ```json
    {
      "email": "example@example.com",
      "password": "password"
    }
    ```

- **POST /verify-otp**
  - Verifies the OTP sent to the user's email.

- **POST /resend-otp**
  - Resends the OTP to the user's email.

- **GET /logout**
  - Logs out the authenticated user.
  - Requires authentication.

- **GET /checkStatus**
  - Checks the authentication status of the user.

- **POST /forgot-password**
  - Sends a password reset link to the user's email.
  - Request body:
    ```json
    {
      "email": "example@example.com"
    }
    ```

- **POST /reset-password**
  - Resets the user's password using the token from the reset link.
  - Request body:
    ```json
    {
      "token": "reset_token",
      "newPassword": "new_password"
    }
    ```

## Technologies Used

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

