/**
 * Created by Shuvo on 11/5/2018.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const swSchema = new Schema({
    computer_name:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    version:{
        type:String,
        required: true
    },
    install_date:{
        type: Date,
        required: true
    },
    publisher:{
        type: String,
        required: true
    },
    uninstall:{
        type: String,
        required: true
    },
    size:{
        type:String,
        required: true
    }
});

const SW = mongoose.model('sw', swSchema);

module.exports = SW;
