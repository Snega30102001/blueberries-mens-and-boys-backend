const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();
connectDB();

const app = express();

// Ensure uploads folder exists on startup
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const allowedOrigins = [
    'https://blueberries-mens.onrender.com',         // New Frontend
    'https://bluebreery-frontend-2u3j.onrender.com', // Older Render Frontend
    'https://bluebreery-frontend.onrender.com',    // Possible alternate
    'http://localhost:3000',                        // Local Development
    'http://localhost:5001'                         // Local Backend Debug
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/upload', uploadRoutes);

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/api/uploads-debug', (req, res) => {
    const fs = require('fs');
    try {
        const uploadDir = path.join(__dirname, 'uploads');
        
        // List parent directory to see what's there
        const parentFiles = fs.readdirSync(__dirname);
        
        // Auto-create uploads directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        const files = fs.readdirSync(uploadDir);
        res.json({ 
            exists: true, 
            path: uploadDir, 
            files,
            parentPath: __dirname,
            parentFiles 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5001; // Support dynamic PORT for Render, fall back to 5001 locally

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
