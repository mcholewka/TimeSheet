const express = require('express');
const router = express.Router();
const jwt_decode = require('jwt-decode');
const veryfy = require('../../config/verifyToken');
const entriesModel = require('../entries/entries.model');
var middlewear = require('../../util/middleware');
const mongoose = require('mongoose');

// Get bar chart data
router.get("/",veryfy, async (req,res) => {
    try {
        const currentUserId = (jwt_decode(req.header('auth-token')))._id;

        const barChartData = await entriesModel.aggregate([
            {
                $match : { user : new mongoose.Types.ObjectId(currentUserId)}} ,
                 {
                     $group: {
                        _id: { $month: "$date"}, 
                        total: {$sum: "$workedHours"}
                }
            }
        ]);
           
        return res.status(200).json(barChartData);
    } catch(err) {
        return res.status(400).send({message: err.message});
    }
});

module.exports = router;