const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DBPSchema = new mongoose.Schema({

    pricingId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Pricing'
    },

    price: {
        type: Number,
        get: p => (p / 100).toFixed(2),
        set: p => p * 100,
        required: true
    },
    uptoKms: {
        type: Number,
        min: 1,
        default: 1
    },
    days: {
        type: [Number],
        validate: {
            validator: function (arr) {
                return arr.every(v => !isNaN(v))
            }
        },
        default: [1, 2, 3, 4, 5, 6, 7],
        required: true
    }

}, {
    versionKey: false,
    timestamps: true,
})

DBPSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    getters: true,
    transform: (_doc, ret) => {
        delete ret.id
    }
})

DBPSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
    getters: true,
    transform: (_doc, ret) => {
        delete ret.id
    }
})

module.exports = mongoose.model('DBP', DBPSchema);