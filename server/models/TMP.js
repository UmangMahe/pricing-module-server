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
    until: {
        type: Number,
        default: null
    },
    after: {
        type: Number,
        default: null,
        required: function(){
            return this.until === null
        }
    }

}, {
    versionKey: false,
    timestamps: true,
})

module.exports = mongoose.model('TMP', TMPSchema);