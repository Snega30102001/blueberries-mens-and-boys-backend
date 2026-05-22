const mongoose = require('mongoose');

const bannerSchema = mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, enum: ['Desktop', 'Mobile'], default: 'Desktop' },
    link: { type: String },
    status: { type: String, default: 'Active' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Banner', bannerSchema);
