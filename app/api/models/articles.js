const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
    created_at: {
        type: Date,
        default : Date.now
    },
    updated_at: {
        type: Date,
        default : Date.now
    },
    user_id: {
        type: 'ObjectId',
        ref: 'User'
    }
});


module.exports = mongoose.model('Article', ArticleSchema)