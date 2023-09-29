const express = require('express');
const PricingMaster = require('../../../../../models/PricingMaster');
const ErrorHandler = require('../../../../../errors/ErrorHandler');
const router = express.Router();
const moment = require('moment');
const DBP = require('../../../../../models/DBP');
const DAP = require('../../../../../models/DAP');
const TMP = require('../../../../../models/TMP');
const WC = require('../../../../../models/WC');

router.get('/', async (req, res) => {

    const { startTime, endTime, distance, waitingTime, weekDay } = req.fields;

    if (!startTime) return res.status(400).json({ message: 'Start Time is required' });
    if (!endTime) return res.status(400).json({ message: 'End time is required' });
    if (!distance) return res.status(400).json({ message: 'Distance is required' });
    if (!waitingTime) return res.status(400).json({ message: 'Waiting time is required' });
    if (!weekDay || isNaN(weekDay)) return res.status(400).json({ message: 'Week day is required' });

    if (weekDay < 1 || weekDay > 7)
        return res.status(400).json({
            message: "Invalid week day provided"
        })
    try {
        const getPricing = await PricingMaster.findOne({})
        if (getPricing) {
            const { pricing } = getPricing;

            console.log(moment(startTime), moment(endTime))
            const a = moment(startTime);
            const b = moment(endTime);
            const duration = moment.duration(b.diff(a));
            if (duration < 0)
                return res.status(400).json({
                    message: "Invalid time provided"
                })

            const timeTaken = duration.asHours();

            const dbp = await DBP.findOne({pricingId: pricing, days: {$in: weekDay}})
            const dap = await DAP.findOne({pricingId: pricing})
            const tmp = await TMP.find({pricingId: pricing})
            const wc = await WC.findOne({pricingId: pricing})

            if(dbp && dap && tmp && wc){
                const {price: basePrice, uptoKms} = dbp;
                const {price: dapPrice, afterKms} = dap;
                // if(distance > afterKms){

                // }
            }
            else return res.status(400).json({
                message: 'There was a problem calculating the price'
            })


        }
    }
    catch (err) {
        const message = ErrorHandler(err)
        return res.status(400).json({
            message
        })
    }
})

module.exports = router;