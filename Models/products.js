const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stockQuantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }
});
module.exports = mongoose.model('Product', productSchema);
