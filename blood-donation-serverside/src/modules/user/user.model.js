import { getCollections } from '../../config/db.js';

/**
 * User Model
 * Handles all database operations for users collection
 */
class UserModel {
    constructor() {
        this.collection = null;
    }

    /**
     * Initialize the collection
     */
    init() {
        const collections = getCollections();
        this.collection = collections.users;
    }

    /**
     * Create a new user
     */
    async create(userData) {
        this.init();
        const user = {
            ...userData,
            timestamp: Date.now(),
            role: userData.role || 'user'
        };
        return await this.collection.insertOne(user);
    }

    /**
     * Find user by email
     */
    async findByEmail(email) {
        this.init();
        return await this.collection.findOne({ email });
    }

    /**
     * Find all users
     */
    async findAll() {
        this.init();
        return await this.collection.find().toArray();
    }

    /**
     * Update user role
     */
    async updateRole(email, role) {
        this.init();
        return await this.collection.updateOne(
            { email },
            { $set: { role } }
        );
    }

    /**
     * Delete user by ID
     */
    async deleteById(id) {
        this.init();
        return await this.collection.deleteOne({ _id: id });
    }

    /**
     * Delete user by email
     */
    async deleteByEmail(email) {
        this.init();
        return await this.collection.deleteOne({ email });
    }

    /**
     * Check if user exists by email
     */
    async exists(email) {
        this.init();
        const user = await this.collection.findOne({ email });
        return !!user;
    }
}

export default new UserModel();
