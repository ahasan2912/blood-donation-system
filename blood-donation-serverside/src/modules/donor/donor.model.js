import { getCollections } from '../../config/db.js';

/**
 * Donor Model
 * Handles all database operations for donors collection
 */
class DonorModel {
    constructor() {
        this.collection = null;
    }

    /**
     * Initialize the collection
     */
    init() {
        const collections = getCollections();
        this.collection = collections.donors;
    }

    /**
     * Create a new donor
     */
    async create(donorData) {
        this.init();
        return await this.collection.insertOne(donorData);
    }

    /**
     * Find donor by email
     */
    async findByEmail(email) {
        this.init();
        return await this.collection.findOne({ email });
    }

    /**
     * Find all donors or filter by email
     */
    async findAll(query = {}) {
        this.init();
        return await this.collection.find(query).toArray();
    }

    /**
     * Find donor by ID
     */
    async findById(id) {
        this.init();
        return await this.collection.findOne({ _id: id });
    }

    /**
     * Update donor by email
     */
    async updateByEmail(email, updateData) {
        this.init();
        return await this.collection.updateOne(
            { email },
            { $set: updateData }
        );
    }

    /**
     * Update last donation date and increment donation count
     */
    async updateLastDonation(email, lastDonationDate) {
        this.init();
        return await this.collection.updateOne(
            { email },
            {
                $set: {
                    lastDonation: lastDonationDate,
                    status: 'Pending'
                },
                $inc: {
                    donationCount: 1
                }
            }
        );
    }

    /**
     * Update donor status
     */
    async updateStatus(email, status) {
        this.init();
        return await this.collection.updateOne(
            { email },
            { $set: { status } }
        );
    }

    /**
     * Delete donor by ID
     */
    async deleteById(id) {
        this.init();
        return await this.collection.deleteOne({ _id: id });
    }

    /**
     * Check if donor exists by email
     */
    async exists(email) {
        this.init();
        const donor = await this.collection.findOne({ email });
        return !!donor;
    }
}

export default new DonorModel();
