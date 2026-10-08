import { getCollections } from '../../config/db.js';

/**
 * Hospital Model
 * Handles all database operations for hospital and hospital blood requests
 */
class HospitalModel {
    constructor() {
        this.hospitalCollection = null;
        this.hospitalBookedCollection = null;
    }

    /**
     * Initialize the collections
     */
    init() {
        const collections = getCollections();
        this.hospitalCollection = collections.hospital;
        this.hospitalBookedCollection = collections.hospitalBooked;
    }

    /**
     * Create a new hospital registration
     */
    async create(hospitalData) {
        this.init();
        return await this.hospitalCollection.insertOne(hospitalData);
    }

    /**
     * Find hospital by email
     */
    async findByEmail(email) {
        this.init();
        return await this.hospitalCollection.findOne({ email });
    }

    /**
     * Find hospital by ID
     */
    async findById(id) {
        this.init();
        return await this.hospitalCollection.findOne({ _id: id });
    }

    /**
     * Find all hospitals or filter by email
     */
    async findAll(query = {}) {
        this.init();
        return await this.hospitalCollection.find(query).toArray();
    }

    /**
     * Delete hospital by email
     */
    async deleteByEmail(email) {
        this.init();
        return await this.hospitalCollection.deleteOne({ email });
    }

    /**
     * Check if hospital exists by email
     */
    async exists(email) {
        this.init();
        const hospital = await this.hospitalCollection.findOne({ email });
        return !!hospital;
    }

    // Hospital Blood Request Operations

    /**
     * Create a hospital blood request
     */
    async createBloodRequest(requestData) {
        this.init();
        return await this.hospitalBookedCollection.insertOne(requestData);
    }

    /**
     * Find hospital blood requests by query
     */
    async findBloodRequests(query = {}) {
        this.init();
        return await this.hospitalBookedCollection.find(query).toArray();
    }

    /**
     * Find hospital blood requests by email
     */
    async findBloodRequestsByEmail(email) {
        this.init();
        return await this.hospitalBookedCollection.find({ recipientEmail: email }).toArray();
    }

    /**
     * Find hospital blood requests by donor email
     */
    async findBloodRequestsByDonorEmail(email) {
        this.init();
        return await this.hospitalBookedCollection.find({ 'donorInfo.email': email }).toArray();
    }

    /**
     * Find accepted blood requests
     */
    async findAcceptedRequests() {
        this.init();
        return await this.hospitalBookedCollection.find({ requestStatus: 'Accepted' }).toArray();
    }

    /**
     * Update blood request status
     */
    async updateBloodRequestStatus(id, status, additionalData = {}) {
        this.init();
        const updateDoc = {
            $set: {
                requestStatus: status,
                ...additionalData
            }
        };
        return await this.hospitalBookedCollection.updateOne({ _id: id }, updateDoc);
    }
}

export default new HospitalModel();
