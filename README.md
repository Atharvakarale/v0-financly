# Financly - Personal Finance Dashboard

A modern, full-stack financial analytics dashboard built with Next.js, TypeScript, and MongoDB. Track your transactions, visualize your financial data, and manage your finances with beautiful charts and intuitive interfaces.

## 🚀 Features

### Authentication & Security
- JWT-based authentication system
- Secure login/logout functionality
- User registration with password hashing
- Protected API endpoints

### Dashboard & Analytics
- **Interactive Dashboard**: Beautiful overview of your financial health
- **Statistics Cards**: Balance, Revenue, Expenses, and Savings tracking
- **Data Visualizations**: 
  - Pie charts for revenue vs expenses distribution
  - Line charts for monthly trends
  - Animated charts with smooth transitions

### Transaction Management
- **Add Transactions**: Easy-to-use modal for adding new transactions
- **Transaction Table**: Paginated display with responsive design
- **Advanced Filtering**: Filter by date, amount, category, and status
- **Real-time Search**: Search across all transaction fields
- **Sorting**: Column-based sorting with visual indicators

### Import/Export Features
- **CSV Export**: Download filtered transactions as CSV
- **CSV Import**: Upload transaction data from CSV files
- **Configurable Columns**: Choose which fields to export

### Modern UI/UX
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: Framer Motion powered animations
- **Modern Components**: Built with Radix UI and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Charts**: Recharts
- **Animations**: Framer Motion
- **State Management**: React Context + Hooks

### Backend
- **Runtime**: Node.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **API**: RESTful endpoints

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Git

### Setup Instructions

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd financly-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   \`\`\`env
   MONGODB_URI=mongodb+srv://Atharva_k:atharva262004@cluster0.widhcvt.mongodb.net/financly?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=your-super-secret-jwt-key
   NEXTAUTH_SECRET=your-nextauth-secret
   \`\`\`

4. **Seed the Database**
   \`\`\`bash
   npm run seed
   \`\`\`

5. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🗄️ Database Schema

### Users Collection
\`\`\`javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  createdAt: Date
}
\`\`\`

### Transactions Collection
\`\`\`javascript
{
  _id: ObjectId,
  id: Number,
  date: String (ISO),
  amount: Number,
  category: String ("Revenue" | "Expense"),
  status: String ("Paid" | "Pending"),
  user_id: String,
  user_profile: String,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Transactions
- `GET /api/transactions` - Get transactions with filtering and pagination
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions?id={id}` - Update transaction
- `DELETE /api/transactions?id={id}` - Delete transaction
- `GET /api/transactions/export` - Export transactions as CSV

### Request/Response Examples

#### Login
\`\`\`javascript
// POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
\`\`\`

#### Get Transactions
\`\`\`javascript
// GET /api/transactions?page=1&limit=10&category=Revenue&status=Paid
{
  "transactions": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
\`\`\`

## 🎨 UI Components

### Key Components
- **LoginForm**: Authentication interface with tabs for login/register
- **Dashboard**: Main dashboard layout with stats and charts
- **StatsCards**: Animated financial summary cards
- **ChartsSection**: Data visualization components
- **TransactionsTable**: Advanced table with filtering and pagination
- **AddTransactionModal**: Form for creating new transactions

### Styling Features
- Consistent design system with CSS variables
- Dark/light theme support
- Responsive breakpoints
- Smooth animations and transitions
- Custom scrollbars
- Gradient backgrounds

## 🔧 Development

### Available Scripts
\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run seed         # Seed database with sample data
\`\`\`

### Project Structure
\`\`\`
financly-dashboard/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard components
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── data/               # Sample data files
├── api/                # API route handlers
└── scripts/            # Database scripts
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Ensure MongoDB Atlas is accessible from your server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Recharts](https://recharts.org/) for beautiful chart components
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**Happy Financial Tracking! 💰📊**
