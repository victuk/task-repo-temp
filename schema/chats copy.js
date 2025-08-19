const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: null
    },
    taskId: {
        type: String,
        required: true
    },
}, {timestamps: true});

schema.plugin(paginate);

const chatsModel = mongoose.model("chats", schema);


module.exports = chatsModel;