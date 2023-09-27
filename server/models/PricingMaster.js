const { default: mongoose, Schema } = require("mongoose");

const PricingMasterSchema = new mongoose.Schema({

    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    pricing: [{
        type: Schema.Types.ObjectId,
        ref: 'Pricing',
        required: true,
        default: []
    }],

}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('PricingMaster', PricingMasterSchema, 'pricing_master');