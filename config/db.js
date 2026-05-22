const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB Atlas...');
        
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables.');
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            family: 4, 
            serverSelectionTimeoutMS: 10000,
            // Try to bypass SSL/TLS handshake errors by allowing invalid certificates (DEBUG ONLY)
            tlsAllowInvalidCertificates: true 
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        if (error.message.includes('SSL') || error.message.includes('TLS')) {
            console.error('CRITICAL: This is an SSL/TLS error. Please check if your IP is whitelisted in MongoDB Atlas.');
        }
        if (process.env.MONGO_URI) {
            console.log(`Attempted connection with URI: ${process.env.MONGO_URI.replace(/:([^@]+)@/, ':****@')}`);
        } else {
            console.error('MONGO_URI is missing or undefined in the environment configuration.');
        }
    }
};

module.exports = connectDB;
