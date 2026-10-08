import HospitalService from './hospital.service.js';
import catchAsync from '../../utils/catchAsync.js';
import { sendSuccess, sendError } from '../../utils/sendResponse.js';

/**
 * Hospital Controller
 * Handles HTTP requests and responses for hospital operations
 */

/**
 * Register a new hospital
 * POST /hospital
 */
export const registerHospital = catchAsync(async (req, res) => {
    const result = await HospitalService.registerHospital(req.body);

    if (!result.success) {
        return sendError(res, result.message, result.statusCode);
    }

    return sendSuccess(res, result.message, result.data, result.statusCode);
});

/**
 * Get all hospitals
 * GET /hospital/all
 */
export const getAllHospitals = catchAsync(async (req, res) => {
    const result = await HospitalService.getAllHospitals();
    return sendSuccess(res, result.message, result.data);
});

/**
 * Get hospital by email
 * GET /hospital/:email
 */
export const getHospitalByEmail = catchAsync(async (req, res) => {
    const { email } = req.params;
    const result = await HospitalService.getHospitalByEmail(email);
    return sendSuccess(res, result.message, result.data);
});

/**
 * Update hospital role (approve hospital)
 * PATCH /hospital/update-role/:id
 */
export const updateHospitalRole = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    const result = await HospitalService.updateHospitalRole(id, role);

    if (!result.success) {
        return sendError(res, result.message, result.statusCode);
    }

    return sendSuccess(res, result.message, result.data);
});

/**
 * Delete hospital (from both collections and send email)
 * DELETE /hospital/:email
 */
export const deleteHospital = catchAsync(async (req, res) => {
    const { email } = req.params;
    const result = await HospitalService.deleteHospital(email);
    return sendSuccess(res, result.message, result.data);
});

/**
 * Create a hospital blood request
 * POST /hospital/blood-requests
 */
export const createBloodRequest = catchAsync(async (req, res) => {
    const result = await HospitalService.createBloodRequest(req.body);
    return sendSuccess(res, result.message, result.data);
});

/**
 * Get hospital blood requests
 * GET /hospital/blood-requests?email=example@email.com
 */
export const getBloodRequests = catchAsync(async (req, res) => {
    const { email } = req.query;
    const result = await HospitalService.getBloodRequests(email);
    return sendSuccess(res, result.message, result.data);
});

/**
 * Get hospital blood requests by recipient email
 * GET /hospital/blood-requests/:email
 */
export const getBloodRequestsByEmail = catchAsync(async (req, res) => {
    const { email } = req.params;
    const result = await HospitalService.getBloodRequestsByRecipientEmail(email);
    return sendSuccess(res, result.message, result.data);
});

/**
 * Get accepted blood requests
 * GET /hospital/accepted-requests
 */
export const getAcceptedRequests = catchAsync(async (req, res) => {
    const result = await HospitalService.getAcceptedRequests();
    return sendSuccess(res, result.message, result.data);
});

/**
 * Accept blood request
 * PATCH /hospital/blood-requests/accept/:id
 */
export const acceptBloodRequest = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const result = await HospitalService.acceptBloodRequest(id, status);

    if (!result.success) {
        return sendError(res, result.message, result.statusCode);
    }

    return sendSuccess(res, result.message, result.data);
});

/**
 * Reject blood request
 * PATCH /hospital/blood-requests/reject/:id
 */
export const rejectBloodRequest = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const result = await HospitalService.rejectBloodRequest(id, status);

    if (!result.success) {
        return sendError(res, result.message, result.statusCode);
    }

    return sendSuccess(res, result.message, result.data);
});

export default {
    registerHospital,
    getAllHospitals,
    getHospitalByEmail,
    updateHospitalRole,
    deleteHospital,
    createBloodRequest,
    getBloodRequests,
    getBloodRequestsByEmail,
    getAcceptedRequests,
    acceptBloodRequest,
    rejectBloodRequest
};
