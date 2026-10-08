import { ObjectId } from 'mongodb';
import DonorModel from './donor.model.js';
import UserModel from '../user/user.model.js';
import { getCollections } from '../../config/db.js';
import { formatDate } from '../../utils/helpers.js';

/**
 * Donor Service
 * Business logic layer for donor operations
 */
class DonorService {
    /**
     * Register a new donor
     */
    async registerDonor(donorData) {
        // Check if already registered as donor
        const existingDonor = await DonorModel.findByEmail(donorData.email);
        if (existingDonor) {
            return {
                success: false,
                message: 'You have already registered as a donor.',
                statusCode: 409
            };
        }

        // Check if already registered as recipient
        const collections = getCollections();
        const existingRecipient = await collections.recipients.findOne({ email: donorData.email });
        if (existingRecipient) {
            return {
                success: false,
                message: 'You have already registered as a Recipient.',
                statusCode: 409
            };
        }

        // Check if already registered as hospital
        const existingHospital = await collections.hospital.findOne({ email: donorData.email });
        if (existingHospital) {
            return {
                success: false,
                message: 'You have already registered as a Hospital.',
                statusCode: 409
            };
        }

        // Check if user role is admin
        const existAdmin = await UserModel.findByEmail(donorData.email);
        if (existAdmin?.role === 'admin') {
            return {
                success: false,
                message: 'Your role is already Admin, so you cannot be a Donor.',
                statusCode: 409
            };
        }

        // Create donor
        const donorResult = await DonorModel.create(donorData);

        // Update user role to donor
        await UserModel.updateRole(donorData.email, 'donor');

        return {
            success: true,
            message: 'Donor successfully registered and user role updated to donor.',
            data: donorResult,
            statusCode: 201
        };
    }

    /**
     * Get all donors or filter by email
     */
    async getDonors(email = null) {
        const query = email ? { email } : {};
        const donors = await DonorModel.findAll(query);

        return {
            success: true,
            message: 'Donors retrieved successfully',
            data: donors
        };
    }

    /**
     * Get donor by ID
     */
    async getDonorById(id) {
        try {
            const objectId = new ObjectId(id);
            const donor = await DonorModel.findById(objectId);

            if (!donor) {
                return {
                    success: false,
                    message: 'Donor not found',
                    statusCode: 404
                };
            }

            return {
                success: true,
                message: 'Donor retrieved successfully',
                data: donor
            };
        } catch (error) {
            return {
                success: false,
                message: 'Invalid donor ID format',
                statusCode: 400
            };
        }
    }

    /**
     * Delete donor by ID
     */
    async deleteDonor(id) {
        try {
            const objectId = new ObjectId(id);
            const result = await DonorModel.deleteById(objectId);

            if (result.deletedCount === 0) {
                return {
                    success: false,
                    message: 'Donor not found or already deleted',
                    statusCode: 404
                };
            }

            return {
                success: true,
                message: 'Donor deleted successfully',
                data: result
            };
        } catch (error) {
            return {
                success: false,
                message: 'Invalid donor ID format',
                statusCode: 400
            };
        }
    }

    /**
     * Update donor's last donation date (after accepting donation request)
     */
    async updateLastDonation(email) {
        const formattedDate = formatDate(new Date());
        const result = await DonorModel.updateLastDonation(email, formattedDate);

        if (result.matchedCount === 0) {
            return {
                success: false,
                message: 'Donor not found',
                statusCode: 404
            };
        }

        if (result.modifiedCount === 0) {
            return {
                success: false,
                message: 'No changes made. Already up to date.',
                statusCode: 200
            };
        }

        return {
            success: true,
            message: 'Last donation date, status, and count updated successfully',
            data: { lastDonation: formattedDate }
        };
    }

    /**
     * Update donor status
     */
    async updateDonorStatus(email, status) {
        const result = await DonorModel.updateStatus(email, status);

        if (result.matchedCount === 0) {
            return {
                success: false,
                message: 'Donor not found',
                statusCode: 404
            };
        }

        if (result.modifiedCount === 0) {
            return {
                success: false,
                message: 'Donor status is already up to date.',
                statusCode: 200
            };
        }

        return {
            success: true,
            message: 'Donor status updated successfully',
            data: result
        };
    }
}

export default new DonorService();
