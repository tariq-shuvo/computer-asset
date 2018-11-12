/**
 * Created by Shuvo on 11/5/2018.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeSchema = new Schema({
    computer_name:{
        type: String,
        required: true
    },
    domain:{
        type: String,
        required: true
    },
    ipv4:{
        type:String,
        required: true
    },
    mac_address:{
        type: String,
        required: true
    },
    last_upload_time:{
        type: Date,
        required: true
    },
    os:{
        type: String,
        required: true
    },
    os_architecture:{
        type: String,
        required: true
    },
    last_boot_time:{
        type:String,
        required: true
    },
    last_update_install_date:{
        type:String,
        required: true
    },
    system_driver_free_space:{
        type:String,
        required: true
    },
    admin:{
        type:String,
        required: true
    }
});

const Home = mongoose.model('home', homeSchema);

module.exports = Home;