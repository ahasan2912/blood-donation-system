import { getCollections } from '../../config/db.js';

/**
 * Booking Model
 * Handles all database operations for donor booking and history
 */
class BookingModel {
    constructor() {
        this.bookedDonorsCollection = null;
        this.allReadyBookedCollection = null;
        this.donateHistoryCollection = null;
    }

    /**
     * Initialize the collections
     */
    init() {
        const collections = getCollections();
        this.bookedDonorsCollection = collections.bookedDonors;
        this.allReadyBookedCollection = collections.allReadyBooked;
        this.donateHistoryCollection = collections.donateHistory;
    }

    // Booked Donors Operations

    /**
     * Create a new donor booking
     */
    async createBooking(bookingData) {
        this.init();
        return await this.bookedDonorsCollection.insertOne(bookingData);
    }

    /**
     * Find booked donors by query
     */
    async findBookedDonors(query) {
        this.init();
        return await this.bookedDonorsCollection.find(query).toArray();
    }

    /**
     * Update booking status
     */
    async updateBookingStatus(id, status) {
        this.init();
        return await this.bookedDonorsCollection.updateOne(
            { _id: id },
            { $set: { status } }
        );
    }

    // Confirmed Bookings Operations

    /**
     * Create confirmed booking
     */
    async createConfirmedBooking(bookingData) {
        this.init();
        return await this.allReadyBookedCollection.insertOne(bookingData);
    }

    /**
     * Find confirmed bookings by recipient email
     */
    async findConfirmedBookings(recipientEmail) {
        this.init();
        return await this.allReadyBookedCollection.find({ recipientEmail }).toArray();
    }

    /**
     * Get all confirmed bookings
     */
    async findAllConfirmedBookings() {
        this.init();
        return await this.allReadyBookedCollection.find().toArray();
    }

    // History Operations

    /**
     * Create booking history entry
     */
    async createHistory(historyData) {
        this.init();
        return await this.donateHistoryCollection.insertOne(historyData);
    }

    /**
     * Find history by donor email
     */
    async findHistoryByDonorEmail(donorEmail) {
        this.init();
        return await this.donateHistoryCollection.find({ donorEmail }).toArray();
    }

    /**
     * Find history by recipient email
     */
    async findHistoryByRecipientEmail(recipientEmail) {
        this.init();
        return await this.donateHistoryCollection.find({ recipientEmail }).toArray();
    }
}

export default new BookingModel();
