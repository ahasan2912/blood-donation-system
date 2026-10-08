import { ObjectId } from 'mongodb';
import HospitalModel from './hospital.model.js';
import UserModel from '../user/user.model.js';
import { sendEmail } from '../../utils/email.util.js';

/**
 * Hospital Service
 * Business logic layer for hospital operations
 */
class HospitalService {
    /**
     * Register a new hospital
     */
    async registerHospital(hospitalData) {
        // Check if hospital already exists
        const existingHospital = await HospitalModel.findByEmail(hospitalData.email);
        if (existingHospital) {
            return {
                success: false,
                message: 'You have already registered as a hospital.',
                statusCode: 409
            };
        }

        const hospitalResult = await HospitalModel.create(hospitalData);

        return {
            success: true,
            message: 'Hospital successfully registered.',
            data: hospitalResult,
            statusCode: 201
        };
    }

    /**
     * Get all hospitals
     */
    async getAllHospitals() {
        const hospitals = await HospitalModel.findAll();

        return {
            success: true,
            message: 'Hospitals retrieved successfully',
            data: hospitals
        };
    }

    /**
     * Get hospital by email
     */
    async getHospitalByEmail(email) {
        const hospitals = await HospitalModel.findAll({ email });

        return {
            success: true,
            message: 'Hospital data retrieved successfully',
            data: hospitals
        };
    }

    /**
     * Update hospital role and send approval email
     */
    async updateHospitalRole(hospitalId, role) {
        if (role !== 'hospital') {
            return {
                success: false,
                message: 'Invalid role provided.',
                statusCode: 400
            };
        }

        try {
            const objectId = new ObjectId(hospitalId);
            const hospital = await HospitalModel.findById(objectId);

            if (!hospital) {
                return {
                    success: false,
                    message: 'Hospital not found.',
                    statusCode: 404
                };
            }

            const result = await UserModel.updateRole(hospital.email, role);

            if (result.matchedCount === 0) {
                return {
                    success: false,
                    message: 'User not found with this email.',
                    statusCode: 404
                };
            }

            // Send approval email
            await sendEmail(hospital.email, {
                subject: 'Your Access Request Has Been Approved',
                message: `Your request to access the blood donation system has been approved by the admin. 
                You can now log in and proceed with your operations.
                
                Thank you,
                Admin Team`
            });

            return {
                success: true,
                message: 'Hospital role updated and approval email sent',
                data: result
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to update hospital role.',
                statusCode: 500
            };
        }
    }

    /**
     * Delete hospital and send revocation email
     */
    async deleteHospital(email) {
        // Delete from hospital collection
        const hospitalResult = await HospitalModel.deleteByEmail(email);

        // Delete from user collection
        const userResult = await UserModel.deleteByEmail(email);

        // Send revocation email
        await sendEmail(email, {
            subject: 'Your Access Has Been Revoked',
            message: `This is to inform you that your access to the blood donation system has been deleted/revoked by the admin.
            If you believe this is a mistake or need further assistance, please contact the admin team.
            
            Thank you,
            Admin Team`
        });

        return {
            success: true,
            message: 'Hospital deleted and revocation email sent',
            data: { hospitalResult, userResult }
        };
    }

    /**
     * Create a hospital blood request
     */
    async createBloodRequest(requestData) {
        const result = await HospitalModel.createBloodRequest(requestData);

        return {
            success: true,
            message: 'Hospital blood request saved successfully',
            data: { insertedId: result.insertedId }
        };
    }

    /**
     * Get hospital blood requests (filtered by email or donor email)
     */
    async getBloodRequests(email = null) {
        let requests;

        if (email) {
            // Check if it's donor email or recipient email
            requests = await HospitalModel.findBloodRequestsByDonorEmail(email);
        } else {
            requests = await HospitalModel.findBloodRequests();
        }

        return {
            success: true,
            message: 'Blood requests retrieved successfully',
            data: requests
        };
    }

    /**
     * Get hospital blood requests by recipient email
     */
    async getBloodRequestsByRecipientEmail(email) {
        const requests = await HospitalModel.findBloodRequestsByEmail(email);

        return {
            success: true,
            message: 'Blood requests retrieved successfully',
            data: requests
        };
    }

    /**
     * Get accepted blood requests
     */
    async getAcceptedRequests() {
        const requests = await HospitalModel.findAcceptedRequests();

        return {
            success: true,
            message: 'Accepted requests retrieved successfully',
            data: requests
        };
    }

    /**
     * Update blood request status (Accept)
     */
    async acceptBloodRequest(id, status) {
        try {
            const objectId = new ObjectId(id);
            const result = await HospitalModel.updateBloodRequestStatus(
                objectId,
                status,
                { acceptedAt: new Date() }
            );

            if (result.matchedCount === 0) {
                return {
                    success: false,
                    message: 'Blood request not found',
                    statusCode: 404
                };
            }

            return {
                success: true,
                message: 'Blood request status updated successfully',
                data: result
            };
        } catch (error) {
            return {
                success: false,
                message: 'Invalid request ID format',
                statusCode: 400
            };
        }
    }

    /**
     * Update blood request status (Reject)
     */
    async rejectBloodRequest(id, status) {
        try {
            const objectId = new ObjectId(id);
            const result = await HospitalModel.updateBloodRequestStatus(objectId, status);

            if (result.matchedCount === 0) {
                return {
                    success: false,
                    message: 'Blood request not found',
                    statusCode: 404
                };
            }

            return {
                success: true,
                message: 'Blood request rejected successfully',
                data: result
            };
        } catch (error) {
            return {
                success: false,
                message: 'Invalid request ID format',
                statusCode: 400
            };
        }
    }
}

export default new HospitalService();
