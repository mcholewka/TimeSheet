const express = require('express');
const router = express.Router();
const jwt_decode = require('jwt-decode');
const veryfy = require('../../config/verifyToken');
const entriesModel = require('./entries.model');
var middlewear = require('../../util/middleware');

// Create new entry
router.post('/', veryfy, async (req, res) => {
    try {
        const currentUserId = (jwt_decode(req.header('auth-token')))._id;

        const newEntry = new entriesModel({
            date: req.body.date,
            workedHours: req.body.workedHours,
            project: req.body.project,
            task: req.body.task,
            subtask: req.body.subtask,
            notes: req.body.notes,
            user: currentUserId
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

// Get list of entries for specyfic user with pagination
router.get('/',veryfy, async (req, res) => {
    
    const { page = 1, limit = 5 } = req.query;
    try {
        const currentUserId = (jwt_decode(req.header('auth-token')))._id;
        
        const currentUserEntries = await entriesModel.find({user: currentUserId})
        .limit(limit * 1)
        .skip((page-1) * limit)
        .exec();

        const count = await entriesModel.find({user: currentUserId}).countDocuments();

        res.json({
            entries: currentUserEntries,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalItems: count   
        });        
    } catch(err) {
        res.status(400).json({message: err.message});
    }
});

// Delete specyfic entry
router.delete("/:id", veryfy, middlewear.getEntry, async (req, res) => {
    try {
        await res.entry.remove();
        res.json({message: 'Entry has been removed'});
    } catch(err) {
        res.status(500).send({message: err.message});
    }
});

// Patch specyfic entry
router.patch("/:id", veryfy, middlewear.getEntry, async (req,res) => {
    try {
        updatedEntry = await res.entry.updateOne({
            date: req.body.date,
            workedHours: req.body.workedHours,
            project: req.body.project,
            task: req.body.task,
            subtask: req.body.subtask,
            notes: req.body.notes
        })
        res.send(updatedEntry);
    } catch(err) {
        res.status(500).send({message: err.message});
    }
});

module.exports = router;