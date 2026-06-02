# Project Context

## 1. Overview

Project Name:
Description:
Main Goal:

Business Context:
(¿Para quién es? ¿Qué problema resuelve?)

---

## 2. Tech Stack

Backend:
- (Ej: FastAPI / Django / Express)

Frontend:
- (Ej: React / HTML + JS)

Database:
- (Ej: PostgreSQL / MongoDB)

Testing:
- (Ej: pytest / Jest)

Deployment (optional):
- (Ej: Render / Docker)

---

## 3. Architecture

- API structure (REST / GraphQL)
- Base route prefix: /api
- Modular structure:
  - auth
  - users
  - products
  - orders
  - etc.

- Separation of concerns:
  - routes
  - services
  - models
  - middleware

---

## 4. Features

List all features clearly:

- User authentication (register/login)
- Product management (CRUD)
- Cart functionality
- Order creation
- Admin panel

---

## 5. Data Models (optional but powerful)

Define main entities:

Example:

User:
- id
- email
- password
- role

Product:
- id
- name
- price
- stock

Order:
- id
- user_id
- items
- total

---

## 6. API Endpoints (initial spec)

Example:

POST /api/auth/register
POST /api/auth/login

GET /api/products
POST /api/products (admin)

POST /api/cart
GET /api/cart

POST /api/orders

---

## 7. Rules (VERY IMPORTANT)

- Do NOT break existing structure
- Keep modular architecture
- Use async/await where applicable
- Keep endpoints consistent
- Validate inputs
- Keep code readable and maintainable

---

## 8. Coding Standards

- Use clear variable names
- Proper error handling (try/catch)
- Return structured JSON responses
- Avoid duplicated logic
- Keep functions small and focused

---

## 9. Important Files

- server.js / main.py
- routes/*
- models/*
- middleware/*
- tests/*

---

## 10. Current Task (FOCUS AREA)

Describe EXACTLY what needs to be built now:

Example:

Implement authentication:

- Create register endpoint
- Create login endpoint
- Hash passwords
- Generate JWT
- Protect routes with middleware

---

## 11. Next Tasks (optional)

- Implement products CRUD
- Add cart logic
- Add order system

---

## 12. Do NOT

- Do NOT refactor entire project
- Do NOT remove working code
- Do NOT change routes unnecessarily
- Do NOT ignore existing patterns

---

## 13. Instructions for Codex

- Read this file before making changes
- Work ONLY on the current task
- Make incremental changes
- If a tool fails, try an alternative approach
- Keep consistency with the project

