import express from 'express';
import cors from 'cors';

import userRoutes from './src/modules/user/user.route.js';
import donorRoutes from './src/modules/donor/donor.route.js';
import recipientRoutes from './src/modules/recipient/recipient.route.js';
import hospitalRoutes from './src/modules/hospital/hospital.route.js';
import bookingRoutes from './src/modules/booking/booking.route.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    });
}

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Blood Donation Server is running',
        version: '2.0.0',
        timestamp: new Date().toISOString()
    });
});

app.use('/users', userRoutes);
app.use('/donors', donorRoutes);
app.use('/recipients', recipientRoutes);
app.use('/recipient-requests', recipientRoutes); 
app.use('/hospital', hospitalRoutes);
app.use('/all/hospital', hospitalRoutes);
app.use('/booked-donors', bookingRoutes);
app.use('/all/booked/donor', bookingRoutes); 
app.use('/hospitalBloodRequests', hospitalRoutes); 
app.use('/accepted-requests', hospitalRoutes); 
app.use('/hospital-blood', hospitalRoutes); 
app.use('/hospital-blood-status', hospitalRoutes);
app.use('/hospital-blood-reject', hospitalRoutes); 

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
