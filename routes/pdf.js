/**
 * Created by Shuvo on 11/8/2018.
 */
const express = require('express');
const router = express.Router();

router.get('/home/:column/:value',(req, res)=>{
   const column = req.params.column;
   const value = req.params.value;

});

router.get('/sw/:column/:value',(req, res)=>{
    res.send('Hello Bangladesh!');
});

router.get('/hw/:column/:value',(req, res)=>{
    res.send('Hello Bangladesh!');
});

router.get('/connections/:column/:value',(req, res)=>{
    res.send('Hello Bangladesh!');
});

module.exports = router;