# Nivah Fashion Jewellery

A full-stack e-commerce platform built for **Nivah Fashion Hub**, a real jewellery business, as a freelance/client project. It covers the complete online store experience — product browsing, cart, checkout with real payments, order tracking, and email notifications — plus a full admin back-office to manage products, orders, and sales analytics.

**Live site:** [nivahfashions.com](https://www.nivahfashions.com/)

---

## What this project demonstrates

- Building and shipping a **production e-commerce app for a paying client**, not just a demo/tutorial project
- End-to-end **payment integration** (Razorpay) with both test and live modes, signature verification, and webhook handling
- A **clean, layered backend architecture** (entities, use-cases, repositories, dependency injection) instead of a typical flat Express app
- Real-world problem solving: image delivery performance, infinite scroll edge cases, transactional email deliverability, revenue reporting accuracy — the kind of bugs that only show up once real users and real data are involved
- A complete **admin dashboard**: KPI cards, revenue charts, order lifecycle management, product/category/banner management

---

## Key Features

**Customer-facing**
- Product catalog with search, category filters, sorting, and smooth infinite scroll
- Product detail page with pinch-to-zoom / tap-to-zoom image viewer (mobile and desktop)
- Cart and guest checkout (no account required)
- Razorpay payment integration with signature verification
- Order tracking and order history
- Automatic order confirmation emails (customer) and new-order alerts (admin)

**Admin dashboard**
- Product, category, banner, hero section, and testimonial management
- Order management: accept, dispatch, deliver, or cancel orders
- Revenue reports and KPI dashboard (orders, revenue, new users, pending orders)
- Invoice generation (PDF)

**Under the hood**
- Optimized image delivery via Cloudinary transformations (auto format/quality, responsive sizing)
- Clean Architecture on the backend: entities → use-cases → repositories, wired together with dependency injection
- Non-blocking transactional emails so slow email delivery never delays an API response
- CI/CD pipeline (GitHub Actions) that builds and deploys the backend to AWS automatically on push

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, React Query, React Router |
| Backend | Node.js, Express 5, TypeScript, tsyringe (dependency injection) |
| Database | MongoDB (Mongoose) — hosted on MongoDB Atlas |
| Payments | Razorpay |
| Images | Cloudinary |
| Email | Resend |
| Hosting | Vercel (frontend), AWS EC2 (backend), GitHub Actions (CI/CD) |

---

## Project Structure

This is a monorepo with two independent apps:

```
nivah/
├── backend/    Express API — organized by domain module
│   └── src/modules/
│       ├── product/   category/  cart/    order/
│       ├── payment/   user/      analysis/ reports/
│       └── banner/    hero/      testimonial/
│
└── frontend/   React SPA — organized by feature
    └── src/features/
        ├── products/  cart/     order/    admin/
        ├── auth/      category/ banner/   hero/  reports/
```

Each backend module follows the same internal shape: `entities/` (domain models) → `use-cases/` (business logic) → `repositories/` (data access) → `controller/` (HTTP layer), registered through a dependency-injection container rather than importing concrete classes directly.

---

## Getting Started

### Prerequisites
- Node.js 20+
- A MongoDB connection string (e.g. from [MongoDB Atlas](https://www.mongodb.com/atlas))
- API keys for [Razorpay](https://razorpay.com/), [Cloudinary](https://cloudinary.com/), and [Resend](https://resend.com/)

### 1. Clone and install
```bash
git clone <this-repo-url>
cd nivah

cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure environment variables
Copy the example files and fill in your own values:
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```
See the comments inside each file for what every variable does.

### 3. Run in development
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```
The frontend runs on `http://localhost:5173` and expects the backend on `http://localhost:4005` by default (configurable via `VITE_API_BASE_URL`).

---

## Author

**hakeem**
