import express from 'express';
import cors from 'cors';

// Import routes
import userRoutes from './src/modules/user/user.route.js';
import donorRoutes from './src/modules/donor/donor.route.js';
import recipientRoutes from './src/modules/recipient/recipient.route.js';
import hospitalRoutes from './src/modules/hospital/hospital.route.js';
import bookingRoutes from './src/modules/booking/booking.route.js';

/**
 * Express Application Setup
 */
const app = express();

// ==================== Middleware ====================

// CORS configuration
app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger middleware (development)
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    });
}

// ==================== Routes ====================

// Health check route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Blood Donation Server is running',
        version: '2.0.0',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/users', userRoutes);
app.use('/donors', donorRoutes);
app.use('/recipients', recipientRoutes);
app.use('/recipient-requests', recipientRoutes); // Additional path for backward compatibility
app.use('/hospital', hospitalRoutes);
app.use('/all/hospital', hospitalRoutes); // Additional path for backward compatibility
app.use('/booked-donors', bookingRoutes);
app.use('/all/booked/donor', bookingRoutes); // Additional path for backward compatibility
app.use('/hospitalBloodRequests', hospitalRoutes); // Additional path for backward compatibility
app.use('/accepted-requests', hospitalRoutes); // Additional path for backward compatibility
app.use('/hospital-blood', hospitalRoutes); // Additional path for backward compatibility
app.use('/hospital-blood-status', hospitalRoutes); // Additional path for backward compatibility
app.use('/hospital-blood-reject', hospitalRoutes); // Additional path for backward compatibility

// ==================== Error Handling ====================

// 404 handler - route not found
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.path}`,
        availableRoutes: {
            users: '/users',
            donors: '/donors',
            recipients: '/recipients',
            hospital: '/hospital',
            bookings: '/booked-donors'
        }
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message,
        error: process.env.NODE_ENV === 'production' ? undefined : {
            stack: err.stack,
            details: err
        }
    });
});

export default app;
