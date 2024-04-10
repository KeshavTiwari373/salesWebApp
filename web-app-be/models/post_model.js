const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    productName:{
        type: String,
        required : true
    },
    quantity:{
        type: Number,
        required : true
    },
    amount:{
        type: Number,
        required : true
    },
    author:{
        type: ObjectId,
        ref : "UserModel"
    }
});

mongoose.model("PostModel", postSchema);