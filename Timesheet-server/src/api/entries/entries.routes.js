const express = require('express');
const router = express.Router();
const jwt_decode = require('jwt-decode');
const veryfy = require('../../config/verifyToken');
const entriesModel = require('./entries.model');
var middlewear = require('../../util/middleware');

// Create new entry
router.post('/', veryfy, async (req, res) => {
    try {
        const newEntry = new entriesModel({
            date: req.body.date,
            workedHours: req.body.workedHours,
            projcet: req.body.projcet,
            task: req.body.task,
            subtask: req.body.subtask,
            notes: req.body.notes,
        });

        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry); 

    } catch(err) {
        res.status(400).json({message: err.message});
    }
});


// Get entry by id

router.get('/:id', veryfy, middlewear.getEntry, (req, res) => {
    res.json(res.entry);
});


module.exports = router;