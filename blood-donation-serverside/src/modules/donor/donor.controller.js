import DonorService from './donor.service.js';
import catchAsync from '../../utils/catchAsync.js';
import { sendSuccess, sendError } from '../../utils/sendResponse.js';

/**
 * Donor Controller
 * Handles HTTP requests and responses for donor operations
 */

/**
 * Register a new donor
 * POST /donors
 */
export const registerDonor = catchAsync(async (req, res) => {
    const result = await DonorService.registerDonor(req.body);

    if (!result.success) {
        return sendError(res, result.message, result.statusCode);
    }

    return sendSuccess(res, result.message, result.data, result.statusCode);
});

/**
 * Get all donors or filter by email
 * GET /donors?email=example@email.com
 */
export const getDonors = catchAsync(async (req, res) => {
    const { email } = req.query;
    const result = await DonorService.getDonors(email);

    return sendSuccess(res, result.message, result.data);
});

/**
 * Get donor by ID
 * GET /donors/:id
 */
export const getDonorById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await DonorService.getDonorById(id);

    if (!result.success) {
        return sendError(res, result.message, result.statusCode);
    }

    return sendSuccess(res, result.message, result.data);
});

/**
 * Delete donor by ID
 * DELETE /donors/:id
 */
export const deleteDonor = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await DonorService.deleteDonor(id);

    if (!result.success) {
        return sendError(res, result.message, result.statusCode);
    }

    return sendSuccess(res, result.message, result.data);
});

/**
 * Update donor's last donation date
 * PATCH /donors/update-last-donation/:email
 */
export const updateLastDonation = catchAsync(async (req, res) => {
    const { email } = req.params;
    const result = await DonorService.updateLastDonation(email);

    if (!result.success && result.statusCode === 404) {
        return sendError(res, result.message, result.statusCode);
    }

    return sendSuccess(res, result.message, result.data);
});

/**
 * Update donor status
 * PATCH /donors/update-status/:email
 */
export const updateDonorStatus = catchAsync(async (req, res) => {
    const { email } = req.params;
    const { status } = req.body;

    if (!status) {
        return sendError(res, 'Status field is required', 400);
    }

    const result = await DonorService.updateDonorStatus(email, status);

    if (!result.success && result.statusCode === 404) {
        return sendError(res, result.message, result.statusCode);
    }

    return sendSuccess(res, result.message, result.data);
});

export default {
    registerDonor,
    getDonors,
    getDonorById,
    deleteDonor,
    updateLastDonation,
    updateDonorStatus
};
