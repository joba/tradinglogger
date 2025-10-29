# TradingLogger

A modern, responsive web application for tracking and analyzing day trading activities. Built with Next.js, TypeScript, and PostgreSQL.

## 🚀 Features

### Trading Management

- **Create New Trades**: Log new positions with asset selection, entry price, and trade type
- **Active Trades Tracking**: Monitor ongoing positions that haven't been closed yet
- **Trade History**: View comprehensive history of all completed trades with search functionality
- **Trade Types**: Support for various trading instruments:
  - BULL/BEAR certificates
  - MINI_S/MINI_L positions

### Supported Assets

- **GOLD** - Gold trading instruments
- **SILVER** - Silver trading instruments
- **NASDAQ** - NASDAQ index instruments
- **OMX** - OMX Stockholm index instruments
- **DAX** - DAX index instruments

### Analytics Dashboard

- **Performance Metrics**: Track key statistics including:
  - Total number of trades
  - Winning vs losing trades count
  - Biggest profit percentage
  - Real-time performance calculations
- **Visual Cards**: Clean, icon-based metric display with Heroicons
- **Search & Filter**: Find specific trades by asset name

### User Experience

- **Responsive Design**: Optimized for desktop and mobile devices using Tailwind CSS
- **Authentication**: Secure user authentication with NextAuth.js
- **Protected Routes**: Dashboard access requires authentication
- **Loading States**: Smooth user experience with Suspense boundaries
- **Pagination**: Efficient browsing of large trade datasets (50 trades per page)

## 🛠️ Tech Stack

### Frontend

- **Next.js 15.5.3** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons

### Backend & Database

- **PostgreSQL** - Primary database for trade data
- **NextAuth.js 5.0** - Authentication and session management
- **Zod 4.1** - Schema validation and type safety
- **bcrypt 6.0** - Password hashing

### Development Tools

- **ESLint 9** - Code linting and quality
- **Turbopack** - Fast bundler for development
- **TypeScript** - Static type checking
- **PNPM** - Fast, disk space efficient package manager

## 🏗️ Project Structure

```
tradingLogger/
├── app/
│   ├── dashboard/           # Protected dashboard pages
│   │   ├── (overview)/      # Main dashboard with metrics
│   │   └── history/         # Trade history with pagination
│   ├── lib/                 # Core business logic
│   │   ├── actions.ts       # Server actions for forms
│   │   ├── data.ts          # Database queries
│   │   ├── definitions.ts   # TypeScript types
│   │   └── utils.ts         # Utility functions
│   ├── login/               # Authentication pages
│   └── ui/                  # Reusable UI components
│       └── dashboard/       # Dashboard-specific components
├── public/                  # Static assets
└── Configuration files      # Next.js, TypeScript, ESLint configs
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- PNPM package manager
- PostgreSQL database

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd tradingLogger
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:

   ```env
   TRADELOGS_POSTGRES_URL=your_postgresql_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Set up the database**
   Create the required PostgreSQL tables:

   ```sql
   CREATE TABLE trades (
     id SERIAL PRIMARY KEY,
     asset VARCHAR(50) NOT NULL,
     buy DECIMAL(10,3) NOT NULL,
     sell DECIMAL(10,3),
     comment TEXT,
     date DATE NOT NULL,
     type VARCHAR(20) NOT NULL
   );

   CREATE TABLE users (
     id UUID PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password TEXT NOT NULL
   );
   ```

### Development

1. **Start the development server**

   ```bash
   pnpm dev
   ```

2. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

1. **Build the application**

   ```bash
   pnpm build
   ```

2. **Start the production server**
   ```bash
   pnpm start
   ```

## 📊 Database Schema

### Trades Table

- `id` - Auto-incrementing primary key
- `asset` - Trading asset (GOLD, SILVER, NASDAQ, OMX, DAX)
- `buy` - Entry price (up to 3 decimal places)
- `sell` - Exit price (NULL for active trades)
- `comment` - Optional trade notes (max 255 characters)
- `date` - Trade date (ISO format)
- `type` - Trade type (BULL, BEAR, MINI_S, MINI_L)

### Users Table

- `id` - UUID primary key
- `name` - User display name
- `email` - Unique email address
- `password` - Hashed password

## 🔐 Authentication

The app uses NextAuth.js for secure authentication:

- Users must log in to access the dashboard
- Passwords are hashed using bcrypt
- Session-based authentication with automatic redirects
- Protected routes middleware

## 🎨 UI/UX Features

- **Clean Design**: Modern interface with consistent spacing and typography
- **Custom Fonts**: Lusitana font for headings and important text
- **Color Scheme**: Professional gray-based palette with accent colors
- **Icons**: Contextual Heroicons for better visual communication
- **Forms**: Accessible forms with proper validation and error handling
- **Responsive Layout**: Grid-based layouts that adapt to screen size

## 📈 Performance Features

- **Server Components**: Leverages Next.js App Router for optimal performance
- **Streaming**: Uses Suspense for progressive loading
- **Database Optimization**: Efficient queries with proper indexing
- **Static Generation**: Optimized builds with Turbopack
- **Type Safety**: Full TypeScript coverage prevents runtime errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

---

**TradingLogger** - Simple, effective day trading activity tracking.
