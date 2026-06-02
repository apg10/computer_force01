Project: computer_force04
# Project Overview

Proyecto: Ecommerce Node.js (Express + MongoDB + EJS)
Objetivo actual: Convertir a app dinámica con SSR + API + autenticación + carrito

Stack:
- Backend: Express + MongoDB + Mongoose
- Frontend: HTML + JS (fetch API)
- Auth: JWT + session
- Tests: Jest + Supertest

Status:
• **Frontend** – Static HTML + CSS, with a bare‑bones JS file that needs auth handling and dynamic cart rendering. 
• **Backend** – Express server now configured, uses MongoDB, has auth, product, cart, and order APIs, all protected with JWT and admin middleware. 
• **Database** – MongoDB, connection via `MONGO_URI`.  Models: `User`, `Product`, `CartItem`, `Order`. 
• **Testing** – A Jest + Supertest suite has been created for auth, middleware, products, cart, and orders.  Tests run against a local test database. 

**Next tasks**
1. **Add front‑end UI** – login form, product listing, cart view, and checkout page.  Use the updated `site.js` helper functions to talk to the API. 
2. **Persist the JWT** – store it in `localStorage` or an HttpOnly cookie, and read it on page load to auto‑fetch cart. 
3. **Improve styling** – use the existing `assets/css/styles.css`; add responsive utilities if needed. 
4. **Deploy** – create a Dockerfile, set up a CI pipeline (GitHub Actions) to run tests, lint, and build. 
5. **Optional** – add a small UI framework (e.g., Preact or Alpine) for component re‑activity.

# Important Files

- server.js → configuración principal
- src/routes/auth.js → login/register
- src/routes/products.js → CRUD productos
- src/routes/cart.js → carrito
- src/middleware/auth.js → auth + admin
- tests/*.test.js → suite de tests
