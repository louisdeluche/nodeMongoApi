const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        type: String,
        trim: true
    }
});
module.exports = mongoose.model('Post', PostSchema)