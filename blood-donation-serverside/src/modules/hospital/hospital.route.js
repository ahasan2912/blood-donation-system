import express from 'express';
import {
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
} from './hospital.controller.js';

const router = express.Router();

/**
 * Hospital Routes
 * Base path: /api/hospital
 */

// Register a new hospital
router.post('/', registerHospital);

// Get all hospitals
router.get('/all', getAllHospitals);

// Get hospital by email
router.get('/:email', getHospitalByEmail);

// Update hospital role (approve)
router.patch('/update-role/:id', updateHospitalRole);

// Delete hospital
router.delete('/:email', deleteHospital);

// Hospital Blood Request Routes

// Create a blood request
router.post('/blood-requests', createBloodRequest);

// Get blood requests (filtered by email query)
router.get('/blood-requests', getBloodRequests);

// Get accepted blood requests
router.get('/accepted-requests', getAcceptedRequests);

// Get blood requests by recipient email
router.get('/blood-requests/:email', getBloodRequestsByEmail);

// Accept blood request
router.patch('/blood-requests/accept/:id', acceptBloodRequest);

// Reject blood request
router.patch('/blood-requests/reject/:id', rejectBloodRequest);

export default router;
