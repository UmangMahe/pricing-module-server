const { default: mongoose, Schema } = require("mongoose");

const LogsSchema = new mongoose.Schema({

    pricingId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Pricing'
    },

    status: {
        type: String,
        default: "Created",
        required: true
    },

    meta: {
        type: Schema.Types.Mixed,
        default: {},
        required: true
    },

}, {
    versionKey: false,
    timestamps: {
        updatedAt: false,
        createdAt: true
    }
})

module.exports = mongoose.model('Logs', LogsSchema, 'logs');