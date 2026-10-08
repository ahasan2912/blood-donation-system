import RecipientService from './recipient.service.js';
import catchAsync from '../../utils/catchAsync.js';
import { sendSuccess, sendError } from '../../utils/sendResponse.js';

/**
 * Recipient Controller
 * Handles HTTP requests and responses for recipient/blood request operations
 */

/**
 * Register a new recipient/blood request
 * POST /recipients
 */
export const registerRecipient = catchAsync(async (req, res) => {
    const result = await RecipientService.registerRecipient(req.body);

    if (!result.success) {
        return sendError(res, result.message, result.statusCode);
    }

    return sendSuccess(res, result.message, result.data, result.statusCode);
});

/**
 * Get all recipients
 * GET /recipients
 */
export const getAllRecipients = catchAsync(async (req, res) => {
    const result = await RecipientService.getAllRecipients();
    return sendSuccess(res, result.message, result.data);
});

/**
 * Get recipient requests (filtered by email or all)
 * GET /recipient-requests?email=example@email.com
 */
export const getRecipientRequests = catchAsync(async (req, res) => {
    const { email } = req.query;
    const result = await RecipientService.getRecipientRequests(email);
    return sendSuccess(res, result.message, result.data);
});

/**
 * Get recipient by email
 * GET /recipients/:email
 */
export const getRecipientByEmail = catchAsync(async (req, res) => {
    const { email } = req.params;
    const result = await RecipientService.getRecipientByEmail(email);

    if (!result.success) {
        return sendError(res, result.message, result.statusCode);
    }

    return sendSuccess(res, result.message, result.data);
});

/**
 * Delete recipient by ID
 * DELETE /recipients/:id
 */
export const deleteRecipient = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await RecipientService.deleteRecipient(id);

    if (!result.success) {
        return sendError(res, result.message, result.statusCode);
    }

    return sendSuccess(res, result.message, result.data);
});

export default {
    registerRecipient,
    getAllRecipients,
    getRecipientRequests,
    getRecipientByEmail,
    deleteRecipient
};
