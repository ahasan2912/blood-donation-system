import dotenv from 'dotenv';
import app from './app.js';
import { connectDB, closeDB } from './src/config/db.js';

// Load environment variables
dotenv.config();

// Server configuration
const PORT = process.env.PORT || 5000;
let server;

/**
 * Start the server
 */
const startServer = async () => {
    try {
        // Connect to MongoDB
        console.log('🔄 Connecting to MongoDB...');
        await connectDB();

        // Start Express server
        server = app.listen(PORT, () => {
            console.log('='.repeat(50));
            console.log(`🚀 Blood Donation Server is running`);
            console.log(`📡 Port: ${PORT}`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
            console.log('='.repeat(50));
        });

        // Handle server errors
        server.on('error', (error) => {
            console.error('❌ Server error:', error);
            process.exit(1);
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

/**
 * Graceful shutdown handler
 */
const gracefulShutdown = async (signal) => {
    console.log(`\n⚠️  Received ${signal}. Starting graceful shutdown...`);

    try {
        // Close server (stop accepting new connections)
        if (server) {
            server.close(() => {
                console.log('🔌 HTTP server closed');
            });
        }

        // Close database connection
        await closeDB();

        console.log('✅ Graceful shutdown completed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error during shutdown:', error);
        process.exit(1);
    }
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    gracefulShutdown('UNCAUGHT_EXCEPTION');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    gracefulShutdown('UNHANDLED_REJECTION');
});

// Start the server
startServer();

export default app;
