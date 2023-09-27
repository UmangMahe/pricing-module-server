const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth');
const Logs = require('../../../../models/Logs');
const ErrorHandler = require('../../../../errors/ErrorHandler');
const Users = require('../../../../models/Users');
const Pricing = require('../../../../models/Pricing');

// @desc    All Logs
// @route   GET /api/logs

router.get('/', auth.verifyToken, async (req, res) => {
    try {
        await Users.findById(req.user.id).then(async user => {
            if (user) {
                await Logs.find().sort("-createdAt").then(log => {
                    return res.status(200).json({
                        message: 'All logs',
                        data: log
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

// @desc    All Logs By Pricing Id
// @route   GET /api/logs/:id

router.get('/:id', auth.verifyToken, async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).message("Please provide pricing Id");
    try {
        await Users.findById(req.user.id).then(async user => {
            if (user) {
                const rule = await Pricing.findById(id)
                if (rule) {
                    await Logs.find({ pricingId: rule._id}).sort("-createdAt").then(log => {
                        return res.status(200).json({
                            message: `All logs for Configuration - ${rule.name}`,
                            data: log
                        })
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


module.exports = router