import express from 'express';
import {
    createUser,
    getAllUsers,
    getUserRole,
    deleteUser,
    deleteUserByEmail
} from './user.controller.js';

const router = express.Router();

/**
 * User Routes
 * Base path: /api/users
 */

// Create a new user
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);

// Get user role by email
router.get('/role/:email', getUserRole);

// Delete user by ID
router.delete('/:id', deleteUser);

// Delete user by email
router.delete('/email/:email', deleteUserByEmail);

export default router;
