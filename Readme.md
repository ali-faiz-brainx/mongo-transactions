# MongoDB Transaction Example

This project demonstrates the use of MongoDB transactions in a Node.js application using Express and Mongoose. It showcases the difference between operations with and without transactions for account transfers and inventory management.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   DB_URI=your_mongodb_connection_string
   PORT=5000
   ```

## Usage

To start the server, run:

```
npm run dev
```

## Project Structure

- `server.js`: Main entry point of the application
- `config/`: Configuration files
- `controllers/`: Request handlers
- `models/`: Mongoose models
- `routes/`: API routes

## API Endpoints

- POST `/api/transfer-no-transaction`: Transfer money without using a transaction
- POST `/api/transfer-with-transaction`: Transfer money using a transaction
- POST `/api/order-no-transaction`: Place an order without using a transaction
- POST `/api/order-with-transaction`: Place an order using a transaction

## Database Models

The project uses the following Mongoose models:

- `AccountModel`: Represents user accounts with balance
- `OrderModel`: Represents orders with product ID and quantity
- `ProductModel`: Represents products with name and stock
- `TransferModel`: Represents money transfers between accounts
