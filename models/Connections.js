/**
 * Created by Shuvo on 11/5/2018.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    computer_name:{
        type: String,
        required: true
    },
    ip:{
      type:String,
      required:true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type:String,
        required: true
    },
    action:{
      type:String,
      required: true
    },
    protocol:{
      type:String,
      required:true
    },
    source_ip:{
        type: String,
        required: true
    },
    destination_ip:{
        type: String,
        required: true
    },
    source_port:{
        type: String,
        required: true
    },
    destination_port:{
        type:String,
        required: true
    },
    size:{
        type:Number,
        required:false
    },
    tcp_flags:{
        type:String,
        required:false
    },
    tcp_syn:{
        type:String,
        required:false
    },
    tcp_pack:{
        type:String,
        required:false
    },
    tcp_win:{
        type:String,
        required:false
    },
    icmp_type:{
        type:String,
        required:false
    },
    icmp_code:{
        type:String,
        required:false
    },
    info:{
        type:String,
        required:false
    },
    path:{
        type:String,
        required:false
    }
});

const Connection = mongoose.model('connection', connectionSchema);

module.exports = Connection;