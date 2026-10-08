import BookingService from './booking.service.js';
import catchAsync from '../../utils/catchAsync.js';
import { sendSuccess, sendError } from '../../utils/sendResponse.js';

/**
 * Booking Controller
 * Handles HTTP requests and responses for booking operations
 */

/**
 * Create a new donor booking
 * POST /booked-donors
 */
export const createBooking = catchAsync(async (req, res) => {
    const result = await BookingService.createBooking(req.body);
    return sendSuccess(res, result.message, result.data);
});

/**
 * Get booked donors
 * GET /booked-donors?email=donor@email.com&userEmail=recipient@email.com
 */
export const getBookedDonors = catchAsync(async (req, res) => {
    const { email, userEmail } = req.query;
    const result = await BookingService.getBookedDonors(email, userEmail);

    if (!result.success) {
        return sendError(res, result.message, result.statusCode);
    }

    return sendSuccess(res, result.message, result.data);
});

/**
 * Update booking status
 * PATCH /booked-donors/update-status/:id
 */
export const updateBookingStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const result = await BookingService.updateBookingStatus(id, status);

    if (!result.success && result.statusCode !== 200) {
        return sendError(res, result.message, result.statusCode);
    }

    return sendSuccess(res, result.message, result.data);
});

/**
 * Confirm booking
 * POST /booked-donors/confirm
 */
export const confirmBooking = catchAsync(async (req, res) => {
    const result = await BookingService.confirmBooking(req.body);
    return sendSuccess(res, result.message, result.data);
});

/**
 * Get confirmed bookings by recipient email
 * GET /booked-donors/confirmed/:email
 */
export const getConfirmedBookings = catchAsync(async (req, res) => {
    const { email } = req.params;
    const result = await BookingService.getConfirmedBookings(email);
    return sendSuccess(res, result.message, result.data);
});

/**
 * Get all confirmed bookings
 * GET /booked-donors/all-confirmed
 */
export const getAllConfirmedBookings = catchAsync(async (req, res) => {
    const result = await BookingService.getAllConfirmedBookings();
    return sendSuccess(res, result.message, result.data);
});

/**
 * Create booking history (rejected donation)
 * POST /booked-donors/history
 */
export const createHistory = catchAsync(async (req, res) => {
    const result = await BookingService.createHistory(req.body);
    return sendSuccess(res, result.message, result.data);
});

/**
 * Get booking history by email
 * GET /booked-donors/history/:email
 */
export const getHistory = catchAsync(async (req, res) => {
    const { email } = req.params;
    const result = await BookingService.getHistory(email);
    return sendSuccess(res, result.message, result.data);
});

export default {
    createBooking,
    getBookedDonors,
    updateBookingStatus,
    confirmBooking,
    getConfirmedBookings,
    getAllConfirmedBookings,
    createHistory,
    getHistory
};
