/**
 * Standardized API response utility
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {boolean} success - Success flag
 * @param {string} message - Response message
 * @param {*} data - Response data (optional)
 */
export const sendResponse = (res, statusCode, success, message, data = null) => {
    const response = {
        success,
        message,
    };

    if (data !== null) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};

/**
 * Success response helper
 */
export const sendSuccess = (res, message, data = null, statusCode = 200) => {
    return sendResponse(res, statusCode, true, message, data);
};

/**
 * Error response helper
 */
export const sendError = (res, message, statusCode = 500, data = null) => {
    return sendResponse(res, statusCode, false, message, data);
};

export default { sendResponse, sendSuccess, sendError };
