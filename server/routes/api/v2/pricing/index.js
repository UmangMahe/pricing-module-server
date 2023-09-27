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


// @desc    All Pricing Configuration
// @route   GET /api/pricing

router.get('/', auth.verifyToken, async (req, res) => {

    try {
        await Users.findById(req.user.id).then(async user => {
            if (user) {
                await Pricing.find().sort("-updatedAt").then(pricing => {
                    
                    const ownConfigs = pricing.filter(v=>v.userId.toString() == user._id)
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

// @desc    Get Pricing Configuration By Id
// @route   GET /api/pricing/:id

router.get('/:id', auth.verifyToken, async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).message("Please provide pricing Id");

    try {
        await Users.findById(req.user.id).then(async user => {
            if (user) {
                const rule = await Pricing.findById(id)
                if (rule) {
                    const dbp = await DBP.find({ pricingId: rule._id }).select({ "price": 1, "uptoKms": 1, "days": 1 });
                    const dap = await DAP.findOne({ pricingId: rule._id }).select({ "price": 1, "afterKms": 1 });
                    const tmp = await TMP.find({ pricingId: rule._id }).select({ "multiplier": 1, "until": 1, "after": 1 });
                    const wc = await WC.findOne({ pricingId: rule._id }).select({ "initialWaitTime": 1, "perWaitTime": 1, "price": 1 });


                    return res.status(200).json({
                        message: `Pricing Configuration for ${rule.name}`,
                        data: {
                            ...rule.toObject(),
                            dbp,
                            dap,
                            tmp,
                            wc
                        }
                    })
                }
                else {
                    return res.status(404).json({
                        message: "Pricing configuration doesn't exists"
                    })
                }
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


// @desc    Set Pricing by Token
// @route   PUT /api/pricing

router.put('/', auth.verifyToken, async (req, res) => {

    const { id } = req.user

    try {
        const user = await Users.findById(id);
        if (user) {

            const { name } = req.fields

            const rule = await Pricing.findOne({ name })
            if (rule) {
                return res.status(400).json({
                    message: `Pricing config - ${name} already exists`
                })
            }
            await Pricing.create({
                userId: user._id,
                name
            }).then(async rule => {
                const { _id } = rule;

                const { dbp, dap, tmp, wc } = req.fields

                try {
                    dbp.map(async item => {
                        if (item?.days?.length)
                            await DBP.create({
                                pricingId: _id,
                                ...item
                            })
                    })
                    dap && await DAP.create({
                        pricingId: _id,
                        ...dap
                    })

                    tmp.length && tmp.map(async item => {
                        await TMP.create({
                            pricingId: _id,
                            ...item
                        })
                    })

                    wc && await WC.create({
                        pricingId: _id,
                        ...wc
                    })
                }

                catch (err) {
                    const message = ErrorHandler(err);
                    return res.status(401).json({
                        message
                    })
                }

                return rule

            }).then(async rule => {
                await PricingMaster.findOneAndUpdate({ userId: user._id }, { $addToSet: { pricing: rule._id } }, { upsert: true, new: true }).then(_ => {
                    return res.status(200).json({
                        message: `Configuration - ${rule.name} created successfully`
                    })
                })
            })

            return;
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

// @desc    Update Pricing by Id
// @route   PUT /api/pricing/update

router.patch('/update', auth.verifyToken, async (req, res) => {

    const { id } = req.user

    try {
        const user = await Users.findById(id);
        if (user) {

            const { id } = req.query

            const rule = await Pricing.findById(id)
            if (rule) {

                const { name, disabled, dbp, dap, tmp, wc } = req.fields

                const exists = await Pricing.exists({ name: name, _id: { $ne: id } })
                if (exists) return res.status(400).json({
                    message: "Pricing configuration with the same exist",
                })
                rule.name = name;
                rule.disabled = !!disabled;

                await rule.save().then(async item => {

                    try {
                        const { _id } = item
                        const updatedDBP = await Promise.all(dbp.map(async dbpItem => {
                            return await DBP.findOneAndUpdate({ pricingId: _id, _id: dbpItem._id }, { ...dbpItem }, { new: true }).select({ "price": 1, "uptoKms": 1, "days": 1 });
                        }))

                        const updatedDAP = await DAP.findOneAndUpdate({ pricingId: _id, _id: dap._id }, { ...dap }, { new: true }).select({ "price": 1, "afterKms": 1 });
                        const updatedTMP = await Promise.all(tmp.map(async tmpItem => {
                            return await TMP.findOneAndUpdate({ pricingId: _id, _id: tmpItem._id }, { ...tmpItem }, { new: true }).select({ "multiplier": 1, "until": 1, "after": 1 });
                        }))

                        const updatedWC = await WC.findOneAndUpdate({ pricingId: _id, _id: wc._id }, { ...wc }, { new: true }).select({ "initialWaitTime": 1, "perWaitTime": 1, "price": 1 });


                        return {
                            ...item.toObject(),
                            dbp: updatedDBP,
                            dap: updatedDAP,
                            tmp: updatedTMP,
                            wc: updatedWC
                        }

                    }
                    catch (err) {
                        const message = ErrorHandler(err);
                        return res.status(401).json({
                            message
                        })
                    }

                }).then(item => {
                    return res.status(200).json({
                        message: `Pricing Configuration for ${item.name} updated`,
                        data: item
                    })
                })
                return;
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

// @desc    Delete Pricing by Id
// @route   DELETE /api/pricing/delete

router.delete('/delete', auth.verifyToken, async (req, res) => {

    const { id } = req.user

    try {
        const user = await Users.findById(id);
        if (user) {

            const { id } = req.query

            const rule = await Pricing.findById(id)
            if (rule) {

                // Check if the pricing is used in any other table

                const check_dbp = await DBP.deleteMany({ pricingId: rule._id })
                const check_dap = await DAP.deleteMany({ pricingId: rule._id })
                const check_tmp = await TMP.deleteMany({ pricingId: rule._id })
                const check_wc = await WC.deleteMany({ pricingId: rule._id })

                if (check_dbp && check_dap && check_tmp && check_wc) {
                    let deletedRule = await Pricing.findOneAndDelete({ _id: id });
                    if (deletedRule) {
                        await PricingMaster.findOneAndUpdate({userId: user._id}, {$pull: {pricing: id}})
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

module.exports = {
    router
};