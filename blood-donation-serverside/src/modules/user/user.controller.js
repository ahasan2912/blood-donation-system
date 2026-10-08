import UserService from './user.service.js';
import catchAsync from '../../utils/catchAsync.js';
import { sendSuccess, sendError } from '../../utils/sendResponse.js';

/**
 * User Controller
 * Handles HTTP requests and responses for user operations
 */

/**
 * Create a new user
 * POST /users
 */
export const createUser = catchAsync(async (req, res) => {
    const result = await UserService.createUser(req.body);

    if (!result.success) {
        return sendError(res, result.message, 409);
    }

    return sendSuccess(res, result.message, result.data, 201);
});

/**
 * Get all users
 * GET /users
 */
export const getAllUsers = catchAsync(async (req, res) => {
    const result = await UserService.getAllUsers();
    return sendSuccess(res, result.message, result.data);
});

/**
 * Get user role by email
 * GET /users/role/:email
 */
export const getUserRole = catchAsync(async (req, res) => {
    const { email } = req.params;
    const result = await UserService.getUserRole(email);

    if (!result.success) {
        return sendError(res, result.message, 404, result.data);
    }

    return sendSuccess(res, result.message, result.data);
});

/**
 * Delete user by ID
 * DELETE /users/:id
 */
export const deleteUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UserService.deleteUser(id);

    if (!result.success) {
        return sendError(res, result.message, 404);
    }

    return sendSuccess(res, result.message, result.data);
});

/**
 * Delete user by email
 * DELETE /users/email/:email
 */
export const deleteUserByEmail = catchAsync(async (req, res) => {
    const { email } = req.params;
    const result = await UserService.deleteUserByEmail(email);

    if (!result.success) {
        return sendError(res, result.message, 404);
    }

    return sendSuccess(res, result.message, result.data);
});

export default {
    createUser,
    getAllUsers,
    getUserRole,
    deleteUser,
    deleteUserByEmail
};
