import express from 'express';
import {
    registerDonor,
    getDonors,
    getDonorById,
    deleteDonor,
    updateLastDonation,
    updateDonorStatus
} from './donor.controller.js';

const router = express.Router();

/**
 * Donor Routes
 * Base path: /api/donors
 */

// Register a new donor
router.post('/', registerDonor);

// Get all donors or filter by email
router.get('/', getDonors);

// Get donor by ID
router.get('/:id', getDonorById);

// Delete donor by ID
router.delete('/:id', deleteDonor);

// Update donor's last donation date
router.patch('/update-last-donation/:email', updateLastDonation);

// Update donor status
router.patch('/update-status/:email', updateDonorStatus);

export default router;
