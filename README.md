# Relatia - CRM Application

Welcome to the **Relatia** project! This README provides an overview of the project, setup instructions, and other relevant details.

## Table of Contents

- [Visit](#visit)
- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Structure](#structure)
- [Contributors](#contributors)
- [Contributing](#contributing)
- [License](#license)

## Visit

- [Vercel](https://relatia0.vercel.app/)

## About

**Relatia** is a comprehensive Customer Relationship Management (CRM) platform designed to unify pipeline management, customer success, and support operations in a single, powerful interface. Built with modern web technologies, Relatia helps teams build stronger customer relationships through signal-rich storytelling and intelligent automation. Relatia empowers teams to close smarter, retain customers longer, and deliver memorable experiences at every interaction point.

## Features

- Unified Dashboard
- Lead Management
- Task Management
- Support Tickets
- Role-Based Access
- Real-Time Updates

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/woabu0/relatia.git
   ```
2. Navigate to the project's client directory:
   ```bash
   cd client
   ```
3. Install dependencies:
   ```bash
   npm add vite@latest
   ```
4. Navigate to the project's server directory:
   ```bash
   cd server
   ```
5. Install dependencies:
   ```bash
   npm i
   ```
6. Navigate to the project's relatia directory:
   ```bash
   cd relatia
   ```
7. Install dependencies:
   ```bash
   npm i
   ```

## Usage

1. Start the application:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Structure

```
relatia/
├── client/                      # Next.js frontend application
│   ├── app/
│   │   ├── layout.tsx          # Root layout with AuthProvider
│   │   ├── page.tsx            # Landing page (home)
│   │   ├── globals.css         # Global styles and dark theme
│   │   ├── login/
│   │   │   └── page.tsx        # Login page
│   │   ├── register/
│   │   │   └── page.tsx        # Registration page
│   │   └── dashboard/
│   │       ├── layout.tsx      # Dashboard layout with sidebar
│   │       ├── page.tsx        # Dashboard overview page
│   │       ├── admin/
│   │       │   └── page.tsx    # Admin dashboard (ticket management)
│   │       ├── leads/
│   │       │   └── page.tsx    # Leads management page
│   │       ├── tickets/
│   │       │   └── page.tsx    # Tickets management page
│   │       └── user/
│   │           └── page.tsx    # User dashboard (legacy)
│   ├── components/
│   │   ├── Navbar.tsx           # Fixed navigation bar (landing page)
│   │   ├── DashboardSidebar.tsx # Sidebar navigation (dashboard)
│   │   ├── sections/            # Landing page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── WorkflowSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── CTASection.tsx
│   │   └── ui/                 # Reusable UI components
│   │       ├── AddLeadForm.tsx
│   │       ├── AddTaskForm.tsx
│   │       ├── CreateTicketForm.tsx
│   │       ├── EditLeadForm.tsx
│   │       ├── EditTaskForm.tsx
│   │       └── TicketList.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx     # Authentication context provider
│   ├── lib/
│   │   └── api.ts              # API service (centralized API calls)
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.ts
│
└── server/                      # Express.js backend API
    ├── src/
    │   ├── config/
    │   │   └── db.ts            # MongoDB database configuration
    │   ├── controllers/         # Route controllers (business logic)
    │   │   ├── auth.controller.ts
    │   │   ├── lead.controller.ts
    │   │   ├── task.controller.ts
    │   │   ├── ticket.controller.ts
    │   │   └── user.controller.ts
    │   ├── middleware/
    │   │   └── auth.middleware.ts  # JWT authentication middleware
    │   ├── models/              # MongoDB Mongoose models
    │   │   ├── lead.model.ts
    │   │   ├── task.model.ts
    │   │   ├── ticket.model.ts
    │   │   └── user.model.ts
    │   ├── routes/               # API route definitions
    │   │   ├── auth.routes.ts
    │   │   ├── lead.routes.ts
    │   │   ├── task.routes.ts
    │   │   ├── ticket.routes.ts
    │   │   └── user.routes.ts
    │   ├── types/
    │   │   └── express.d.ts     # Express type extensions
    │   ├── index.ts              # Application entry point
    │   └── server.ts            # Server setup and configuration
    ├── package.json
    └── tsconfig.json
```

## Contributors

<p align="center">
  <a href="https://github.com/woabu0/relatia/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=woabu0/relatia" alt="Contributors" />
  </a>
</p>

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
