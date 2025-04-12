# 🚗 Car Store API

## Overview

This is a full-featured backend application built with TypeScript, Express.js, and MongoDB. It powers a Car Store system where users (customers) can register, browse products (cars), place orders, and make payments via ShurjoPay. Admins can manage users, products, and orders through role-based access control.

---

## 🚀 Features

- **Secure Registration and Login** with role-based access (admin/customer)
- **Product Management (CRUD)** – for admins
- **Order Placement** – automatic total price calculation and stock management
- **ShurjoPay Payment Integration**
- **Order Tracking** (admin can update status, customer can view)
- **Search & Filtering** on all products (name, brand, category, price, availability)
- **Profile Management** (view & update user profile info)
- **Admin Dashboard & Customer Dashboard**
- **Validation using Zod**
- **Authorization Middleware**
- **Modular Project Structure**

---

## 🛠️ Installation and Setup

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Variables

Create a `.env` file in the root directory with the following values:

```env
PORT=5000
MONGODB_URL=<your-mongodb-url>
NODE_ENV=development
BCRYPT_SALT_ROUNDS=10
JWT_ACCESS_TOKEN_SECRET=<your-access-token-secret>
JWT_ACCESS_EXPIRES_IN=1d
SP_ENDPOINT=https://sandbox.shurjopayment.com
SP_USERNAME=<your-shurjopay-username>
SP_PASSWORD=<your-shurjopay-password>
SP_PREFIX=INV
SP_RETURN_URL=http://localhost:5000/api/orders/payment-success
```

> 💡 Use sandbox credentials for development from ShurjoPay.

### Step 4: Start the Development Server

```bash
npm run start:dev
```

API will be available at `http://localhost:5000 | https://car-store-assingment.vercel.app/`

---

## 📚 API Endpoints

### 🔐 Auth Endpoints

| Method | URL                  | Description                            |
|--------|----------------------|----------------------------------------|
| POST   | `/api/v1/auth/login` | User login with email & password       |
| GET    | `/api/v1/auth/me`    | Get current logged-in user             |
| PATCH  | `/api/v1/auth/update`| Update own profile info (name, phone, etc) |

### 👤 User Endpoints

| Method | URL                       | Description                            |
|--------|---------------------------|----------------------------------------|
| POST   | `/api/v1/users`           | Register new user (default role: customer) |
| GET    | `/api/v1/users`           | Get all users (admin only)             |
| PATCH  | `/api/v1/users/update`    | Admin can update user status (active/deactive) |

### 🚗 Product Endpoints

| Method | URL                          | Description |
|--------|------------------------------|-------------|
| POST   | `/api/v1/products`           | Admin adds a new product |
| GET    | `/api/v1/products`           | Fetch all products (supports filters & search) |
| GET    | `/api/v1/products/:id`       | Get product details by ID |
| PATCH  | `/api/v1/products/:id`       | Admin can update product |
| DELETE | `/api/v1/products/:id`       | Admin can delete product |

#### 🔍 Search & Filtering

Use query parameters on `/api/v1/products` such as:

```http
/api/v1/products?searchTerm=bmw&category=Sedan&minPrice=20000&availability=in-stock
```

### 📦 Order Endpoints

| Method | URL                                     | Description |
|--------|-----------------------------------------|-------------|
| POST   | `/api/v1/orders/create-order`           | Create an order with products & quantities |
| GET    | `/api/v1/orders/my-orders`              | Logged-in user can view their orders |
| GET    | `/api/v1/orders/all-orders`             | Admin can view all orders |
| PATCH  | `/api/v1/orders/update-delivery-status/:orderId` | Admin can update delivery status |
| DELETE | `/api/v1/orders/delete-order/:id`       | Admin can delete any order |

### 💳 Payment

| Method | URL                     | Description                     |
|--------|-------------------------|---------------------------------|
| GET    | `/api/v1/orders/verify` | Verifies ShurjoPay payment by order ID |

> On creating order, you'll receive a `checkout_url` from ShurjoPay. Redirect the customer to that URL for payment.


## 🧱 Technology Stack

- **TypeScript**
- **Express.js**
- **MongoDB + Mongoose**
- **Zod** (validation)
- **JWT** (authentication)
- **ShurjoPay SDK** (payment gateway)
- **Postman** (API testing)

---

## 📌 Notable Features

- Role-based access control
- Dynamic product filtering and searching
- Payment gateway integration (sandbox)
- Order management with real-time stock updates
- Order status tracking and delivery updates

---



