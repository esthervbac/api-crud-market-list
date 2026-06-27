# 🛒 Market List CRUD API

A RESTful CRUD API built to manage market product lists.

## 📋 About the Project

This API allows users to create, read, update, and delete shopping lists. All data is persistently stored in a MongoDB database, and the routes are protected using JWT authentication.

## 🚀 Technologies Used

- **Node.js**
- **TypeScript**
- **Express.js**
- **MongoDB & Mongoose**
- **JSON Web Token (JWT)**

---

## 🔑 API Endpoints

### Authentication

- `POST /login` - Generates a JWT token for API authorization.

### Shopping List (Requires Bearer Token)

- `POST /shopping-list` - Create a new market products list.
- `GET /shopping-list` - List all created market products lists.
- `GET /shopping-list/:id` - Get a specific list by its ID.
- `PUT /shopping-list/:id` - Update items from a specific list.
- `DELETE /shopping-list/:id` - Delete a specific list.

> 💡 **Note:** Remember to include the token in the `Authorization` header as `Bearer <your_token>` for all `/shopping-list` endpoints.

---

## 🛠️ How to Run the Project

1. Clone this repository:

```bash
   git clone <repository-url>
   cd api-crud-market-list
```

2. Install all project dependencies:

```bash
    npm install
```

3. Configure Environment Variables:
   Create a file named .env in the root directory of the project and add the following variables:

```bash
    PORT=3030
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
```

4. Run the Application:

```bash
    npm run dev
```

5. The server should start successfully, and you will see the message in your terminal:

```bash
    Servidor iniciado na porta 3030
```
