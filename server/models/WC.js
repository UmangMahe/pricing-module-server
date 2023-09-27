const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const WCSchema = new mongoose.Schema({

    pricingId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Pricing'
    },

    initialWaitTime: {
        type: Number,
        default: 180000
    },
    price: {
        type: Number,
        get: p => (p / 100).toFixed(2),
        set: p => p * 100
    },
    perWaitTime: {
        type: Number,
        min: 60000,
        default: 60000
    }

}, {
    versionKey: false,
    timestamps: true,
})

WCSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    getters: true,
    transform: (_doc, ret) => {
        delete ret.id
    }
})

WCSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
    getters: true,
    transform: (_doc, ret) => {
        delete ret.id
    }
})

module.exports = mongoose.model('WC', WCSchema);