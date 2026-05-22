const mongoose = require('mongoose');

const subcategorySchema = mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, default: 'Active' },
    productCount: { type: Number, default: 0 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Subcategory', subcategorySchema);
