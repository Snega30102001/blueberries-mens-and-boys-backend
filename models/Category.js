const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String },
    status: { type: String, default: 'Active' },
    productCount: { type: Number, default: 0 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
