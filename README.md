# Kinda outdated
# Alifish - Fish Shop E-Commerce Application

A modern, user-friendly React-based e-commerce application for selling fish products. Built with React 19, React Router, and PHP backend.


### Core Functionality
- **Product Catalog**: Browse fish products with pagination
- **Search Functionality**: Real-time search with debouncing
- **Shopping Cart**: Add, update quantities, and remove items
- **User Authentication**: Login and registration system
- **Order Management**: View order history for logged-in users
- **Payment Processing**: Secure checkout system

### User Experience Enhancements
-  **Enhanced Cart Management**: Quantity controls (increase/decrease) and individual item removal
-  **Toast Notifications**: User-friendly notifications instead of browser alerts
-  **Real-time Search**: Search updates as you type (300ms debounce)
-  **Advanced Pagination**: Page numbers with smart ellipsis for easy navigation
-  **Loading States**: Spinner animations and skeleton screens
-  **Empty States**: Helpful messages with call-to-action buttons
-  **Confirmation Dialogs**: Prevents accidental data loss
-  **Image Optimization**: Lazy loading with loading placeholders
-  **Form Validation**: Inline error messages and real-time validation
-  **Error Handling**: Comprehensive error handling for all API calls

### Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation support
- Visible focus states
- Screen reader friendly

##  Tech Stack

### Frontend
- **React** 19.2.3
- **React Router DOM** 7.11.0
- **CSS3** with CSS Variables for theming

### Backend
- **PHP** (MySQL database)
- RESTful API endpoints

##  Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PHP 7.4+ with MySQL
- Web server (Apache/Nginx) for PHP backend


### 1. Clone the Repository
```bash
git clone <repository-url>
cd Alifish-uniproject
```

### 2. Install Frontend Dependencies
```bash
cd my-react-app
npm install
```

### 3. Backend Setup
1. Ensure PHP and MySQL are installed and running
2. Create a MySQL database named `fishshop-dp`
3. Import the database schema (if available)
4. Update database credentials in PHP files if needed:
   - Default: `localhost`, user: `root`, password: `""`, database: `fishshop-dp`
5. Place PHP files in your web server directory (e.g., `C:\xampp\htdocs\fishshop\`)

### 4. Start the Development Server
```bash
cd my-react-app
npm start
```

The app will open at `http://localhost:3000`

### 5. Backend Server
Ensure your PHP backend is accessible at `http://localhost/fishshop/`


```
Alifish-uniproject/
├── my-react-app/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── CartItem/        # Shopping cart item component
│   │   │   ├── FishCard/         # Product card component
│   │   │   ├── Footer/           # Footer with pagination
│   │   │   ├── Header/           # Header with search and navigation
│   │   │   ├── Login/            # Login form component
│   │   │   ├── Register/         # Registration form component
│   │   │   └── ProtectedRoute.jsx # Route protection
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Product listing page
│   │   │   ├── Cart.jsx          # Shopping cart page
│   │   │   ├── LoginPage.jsx     # Login page
│   │   │   ├── RegisterPage.jsx  # Registration page
│   │   │   └── UserPage.jsx      # User profile and orders
│   │   ├── data/
│   │   │   └── fishdata.js       # API data fetching
│   │   ├── styles/               # Global styles
│   │   ├── backend/              # PHP backend files
│   │   │   ├── api.php           # Main API endpoint
│   │   │   ├── login.php         # Login endpoint
│   │   │   ├── register.php      # Registration endpoint
│   │   │   ├── check-auth.php    # Authentication check
│   │   │   ├── place-order.php   # Order placement
│   │   │   ├── get-user-orders.php # Fetch user orders
│   │   │   └── logout.php        # Logout endpoint
│   │   ├── App.jsx               # Main app component
│   │   └── index.js              # Entry point
│   └── package.json
└── README.md
```

##  Key Features Explained

### Shopping Cart
- Add items to cart with stock validation
- Adjust quantities with +/- buttons
- Remove individual items
- View subtotal, discounts, and shipping
- Clear entire cart with confirmation

### Search
- Real-time search as you type
- 300ms debounce for performance
- Filters products by name
- Clear search functionality

### Pagination
- Page numbers displayed (not just prev/next)
- Smart ellipsis for many pages
- Click to jump to any page
- Responsive design

### User Authentication
- Secure login/registration
- Session management
- Protected routes
- Order history for logged-in users

### Error Handling
- Graceful handling of server unavailability
- User-friendly error messages
- Retry options where appropriate
- Network error detection

##  API Endpoints

All endpoints are located at `http://localhost/fishshop/`

- `GET /api.php` - Fetch all fish products
- `POST /login.php` - User login
- `POST /register.php` - User registration
- `GET /check-auth.php` - Check authentication status
- `POST /place-order.php` - Place an order
- `GET /get-user-orders.php` - Get user's order history
- `POST /logout.php` - User logout

## Styling

The application uses CSS Variables for theming:
- Primary colors: Cyan (#08d9d6) and Pink (#ff2e63)
- Dark background: #252a34
- Light background: #eaeaea
- Responsive design with mobile-first approach

## Available Scripts

In the `my-react-app` directory:

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (irreversible)

##  Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Tablet (768px - 1920px)
- Mobile (320px - 768px)

##  Security Features

- Protected routes for authenticated users
- Session-based authentication
- Input validation on forms
- SQL injection prevention (PHP backend)
- XSS protection

##  Troubleshooting

### "Failed to fetch" Error
- Ensure PHP backend server is running
- Check that backend is accessible at `http://localhost/fishshop/`
- Verify database connection in PHP files
- Check browser console for detailed error messages

### Images Not Loading
- Verify image paths in `backend/assets/images/`
- Check that images exist (1.png through 18.png)
- Ensure correct file permissions

### Authentication Issues
- Clear browser cookies and localStorage
- Check PHP session configuration
- Verify database user table exists

##  Learning Resources

This project demonstrates:
- React Hooks (useState, useEffect)
- React Router for navigation
- Form handling and validation
- API integration
- Error handling patterns
- Responsive CSS design
- Accessibility best practices

##  Author

**Alireza Ghadimi**
- Student ID: 40011541054349

##  License

This project is for educational purposes.

##  Acknowledgments

- React team for the amazing framework
- All contributors to the open-source libraries used

---

**Note**: Make sure both the React development server and PHP backend are running for the application to work properly.
