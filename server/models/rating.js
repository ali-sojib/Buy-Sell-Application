const mongoose = require('mongoose');

const reatingSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    rating:{
      type: Number,
      required: true,  
    }
})

module.exports = reatingSchema;