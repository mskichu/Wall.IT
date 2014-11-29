var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var costSchema = new mongoose.Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    description: { type: String },
    value: { type: Number, required: true, min: 0.01 },
    creationDate: { type: Date }
});

var CostData = mongoose.model('Cost', costSchema);

module.exports = CostData;