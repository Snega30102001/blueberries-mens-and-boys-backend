const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    discount: { type: String },
    images: [{ type: String }],
    category: { type: String, required: true },
    subcategory: { type: String },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    status: { type: String, default: 'Active' },
    description: { type: String },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    variants: [
        {
            color: { type: String },
            images: [{ type: String }],
            sizes: [
                {
                    size: { type: String },
                    stock: { type: String }
                }
            ]
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
