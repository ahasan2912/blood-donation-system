import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w0iow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;
let collections = {};

export const connectDB = async () => {
    try {
        await client.connect();
        db = client.db('blood-donation');
        
        collections = {
            users: db.collection('users'),
            donors: db.collection('donors'),
            recipients: db.collection('recipients'),
            bookedDonors: db.collection('bookedDonors'),
            donateHistory: db.collection('donateHistory'),
            allReadyBooked: db.collection('allReadyBooked'),
            hospital: db.collection('hospital'),
            hospitalBooked: db.collection('hospitalBooked'),
        };
        
        console.log("✅ Successfully connected to MongoDB!");
        return collections;
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw error;
    }
};

export const getDB = () => {
    if (!db) {
        throw new Error('Database not initialized. Call connectDB first.');
    }
    return db;
};

export const getCollections = () => {
    if (!collections || Object.keys(collections).length === 0) {
        throw new Error('Collections not initialized. Call connectDB first.');
    }
    return collections;
};


export const closeDB = async () => {
    try {
        await client.close();
        console.log("🔌 MongoDB connection closed");
    } catch (error) {
        console.error("Error closing MongoDB connection:", error);
        throw error;
    }
};

export default { connectDB, getDB, getCollections, closeDB };
