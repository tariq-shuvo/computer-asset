const express = require('express');
const router = express.Router();
const HW = require('../models/HW');
const SW = require('../models/SW');
const Home = require('../models/Home');
const Connection = require('../models/Connections');
const settings = require('../config/settings');

router.get('/hw/:hwoption',(req, res, next)=>{
        const column_name = req.params.hwoption;
        const fields ={};
        fields[column_name]=true;
        HW.find({},fields,(err, results) => {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            if (err) return res.status(500).send(err);
            // send the list of all people
            return res.status(200).json(results);
        });
});

router.post('/hw',(req, res, next)=>{
    const column_name = req.body.category_title;
    const column_value = req.body.category_value;

    const fields ={};
    fields[column_name]=column_value;
    HW.find(fields,(err, results) => {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
        if (err) return res.status(500).send(err);
        // send the list of all people
        return res.status(200).json(results);
    });
});

router.post('/hw/all',(req, res, next)=>{
    HW.find((err, results) => {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
        if (err) return res.status(500).send(err);
        // send the list of all people
        return res.status(200).json(results);
    });
});


router.get('/sw/:swoption',(req, res, next)=>{
    const column_name = req.params.swoption;
    const fields ={};
    fields[column_name]=true;
    SW.find({},fields,(err, results) => {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
        if (err) return res.status(500).send(err);
        // send the list of all people
        return res.status(200).json(results);
    });
});

router.post('/sw',(req, res, next)=>{
    const column_name = req.body.category_title;
    const column_value = req.body.category_value;

    const fields ={};
    fields[column_name]=column_value;
    SW.find(fields,(err, results) => {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
        if (err) return res.status(500).send(err);
        // send the list of all people
        return res.status(200).json(results);
    });
});

router.post('/sw/like',(req, res, next)=>{
    const column_name = req.body.category_title;
    const column_value = req.body.category_value;

    var pattern = new RegExp('.*'+column_value+'.*', "i");
    const fields ={};
    fields[column_name]=pattern;
    SW.find(fields,(err, results) => {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
        if (err) return res.status(500).send(err);
        // send the list of all people
        return res.status(200).json(results);
    });
});

router.get('/base/:hwoption',(req, res, next)=>{
    const column_name = req.params.hwoption;
    const fields ={};
    fields[column_name]=true;
    Home.find({},fields,(err, results) => {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
        if (err) return res.status(500).send(err);
        // send the list of all people
        return res.status(200).json(results);
    });
});

router.post('/base',(req, res, next)=>{
    const column_name = req.body.category_title;
    const column_value = req.body.category_value;

    const fields ={};
    fields[column_name]=column_value;
    Home.find(fields,(err, results) => {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
        if (err) return res.status(500).send(err);
        // send the list of all people
        return res.status(200).json(results);
    });
});

router.post('/base/all',(req, res, next)=>{
    Home.find((err, results) => {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
        if (err) return res.status(500).send(err);
        // send the list of all people
        return res.status(200).json(results);
    });
});


router.get('/connection/:hwoption',(req, res, next)=>{
    const column_name = req.params.hwoption;
    const fields ={};
    fields[column_name]=true;
    Connection.find({},fields,(err, results) => {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
        if (err) return res.status(500).send(err);
        // send the list of all people
        return res.status(200).json(results);
    });
});

router.post('/connection',(req, res, next)=>{
    const column_name = req.body.category_title;
    const column_value = req.body.category_value;

    const fields ={};
    fields[column_name]=column_value;
    Connection.find(fields,(err, results) => {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
        if (err) return res.status(500).send(err);
        // send the list of all people
        return res.status(200).json(results);
    });
});

router.post('/connection/all',(req, res, next)=>{
    Connection.find((err, results) => {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
        if (err) return res.status(500).send(err);
        // send the list of all people
        return res.status(200).json(results);
    });
});

router.get('/sw/insert',(req, res, next)=>{
    // console.log(req.params.operation);

    const newHWAdd = new HW({
        computer_name:"SNEAKSYTOP",
        logical_cores:8,
        manufacturer:"ASUSTeK COMPUTER INC",
        memory:17130795008,
        model:"GL502VMZ",
        physical_core:4,
        processor:"Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz",
        system_type:"x64-based PC"
    });
    newHWAdd.save(err => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(newTodoObj);
    });
});


module.exports = router;