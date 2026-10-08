import express from 'express';
import {
    registerRecipient,
    getAllRecipients,
    getRecipientRequests,
    getRecipientByEmail,
    deleteRecipient
} from './recipient.controller.js';

const router = express.Router();

/**
 * Recipient Routes
 * Base path: /api/recipients
 */

// Register a new recipient/blood request
router.post('/', registerRecipient);

// Get all recipients
router.get('/', getAllRecipients);

// Get recipient requests (filtered or all)
router.get('/requests', getRecipientRequests);

// Get recipient by email
router.get('/:email', getRecipientByEmail);

// Delete recipient by ID
router.delete('/:id', deleteRecipient);

export default router;
