var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = mongoose.Schema({
    name: { type: String, required: true },
    author: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    budget: { type: Number, required: false, min: 0.01 }
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
