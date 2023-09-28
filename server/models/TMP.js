const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TMPSchema = new mongoose.Schema({

    pricingId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Pricing'
    },

    multiplier: {
        type : Number,
        default: 1
    },
    condition: {
        type: String,
        required: true,
        enum: ['until', 'after']
    },
    perTime: {
        type: Number,
        min: 60000,
        required: true
    }

}, {
    versionKey: false,
    timestamps: true,
})

module.exports = mongoose.model('TMP', TMPSchema);