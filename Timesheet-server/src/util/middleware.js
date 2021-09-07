const entry = require('../api/entries/entries.model');

module.exports = {
    getEntry: async function (req, res, next) {
        try {
            singleEntry = await entry.findById(req.params.id);
            if(singleEntry == null) {
                return res.status(404).json({message: "Not found"});
    
            }
        } catch(err) {
            return res.status(500).json({message: err.message});
        }
    
        res.entry = singleEntry;
        next();
    }
}