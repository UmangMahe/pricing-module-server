const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DAPSchema = new mongoose.Schema({

    pricingId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Pricing'
    },

    price: {
        type: Number,
        get: p => (p / 100).toFixed(2),
        set: p => p * 100
    },
    afterKms: {
        type: Number,
        min: [1],
        default: 1
    },

}, {
    versionKey: false,
    timestamps: true,
})

DAPSchema.set('toJSON', {
    virtuals: true,
    getters: true,
    versionKey: false,
    transform: (_doc, ret) => {
        delete ret.id
    }
})

DAPSchema.set('toObject', {
    virtuals: true,
    getters: true,
    versionKey: false,
    transform: (_doc, ret) => {
        delete ret.id
    }
})

module.exports = mongoose.model('DAP', DAPSchema);