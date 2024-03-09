const mongoose = require("mongoose");
const ImageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})
const Image = mongoose.model("image", ImageSchema)
module.exports = Image;