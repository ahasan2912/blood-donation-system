import { ObjectId } from 'mongodb';
import UserModel from './user.model.js';

/**
 * User Service
 * Business logic layer for user operations
 */
class UserService {
    /**
     * Create a new user
     */
    async createUser(userData) {
        // Check if user already exists
        const existingUser = await UserModel.findByEmail(userData.email);
        
        if (existingUser) {
            return {
                success: false,
                message: 'User already exists',
                data: null
            };
        }

        const result = await UserModel.create(userData);
        
        return {
            success: true,
            message: 'User created successfully',
            data: result
        };
    }

    /**
     * Get all users
     */
    async getAllUsers() {
        const users = await UserModel.findAll();
        
        return {
            success: true,
            message: 'Users retrieved successfully',
            data: users
        };
    }

    /**
     * Get user role by email
     */
    async getUserRole(email) {
        const user = await UserModel.findByEmail(email);
        
        if (!user) {
            return {
                success: false,
                message: 'User not found',
                data: { role: null }
            };
        }

        return {
            success: true,
            message: 'User role retrieved successfully',
            data: { role: user.role }
        };
    }

    /**
     * Delete user by ID
     */
    async deleteUser(id) {
        try {
            const objectId = new ObjectId(id);
            const result = await UserModel.deleteById(objectId);

            if (result.deletedCount === 0) {
                return {
                    success: false,
                    message: 'User not found or already deleted',
                    data: null
                };
            }

            return {
                success: true,
                message: 'User deleted successfully',
                data: result
            };
        } catch (error) {
            return {
                success: false,
                message: 'Invalid user ID format',
                data: null
            };
        }
    }

    /**
     * Update user role
     */
    async updateUserRole(email, role) {
        const result = await UserModel.updateRole(email, role);

        if (result.matchedCount === 0) {
            return {
                success: false,
                message: 'User not found with this email',
                data: null
            };
        }

        return {
            success: true,
            message: 'User role updated successfully',
            data: result
        };
    }

    /**
     * Delete user by email
     */
    async deleteUserByEmail(email) {
        const result = await UserModel.deleteByEmail(email);

        if (result.deletedCount === 0) {
            return {
                success: false,
                message: 'User not found',
                data: null
            };
        }

        return {
            success: true,
            message: 'User deleted successfully',
            data: result
        };
    }
}

export default new UserService();
