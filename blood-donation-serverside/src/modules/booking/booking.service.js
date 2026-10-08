import { ObjectId } from 'mongodb';
import BookingModel from './booking.model.js';
import { sendEmail } from '../../utils/email.util.js';

/**
 * Booking Service
 * Business logic layer for donor booking operations
 */
class BookingService {
    /**
     * Create a new donor booking and send email notification
     */
    async createBooking(bookingData) {
        const result = await BookingModel.createBooking(bookingData);

        // Send email notification to donor
        if (result?.insertedId) {
            await sendEmail(bookingData.donorEmail, {
                subject: 'Urgent Blood Donation Request',
                message: `Dear ${bookingData.donorName}, 
                I urgently need blood type of ( ${bookingData.donorBloodType} ). If you are available to donate, it would mean a lot. Update on the website or Phone call me if you're able to donate. Thanks! Contact number: ${bookingData.donorContact}.
                Best regards ${bookingData.recipientName}`
            });
        }

        return {
            success: true,
            message: 'Booking created successfully and notification sent',
            data: result
        };
    }

    /**
     * Get booked donors by email or userEmail
     */
    async getBookedDonors(email = null, userEmail = null) {
        if (!email && !userEmail) {
            return {
                success: false,
                message: "Query param 'email' or 'userEmail' is required",
                statusCode: 400
            };
        }

        const query = {};
        if (email) {
            query.donorEmail = email;
        }
        if (userEmail) {
            query.recipientEmail = userEmail;
        }

        const bookedDonors = await BookingModel.findBookedDonors(query);

        return {
            success: true,
            message: 'Booked donors retrieved successfully',
            data: bookedDonors
        };
    }

    /**
     * Update booking status
     */
    async updateBookingStatus(id, status) {
        if (!status) {
            return {
                success: false,
                message: 'Status field is required',
                statusCode: 400
            };
        }

        try {
            const objectId = new ObjectId(id);
            const result = await BookingModel.updateBookingStatus(objectId, status);

            if (result.matchedCount === 0) {
                return {
                    success: false,
                    message: 'Booking not found',
                    statusCode: 404
                };
            }

            if (result.modifiedCount === 0) {
                return {
                    success: false,
                    message: 'Status already up to date',
                    statusCode: 200
                };
            }

            return {
                success: true,
                message: 'Status updated successfully',
                data: result
            };
        } catch (error) {
            return {
                success: false,
                message: 'Invalid booking ID format',
                statusCode: 400
            };
        }
    }

    /**
     * Confirm booking and send confirmation email
     */
    async confirmBooking(bookingData) {
        const result = await BookingModel.createConfirmedBooking(bookingData);

        // Send confirmation email to recipient
        if (result?.insertedId) {
            await sendEmail(bookingData.recipientEmail, {
                subject: 'Blood Donation Confirmation',
                message: `Dear ${bookingData.recipientName}, I am available and ready to donate blood. Let me know the details of where and when to come. If any problem please connect with me ${bookingData.donorContact}.
                Best regards ${bookingData.donorName}`
            });
        }

        return {
            success: true,
            message: 'Booking confirmed and notification sent',
            data: result
        };
    }

    /**
     * Get confirmed bookings by recipient email
     */
    async getConfirmedBookings(email) {
        const confirmedBookings = await BookingModel.findConfirmedBookings(email);

        return {
            success: true,
            message: 'Confirmed bookings retrieved successfully',
            data: confirmedBookings
        };
    }

    /**
     * Get all confirmed bookings
     */
    async getAllConfirmedBookings() {
        const bookings = await BookingModel.findAllConfirmedBookings();

        return {
            success: true,
            message: 'All confirmed bookings retrieved successfully',
            data: bookings
        };
    }

    /**
     * Create booking history and send rejection email
     */
    async createHistory(historyData) {
        const result = await BookingModel.createHistory(historyData);

        // Send rejection email to recipient
        if (result?.insertedId) {
            await sendEmail(historyData.recipientEmail, {
                subject: 'Unable to Donate',
                message: `I am sorry to inform you that I would not be able to donate blood at this time due to personal reasons or unavailability. Please try to find another donor as soon as possible. I hope your situation improves quickly.
                Best regards ${historyData.donorName}`
            });
        }

        return {
            success: true,
            message: 'History created and notification sent',
            data: result
        };
    }

    /**
     * Get booking history by email
     */
    async getHistory(email) {
        const donorHistory = await BookingModel.findHistoryByDonorEmail(email);
        const requestHistory = await BookingModel.findHistoryByRecipientEmail(email);

        return {
            success: true,
            message: 'History retrieved successfully',
            data: { donorHistory, requestHistory }
        };
    }
}

export default new BookingService();
