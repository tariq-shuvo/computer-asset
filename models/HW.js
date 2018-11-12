/**
 * Created by Shuvo on 11/5/2018.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hwSchema = new Schema({
    computer_name:{
        type: String,
        required: true
    },
    logical_cores:{
        type: Number,
        required: true
    },
    manufacturer:{
        type:String,
        required: true
    },
    memory:{
        type: Number,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    physical_core:{
        type: Number,
        required: true
    },
    processor:{
        type: String,
        required: true
    },
    system_type:{
        type:String,
        required: true
    }
});

const HW = mongoose.model('hw', hwSchema);

module.exports = HW;