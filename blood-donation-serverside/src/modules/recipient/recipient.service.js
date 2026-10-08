import { ObjectId } from 'mongodb';
import RecipientModel from './recipient.model.js';
import UserModel from '../user/user.model.js';
import { getCollections } from '../../config/db.js';

/**
 * Recipient Service
 * Business logic layer for recipient/blood request operations
 */
class RecipientService {
    /**
     * Register a new recipient/blood request
     */
    async registerRecipient(recipientData) {
        const collections = getCollections();

        // Check if already registered as donor
        const existingDonor = await collections.donors.findOne({ email: recipientData.email });
        if (existingDonor) {
            return {
                success: false,
                message: 'You have already registered as a donor.',
                statusCode: 409
            };
        }

        // Check if already registered as hospital
        const existingHospital = await collections.hospital.findOne({ email: recipientData.email });
        if (existingHospital) {
            return {
                success: false,
                message: 'You have already registered as a Hospital.',
                statusCode: 409
            };
        }

        // Check if user role is admin
        const existAdmin = await UserModel.findByEmail(recipientData.email);
        if (existAdmin?.role === 'admin') {
            return {
                success: false,
                message: 'Your role is already Admin, so you cannot be a Recipient.',
                statusCode: 409
            };
        }

        // Check if already registered as recipient
        const existingRecipient = await RecipientModel.findByEmail(recipientData.email);
        
        if (existingRecipient) {
            // If already recipient, just add new request
            const recipientResult = await RecipientModel.create(recipientData);
            return {
                success: true,
                message: 'Recipient request submitted successfully!',
                data: recipientResult,
                statusCode: 200
            };
        }

        // First time recipient - create and update role
        const recipientResult = await RecipientModel.create(recipientData);
        await UserModel.updateRole(recipientData.email, 'recepient');

        return {
            success: true,
            message: 'Recipient successfully registered and user role updated.',
            data: recipientResult,
            statusCode: 201
        };
    }

    /**
     * Get all recipients
     */
    async getAllRecipients() {
        const recipients = await RecipientModel.findAll();

        return {
            success: true,
            message: 'Recipients retrieved successfully',
            data: recipients
        };
    }

    /**
     * Get recipient requests by email or role
     */
    async getRecipientRequests(email = null) {
        const query = { role: 'recipient' };
        if (email) {
            query.email = email;
        }

        const requests = await RecipientModel.findAll(query);

        return {
            success: true,
            message: 'Recipient requests retrieved successfully',
            data: requests
        };
    }

    /**
     * Get recipient by email
     */
    async getRecipientByEmail(email) {
        const recipient = await RecipientModel.findByEmail(email);

        if (!recipient) {
            return {
                success: false,
                message: 'Recipient not found',
                statusCode: 404
            };
        }

        return {
            success: true,
            message: 'Recipient retrieved successfully',
            data: recipient
        };
    }

    /**
     * Delete recipient by ID
     */
    async deleteRecipient(id) {
        try {
            const objectId = new ObjectId(id);
            const result = await RecipientModel.deleteById(objectId);

            if (result.deletedCount === 0) {
                return {
                    success: false,
                    message: 'Recipient not found or already deleted',
                    statusCode: 404
                };
            }

            return {
                success: true,
                message: 'Recipient deleted successfully',
                data: result
            };
        } catch (error) {
            return {
                success: false,
                message: 'Invalid recipient ID format',
                statusCode: 400
            };
        }
    }
}

export default new RecipientService();
