const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const PostModel = mongoose.model('PostModel');
const protectedRoute = require('../middleware/protectedResource');

router.post("/addsale", protectedRoute, async (req, res) => {
    const { productName, quantity, amount } = req.body;
    if (!productName || !quantity || !amount) {
        return res.status(400).json({ error: "One or more fields are empty" });
    }
    req.user.password = undefined;
    const postObj = await new PostModel({ productName, quantity, amount, author: req.user });
    await postObj.save()
        .then((newPost) => {
            res.status(201).json({ post: newPost });
        })
        .catch((error) => {
            console.log(error);
        })
});

router.get("/topsales", protectedRoute, async (req, res) => {
    try {
        // Find top sales posts
        const topSalesPosts = await PostModel.find({ author: req.user._id })
            .sort({ quantity: -1 })
            .limit(5)
            .exec();

        // Send response with top sales posts
        res.json( topSalesPosts );
    } catch (error) {
        console.error('Error occurred while fetching documents:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get("/totalrevenue", protectedRoute, async (req, res) => {
    try {
        // Calculating total revenue of all sales
        const totalRevenueResult = await PostModel.aggregate([
            // Match documents that belong to the current user
            { $match: { author: req.user._id } },
            // Calculate total revenue
            { 
                $group: { 
                    _id: null, 
                    totalRevenue: { $sum: { $multiply: ["$quantity", "$amount"] } } 
                } 
            },
            // project to reshape the result
            { $project: { _id: 0, totalRevenue: 1 } }
        ]);

        // Extract total revenue from the result (if exists)
        const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].totalRevenue : 0;

        // Send response with total revenue
        res.json( totalRevenue );
    } catch (error) {
        console.error('Error occurred while fetching total revenue:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;