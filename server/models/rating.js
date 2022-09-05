const mongoose = require('mongoose');

const reatingSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true,
    }
})