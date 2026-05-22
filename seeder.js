const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Subcategory = require('./models/Subcategory');
const connectDB = require('./config/db');
const { products } = require('./data/products');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Product.deleteMany();
        await Category.deleteMany();
        await Subcategory.deleteMany();

        // Add Products
        const sampleProducts = products.map((p, index) => ({
            ...p,
            category: p.category || 'Shirts',
            subcategory: p.subcategory || 'Linen Shirts'
        }));
        await Product.insertMany(sampleProducts);

        // Add Categories
        const sampleCategories = [
            { name: 'Shirts', status: 'Active', image: 'https://images-home.beyoung.in/Shirts_category_section_03751efdd8.jpg' },
            { name: 'T-shirts', status: 'Active', image: 'https://images-home.beyoung.in/Oversized_category_section_670db805d8.jpg' },
            { name: 'Polo', status: 'Active', image: 'https://images-home.beyoung.in/polo_category_section_0d1eb8c7c3.jpg' },
            { name: 'Jeans', status: 'Active', image: 'https://images-home.beyoung.in/Jeans_category_section_e350d6f26c.jpg' },
            { name: 'Cargo', status: 'Active', image: 'https://images-home.beyoung.in/Cargo_category_section_8835d5bebc.jpg' },
            { name: 'Trousers', status: 'Active', image: 'https://images-home.beyoung.in/Trouser_category_section_c5e98dc1f9.jpg' },
            { name: 'Shorts', status: 'Active', image: 'https://images-home.beyoung.in/Shirts_category_section_03751efdd8.jpg' },
            { name: 'Plus-Size', status: 'Active', image: 'https://images-home.beyoung.in/Shirts_category_section_03751efdd8.jpg' },
            { name: 'Wholesale Enquiry', status: 'Active', image: 'https://images-home.beyoung.in/Shirts_category_section_03751efdd8.jpg' }
        ];
        await Category.insertMany(sampleCategories);

        // Add Subcategories
        const sampleSubcategories = [
            { name: 'Cotton-Shirts', category: 'Shirts', status: 'Active' },
            { name: 'Cotton T-Shirts', category: 'T-shirts', status: 'Active' },
            { name: 'Half-Sleeve', category: 'Polo', status: 'Active' },
            { name: 'Toned Jeans', category: 'Jeans', status: 'Active' },
            { name: 'Cotton Cargo', category: 'Cargo', status: 'Active' },
            { name: 'Cotton-Trousers', category: 'Trousers', status: 'Active' },
            { name: 'Cotton Shorts', category: 'Shorts', status: 'Active' }
        ];
        await Subcategory.insertMany(sampleSubcategories);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
