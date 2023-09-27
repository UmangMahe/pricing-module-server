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

router.use('/configuration', auth.verifyToken, require('./configuration'));

// @desc    All Pricing Configuration
// @route   GET /api/pricing

router.get('/', auth.verifyToken, async (req, res) => {

    try {
        await Users.findById(req.user.id).then(async user => {
            if (user) {
                await Pricing.find().sort("-updatedAt").then(pricing => {

                    const ownConfigs = pricing.filter(v => v.userId.toString() == user._id)
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
                const check_rule = await PricingMaster.findOne({pricing: rule._id})
                if(check_rule) return res.status(400).json({
                    message: 'This configuration is in use, cannot remove'
                })
                // Check if the pricing is used in any other table

                const check_dbp = await DBP.deleteMany({ pricingId: rule._id })
                const check_dap = await DAP.deleteMany({ pricingId: rule._id })
                const check_tmp = await TMP.deleteMany({ pricingId: rule._id })
                const check_wc = await WC.deleteMany({ pricingId: rule._id })

                if (check_dbp && check_dap && check_tmp && check_wc) {
                    let deletedRule = await Pricing.findOneAndDelete({ _id: id });
                    if (deletedRule) {
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

                // Check if the pricing is used in any other table

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

module.exports = {
    router
};