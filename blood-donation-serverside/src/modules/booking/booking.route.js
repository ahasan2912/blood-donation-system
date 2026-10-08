import express from 'express';
import {
    createBooking,
    getBookedDonors,
    updateBookingStatus,
    confirmBooking,
    getConfirmedBookings,
    getAllConfirmedBookings,
    createHistory,
    getHistory
} from './booking.controller.js';

const router = express.Router();

/**
 * Booking Routes
 * Base path: /api/booked-donors
 */

// Create a new booking
router.post('/', createBooking);

// Get booked donors
router.get('/', getBookedDonors);

// Update booking status
router.patch('/update-status/:id', updateBookingStatus);

// Confirm booking
router.post('/confirm', confirmBooking);

// Get confirmed bookings by email
router.get('/confirmed/:email', getConfirmedBookings);

// Get all confirmed bookings
router.get('/all-confirmed', getAllConfirmedBookings);

// Create booking history (rejection)
router.post('/history', createHistory);

// Get booking history by email
router.get('/history/:email', getHistory);

export default router;
