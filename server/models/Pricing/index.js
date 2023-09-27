const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PricingSchema = new mongoose.Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    disabled: {
        type: Boolean,
        default: false,
    }


}, {
    versionKey: false,
    timestamps: true,
})

module.exports = mongoose.model('Pricing', PricingSchema);