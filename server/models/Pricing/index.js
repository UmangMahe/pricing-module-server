const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mhl = require('mongoose-history-log');

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

mhl(PricingSchema)

module.exports = mongoose.model('Pricing', PricingSchema);