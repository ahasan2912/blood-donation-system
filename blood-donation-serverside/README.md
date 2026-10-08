# Blood Donation Management System - Backend API

A modern, modular Blood Donation Management System backend built with Node.js, Express, and MongoDB using ES Modules architecture.

## 🚀 Features

- ✅ **ES Modules (ESM)** - Modern JavaScript module system
- ✅ **Clean Architecture** - Separation of concerns with Model-Service-Controller pattern
- ✅ **Modular Design** - Each feature isolated in its own module
- ✅ **Type Safety** - Proper validation and error handling
- ✅ **Email Notifications** - Automated emails using Nodemailer
- ✅ **RESTful API** - Standard HTTP methods and status codes
- ✅ **MongoDB Integration** - Efficient database operations
- ✅ **Vercel Ready** - Optimized for serverless deployment

## 📁 Project Structure

```
blood-donation-serverside/
├── app.js                      # Express application setup
├── server.js                   # Server entry point
├── package.json                # Dependencies and scripts
├── vercel.json                 # Vercel deployment config
├── .env                        # Environment variables (not in git)
├── .gitignore                  # Git ignore rules
│
└── src/
    ├── config/
    │   └── db.js               # Database configuration
    │
    ├── modules/
    │   ├── user/               # User management
    │   │   ├── user.model.js
    │   │   ├── user.service.js
    │   │   ├── user.controller.js
    │   │   └── user.route.js
    │   │
    │   ├── donor/              # Donor management
    │   │   ├── donor.model.js
    │   │   ├── donor.service.js
    │   │   ├── donor.controller.js
    │   │   └── donor.route.js
    │   │
    │   ├── recipient/          # Recipient/Blood request management
    │   │   ├── recipient.model.js
    │   │   ├── recipient.service.js
    │   │   ├── recipient.controller.js
    │   │   └── recipient.route.js
    │   │
    │   ├── hospital/           # Hospital management
    │   │   ├── hospital.model.js
    │   │   ├── hospital.service.js
    │   │   ├── hospital.controller.js
    │   │   └── hospital.route.js
    │   │
    │   └── booking/            # Donor booking management
    │       ├── booking.model.js
    │       ├── booking.service.js
    │       ├── booking.controller.js
    │       └── booking.route.js
    │
    ├── middlewares/            # Custom middleware (future)
    │
    └── utils/
        ├── email.util.js       # Email sending utility
        ├── catchAsync.js       # Async error handler
        ├── sendResponse.js     # Standardized API responses
        └── helpers.js          # Helper functions
```

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd blood-donation-serverside
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password

# Server
PORT=5000
NODE_ENV=development

# Email (Nodemailer)
NODEMAILER_USER=your_email@gmail.com
NODEMAILER_PASS=your_app_password
```

4. **Start the server**

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

## 📡 API Endpoints

### User Routes (`/users`)
- `POST /users` - Create a new user
- `GET /users` - Get all users
- `GET /users/role/:email` - Get user role
- `DELETE /users/:id` - Delete user by ID
- `DELETE /users/email/:email` - Delete user by email

### Donor Routes (`/donors`)
- `POST /donors` - Register a new donor
- `GET /donors` - Get all donors (query: `?email=`)
- `GET /donors/:id` - Get donor by ID
- `DELETE /donors/:id` - Delete donor
- `PATCH /donors/update-last-donation/:email` - Update last donation date
- `PATCH /donors/update-status/:email` - Update donor status

### Recipient Routes (`/recipients`)
- `POST /recipients` - Register recipient/blood request
- `GET /recipients` - Get all recipients
- `GET /recipients/requests` - Get recipient requests (query: `?email=`)
- `GET /recipients/:email` - Get recipient by email
- `DELETE /recipients/:id` - Delete recipient

### Hospital Routes (`/hospital`)
- `POST /hospital` - Register a new hospital
- `GET /hospital/all` - Get all hospitals
- `GET /hospital/:email` - Get hospital by email
- `PATCH /hospital/update-role/:id` - Update hospital role (approve)
- `DELETE /hospital/:email` - Delete hospital
- `POST /hospital/blood-requests` - Create blood request
- `GET /hospital/blood-requests` - Get blood requests (query: `?email=`)
- `GET /hospital/accepted-requests` - Get accepted requests
- `PATCH /hospital/blood-requests/accept/:id` - Accept blood request
- `PATCH /hospital/blood-requests/reject/:id` - Reject blood request

### Booking Routes (`/booked-donors`)
- `POST /booked-donors` - Create a booking
- `GET /booked-donors` - Get bookings (query: `?email=&userEmail=`)
- `PATCH /booked-donors/update-status/:id` - Update booking status
- `POST /booked-donors/confirm` - Confirm booking
- `GET /booked-donors/confirmed/:email` - Get confirmed bookings
- `GET /booked-donors/all-confirmed` - Get all confirmed bookings
- `POST /booked-donors/history` - Create history (rejection)
- `GET /booked-donors/history/:email` - Get history

## 🔧 Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Nodemailer** - Email service
- **dotenv** - Environment variables
- **CORS** - Cross-origin resource sharing

## 📦 Database Collections

- `users` - User accounts and roles
- `donors` - Donor profiles
- `recipients` - Blood request recipients
- `bookedDonors` - Active donor bookings
- `allReadyBooked` - Confirmed bookings
- `donateHistory` - Donation history
- `hospital` - Hospital registrations
- `hospitalBooked` - Hospital blood requests

## 🚀 Deployment

### Vercel Deployment

1. Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

2. Deploy
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
- `DB_USER`
- `DB_PASS`
- `NODEMAILER_USER`
- `NODEMAILER_PASS`

## 🔄 Migration from Old Code

The project has been migrated from CommonJS to ES Modules with the following improvements:

### What Changed:
- ✅ `require()` → `import`
- ✅ `module.exports` → `export`
- ✅ Monolithic `index.js` → Modular architecture
- ✅ Inline logic → Service layer pattern
- ✅ Mixed concerns → Separation of concerns
- ✅ Callback-based emails → Async/await pattern

### Benefits:
- 🎯 **Better Organization** - Each feature in its own module
- 🔍 **Easier Debugging** - Clear separation of layers
- 🧪 **More Testable** - Isolated business logic
- 📈 **Scalable** - Easy to add new features
- 🛡️ **Type Safe** - Better error handling
- 🔧 **Maintainable** - Clean, readable code

## 📝 Development Guidelines

### Adding a New Module

1. Create module directory: `src/modules/feature-name/`
2. Create four files:
   - `feature.model.js` - Database operations
   - `feature.service.js` - Business logic
   - `feature.controller.js` - HTTP handlers
   - `feature.route.js` - Express routes
3. Register routes in `app.js`

### Code Style

- Use ES Modules (`import`/`export`)
- Use async/await for asynchronous operations
- Use `catchAsync` wrapper for async route handlers
- Use `sendSuccess`/`sendError` for consistent responses
- Add JSDoc comments for functions
- Handle errors gracefully

## 🐛 Troubleshooting

### Common Issues

**Issue: "Cannot find module"**
- Ensure all imports use `.js` extension
- Check file paths are correct

**Issue: "Database connection failed"**
- Verify `.env` file exists with correct credentials
- Check MongoDB connection string format

**Issue: "Email not sending"**
- Verify Gmail app password (not regular password)
- Enable "Less secure app access" if using regular Gmail

## 📄 License

ISC

## 👥 Contributors

- Your Team Name

## 📞 Support

For issues or questions, please contact the development team.

---

**Version:** 2.0.0  
**Last Updated:** 2024
