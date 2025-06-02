# Scoder Store 🛒

A modern e-commerce application built with Next.js, TypeScript, and Tailwind CSS. This project demonstrates a complete shopping experience with user authentication, product catalog, shopping cart, and checkout functionality.

## 🚀 Features

### 🔐 Authentication
- User registration and login
- Form validation with Zod schemas
- Persistent user sessions with localStorage
- Protected cart functionality

### 🛍️ Product Catalog
- Dynamic product listing from [Fake Store API](https://fakestoreapi.com/)
- Real-time search functionality
- Product categories and ratings
- Responsive product cards with images
- Loading states and error handling

### 🛒 Shopping Cart
- Add/remove products from cart
- Quantity management
- Real-time cart total calculation
- Persistent cart state
- Cart sidebar with product preview

### 💳 Checkout Process
- Multiple payment methods:
  - Credit Card
  - Debit Card
  - PIX (Brazilian payment system)
  - Boleto (Brazilian payment slip)
- Form validation for payment details
- Order confirmation and success states
- Cart clearing after successful purchase

### 🎨 User Experience
- Responsive design for all screen sizes
- Modern UI with Tailwind CSS
- Smooth animations and transitions
- Accessible components
- Loading states and error handling

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **State Management**: React Context API
- **Icons**: Lucide React
- **API**: Fake Store API

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd scoder-store
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🎯 Usage

### Getting Started
1. **Browse Products**: View the product catalog on the homepage
2. **Search**: Use the search bar to find specific products
3. **Register/Login**: Create an account or login to access cart functionality
4. **Add to Cart**: Click "Add to Cart" on any product (requires login)
5. **Manage Cart**: Use the cart sidebar to view, modify, or remove items
6. **Checkout**: Complete your purchase with your preferred payment method

### Demo Credentials
Since this uses a mock API, you can use any email/password combination to login. For example:
- **Email**: demo@example.com
- **Password**: password123

## 📁 Project Structure

\`\`\`
scoder-store/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── cart/             # Shopping cart components
│   ├── layout/           # Layout components
│   ├── products/         # Product-related components
│   └── ui/               # Reusable UI components
├── contexts/             # React Context providers
├── lib/                  # Utility functions and schemas
├── types/                # TypeScript type definitions
└── public/               # Static assets
\`\`\`

## 🔧 Key Components

- **AppProvider**: Global state management with Context API
- **Header**: Navigation with search, auth, and cart
- **ProductList**: Displays products from the API
- **CartSidebar**: Shopping cart management
- **CheckoutForm**: Multi-step checkout process
- **AuthForms**: Login and registration forms

## 🌟 Features Showcase

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions

### Form Validation
- Real-time validation with Zod schemas
- User-friendly error messages
- Type-safe form handling

### State Management
- Centralized state with React Context
- Persistent user sessions
- Real-time cart updates

### Payment Integration
- Multiple payment method support
- Brazilian payment systems (PIX, Boleto)
- Form validation for each payment type

## 🚀 Deployment

This project can be deployed on various platforms:

### Vercel (Recommended)
\`\`\`bash
npm run build
# Deploy to Vercel
\`\`\`

### Netlify
\`\`\`bash
npm run build
# Deploy the `out` folder to Netlify
\`\`\`

### Docker
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Notes

### Code Quality
- TypeScript for type safety
- ESLint and Prettier for code formatting
- Component-based architecture
- Reusable UI components

### Performance
- Next.js optimizations
- Image optimization with Next.js Image component
- Lazy loading and code splitting
- Efficient state management

### Accessibility
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

## 🐛 Known Issues

- Product images may load slowly due to external API
- Cart state is lost on page refresh (localStorage implementation needed)
- Payment processing is simulated (no real payment integration)

## 🔮 Future Enhancements

- [ ] Product filtering by category and price
- [ ] User profile management
- [ ] Order history
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Real payment gateway integration
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Email notifications
