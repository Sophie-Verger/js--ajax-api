const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    name: {
        type: String,
        required: "Le nom est requis"
    },
    message: {
        type: String,
        required: true
    },
    id_post: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);