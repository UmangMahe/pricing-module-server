const express = require('express');
const router = express.Router()
const auth = require('../../../../../middleware/auth');
const Users = require('../../../../../models/Users');
const DBP = require('../../../../../models/DBP');
const DAP = require('../../../../../models/DAP');
const TMP = require('../../../../../models/TMP');
const WC = require('../../../../../models/WC');
const Pricing = require('../../../../../models/Pricing');
const ErrorHandler = require('../../../../../errors/ErrorHandler');
const PricingMaster = require('../../../../../models/PricingMaster');
const Logs = require('../../../../../models/Logs');

// @desc    Get Pricing Configuration By Id
// @route   GET /api/pricing/configuration/:id

router.get('/:id', async (req, res) => {
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
// @route   PUT /api/pricing/configuration

router.put('/', async (req, res) => {

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
                const log = await Logs.create({
                    pricingId: rule._id,
                    status: "Created configuration",
                    meta: { id: user._id, name: user.name }
                })
                log.save()
                const count = await Pricing.count();
                if (count === 1) {
                    await PricingMaster.findOneAndUpdate({}, { pricing: rule._id }, { upsert: true, new: true })
                    const log = await Logs.create({
                        pricingId: rule._id,
                        status: "Set configuration as default (automatically)",
                        meta: {
                            id: user._id,
                            name: user.name
                        }
                    })
                    
                    await log.save()
                }

                return res.status(200).json({
                    message: `Configuration - ${rule.name} created successfully`
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
// @route   PUT /api/pricing/configuration/update?id=

router.patch('/update', async (req, res) => {

    const { id } = req.user

    try {
        const user = await Users.findById(id);
        if (user) {

            const { id } = req.query

            const rule = await Pricing.findById(id)
            if (rule) {

                const { name, dbp, dap, tmp, wc } = req.fields

                const exists = await Pricing.exists({ name: name, _id: { $ne: id } })
                if (exists) return res.status(400).json({
                    message: "Pricing configuration with the same exist",
                })

                rule.name = name;
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

                        const log = await Logs.create({
                            pricingId: _id,
                            status: "Updated configuration",
                            meta: {
                                id: user._id,
                                name: user.name
                            }
                        })
                        
                        log.save()

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

// @desc    Update Pricing by Id
// @route   PUT /api/pricing/configuration/update?id=

router.patch('/toggle', async (req, res) => {

    const { id } = req.user

    try {
        const user = await Users.findById(id);
        if (user) {

            const { id } = req.query

            const rule = await Pricing.findById(id)
            if (rule) {

                const check_rule = await PricingMaster.findOne({ pricing: rule._id })
                if (check_rule && !rule.disabled) return res.status(400).json({
                    message: 'Cannot disable a configuration which is already in use'
                })

                rule.disabled = !rule.disabled;

                const log = await Logs.create({
                    pricingId: rule._id,
                    status: `${rule.disabled ? 'Disabled' : 'Enabled'} configuration`,
                    meta: {
                        id: user._id,
                        name: user.name
                    }
                })

                log.save();
                await rule.save().then(item => {
                    return res.status(200).json({
                        message: `Pricing Configuration for ${item.name} - ${rule.disabled ? 'Disabled' : 'Enabled'}`,
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

module.exports = router;