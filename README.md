# Invoicely - Smart Invoice Management System 🚀

Invoicely is a high-performance, full-stack invoice management application built with **Next.js 15+**, **TypeScript**, **Drizzle ORM**, and **Tailwind CSS**. Designed for small businesses and freelancers to manage billing, customers, and payments in one streamlined interface.

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=for-the-badge&logo=postgresql)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk)
![Stripe](https://img.shields.io/badge/Stripe-Payments-008CDD?style=for-the-badge&logo=stripe)

## ✨ Key Features

-   **Robust Authentication**: Secure user login and organization management powered by Clerk.
-   **Dashboard Analytics**: Real-time insights into total revenue, pending payments, and collection rates.
-   **Dynamic Invoicing**: Create, track, and manage invoices with ease.
-   **Stripe Integration**: Seamless payment processing for customers via secure Stripe Checkout.
-   **Automatic Email Notifications**: Send instant payment confirmations using Resend and React Email.
-   **Dark/Light Mode**: Premium UI experience with full theme support.
-   **Responsive Design**: Mobile-first architecture that works on any device.
-   **PDF generation**: Generate and download professional PDF invoices.

## 🛠️ Tech Stack

-   **Framework**: Next.js (App Router)
-   **Database**: PostgreSQL (Neon Database)
-   **ORM**: Drizzle ORM
-   **Auth**: Clerk
-   **Styling**: Tailwind CSS + Shadcn UI
-   **Icons**: Lucide React + Phosphor Icons
-   **Emails**: Resend + React Email
-   **Deployment**: Vercel

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/invoicely.git
    cd invoicely
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env.local` file and add your credentials:
    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    DATABASE_URL=
    STRIPE_SECRET_KEY=
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
    RESEND_API_KEY=
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    ```

4.  **Database Migration:**
    ```bash
    npm run generate
    npm run migrate
    ```

5.  **Run Locally:**
    ```bash
    npm run dev
    ```

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
Built with 👍 by [Ibrahim]
