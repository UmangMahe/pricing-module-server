const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth');
const Users = require('../../../../models/Users');
const ErrorHandler = require('../../../../errors/ErrorHandler');
const { getAuthTokenFromHeader } = require('../../../../utils');
const moment = require('moment');
const { defaultDateFormat } = require('../../../../constants');
const Pricing = require('../../../../models/Pricing');
const PricingMaster = require('../../../../models/PricingMaster');
const DBP = require('../../../../models/DBP');
const DAP = require('../../../../models/DAP');
const TMP = require('../../../../models/TMP');
const WC = require('../../../../models/WC');
const Logs = require('../../../../models/Logs');

router.use('/configuration', auth.verifyToken, require('./configuration'));

// @desc    All Pricing Configuration
// @route   GET /api/pricing

router.get('/', auth.verifyToken, async (req, res) => {

    try {
        await Users.findById(req.user.id).then(async user => {
            if (user) {
                await Pricing.find().sort("-updatedAt").populate({
                    path: 'userId',
                    select: { name: 1 }
                }).then(pricing => {

                    const ownConfigs = pricing.filter(v => v.userId._id.toString() == user._id)
                    return res.status(200).json({
                        message: 'Pricing Configurations',
                        userConfigs: ownConfigs,
                        allConfigs: pricing
                    })
                })

                return;
            }
            return res.status(404).json({
                message: "User doesn't exists"
            })
        })
    }
    catch (err) {
        const message = ErrorHandler(err);
        return res.status(401).json({
            message
        })
    }

})

// @desc    Delete Pricing by Id
// @route   DELETE /api/pricing/delete?id=

router.delete('/delete', auth.verifyToken, async (req, res) => {

    const { id } = req.user

    try {
        const user = await Users.findById(id);
        if (user) {

            const { id } = req.query

            const rule = await Pricing.findById(id)
            if (rule) {
                const check_rule = await PricingMaster.findOne({ pricing: rule._id })
                if (check_rule) return res.status(400).json({
                    message: 'This configuration is in use, cannot remove'
                })
                // Check if the pricing is used in any other table

                const check_dbp = await DBP.deleteMany({ pricingId: rule._id })
                const check_dap = await DAP.deleteMany({ pricingId: rule._id })
                const check_tmp = await TMP.deleteMany({ pricingId: rule._id })
                const check_wc = await WC.deleteMany({ pricingId: rule._id })

                if (check_dbp && check_dap && check_tmp && check_wc) {
                    const log = await Logs.create({
                        pricingId: rule._id,
                        status: `Deleted configuration - ${rule.name} (UID - ${rule.userId})`,
                        meta: {
                            id: user._id,
                            name: user.name
                        }
                    })
                    let deletedRule = await Pricing.findOneAndDelete({ _id: rule._id });
                    if (deletedRule) {
                        await log.save();
                        return res.status(200).json({
                            message: "Removed pricing configuration Successfully",
                        })
                    }
                }

                return res.status(400).json({
                    message: 'Error removing the profile configuration'
                });
            }
            else {
                return res.status(404).json({
                    message: "Pricing configuration doesn't exists"
                })
            }
        }
        else {
            return res.status(404).json({
                message: "User doesn't exists"
            })
        }

    }
    catch (err) {
        const message = ErrorHandler(err);
        return res.status(401).json({
            message
        })
    }
})

// @desc    Use a Pricing configuration
// @route   PATCH /api/pricing/use?id=

router.patch('/use', auth.verifyToken, async (req, res) => {

    const { id } = req.user

    try {
        const user = await Users.findById(id);
        if (user) {

            const { id } = req.query

            const rule = await Pricing.findById(id)


            if (rule) {
                // Check if the pricing config is disabled

                if (rule.disabled) return res.status(400).json({
                    message: 'Cannot set a disabled configuration as default. Please enable it first'
                })
                await PricingMaster.findOneAndUpdate({ 'pricing': { $ne: rule._id } }, { pricing: rule._id }).then(async _ => {

                    if (_) {

                        await Logs.insertMany([{
                            pricingId: _.pricing,
                            status: "Removed from default configuration",
                            meta: {
                                id: user._id,
                                name: user.name
                            }
                        }, {
                            pricingId: rule._id,
                            status: "Set configuration as default",
                            meta: {
                                id: user._id,
                                name: user.name
                            }
                        }])
                        return res.status(200).json({
                            message: `${rule.name} is set as default configuration`,
                            data: rule
                        })
                    }
                    else return res.status(200).json({
                        message: `${rule.name} is already set as default configuration`,
                    })

                })


            }
            else {
                return res.status(404).json({
                    message: "Pricing configuration doesn't exists"
                })
            }
        }
        else {
            return res.status(404).json({
                message: "User doesn't exists"
            })
        }

    }
    catch (err) {
        const message = ErrorHandler(err);
        return res.status(401).json({
            message
        })
    }
})

// @desc    Get In-use Pricing configuration
// @route   GET /api/pricing/use

router.get('/use', auth.verifyToken, async (req, res) => {

    const { id } = req.user

    try {
        const user = await Users.findById(id);
        if (user) {

            const rule = await PricingMaster.findOne({})
            try {
                rule.populate({
                    path: 'pricing',
                    populate: {
                        path: 'userId',
                        select: { name: 1 }
                    }
                }).then(rule => {
                    const { pricing } = rule
                    return res.status(200).json({
                        message: "In-use Configuration",
                        data: pricing
                    })
                })
            }
            catch (err) {
                const message = ErrorHandler(err);
                return res.status(401).json({
                    message
                })
            }
        }
        else {
            return res.status(404).json({
                message: "User doesn't exists"
            })
        }

    }
    catch (err) {
        const message = ErrorHandler(err);
        return res.status(401).json({
            message
        })
    }
})

module.exports = {
    router
};