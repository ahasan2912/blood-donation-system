import { getCollections } from '../../config/db.js';

/**
 * Recipient Model
 * Handles all database operations for recipients collection
 */
class RecipientModel {
    constructor() {
        this.collection = null;
    }

    /**
     * Initialize the collection
     */
    init() {
        const collections = getCollections();
        this.collection = collections.recipients;
    }

    /**
     * Create a new recipient/blood request
     */
    async create(recipientData) {
        this.init();
        return await this.collection.insertOne(recipientData);
    }

    /**
     * Find recipient by email
     */
    async findByEmail(email) {
        this.init();
        return await this.collection.findOne({ email });
    }

    /**
     * Find all recipients or filter by query
     */
    async findAll(query = {}) {
        this.init();
        return await this.collection.find(query).toArray();
    }

    /**
     * Find recipient by ID
     */
    async findById(id) {
        this.init();
        return await this.collection.findOne({ _id: id });
    }

    /**
     * Delete recipient by ID
     */
    async deleteById(id) {
        this.init();
        return await this.collection.deleteOne({ _id: id });
    }

    /**
     * Check if recipient exists by email
     */
    async exists(email) {
        this.init();
        const recipient = await this.collection.findOne({ email });
        return !!recipient;
    }
}

export default new RecipientModel();
