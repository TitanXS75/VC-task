# Admin Dashboard App

A production-quality admin dashboard built with Next.js, Material UI, Zustand, and NextAuth.

## Features
- **Authentication**: Secure login using NextAuth.js with dummyjson.com credentials.
- **User Management**: Search, paginate, and view detailed user profiles.
- **Product Management**: Filter by category, search, paginate, and view detailed product information with an image gallery.
- **Performance**: Optimized with React.memo, useCallback, and a custom Zustand caching strategy.
- **Responsive Design**: Fully mobile-responsive UI using Material UI's grid system.

## Tech Stack
- **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **UI Library**: [Material UI (MUI v5)](https://mui.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **API**: [DummyJSON](https://dummyjson.com/)

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TitanXS75/VC-task.git
   ```   
2. **Install dependencies**
   ```bash
   pnpm install
   ```
3. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=supersecretsecret
   ```
5. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

## Test Credentials
- **Username**: `Venture Builders`
- **Password**: `VB@VentureBuilders`

## Why Zustand?
Zustand was chosen for this project for several reasons:
- **Simplicity**: Extremely easy to set up compared to Redux, with almost zero boilerplate.
- **Small Bundle Size**: Highly optimized and lightweight.
- **Hooks-based**: Works seamlessly with React's functional components.
- **Async Support**: Built-in support for async actions without needing extra middleware like Thunk or Saga.
- **Flexibility**: Perfect for small-to-medium apps where Redux would be overkill.

## Caching Strategy
The app implements a custom caching strategy within the Zustand store:
- **What is cached?**: Results from user and product list/search API calls.
- **How?**: Using a `cachedUsers` and `cachedProducts` Record in the store, keyed by a combination of `page`, `search query`, and `category`.
- **Why?**:
  - **Reduces Latency**: When a user navigates back to a previous page or clears a search, the data is instantly available without a network request.
  - **Reduces API Load**: Minimizes redundant calls to the backend.
  - **Improved UX**: Provides a smoother, more "app-like" experience with immediate transitions.
