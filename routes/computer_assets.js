/**
 * Created by Shuvo on 11/5/2018.
 */
const express = require('express');
const router = express.Router();
const settings = require('../config/settings');

router.get('/',(req, res)=>{
    const styles =[
      "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
      settings.baseURL+"css/style.css",
      settings.baseURL+"css/basictable.css",
      settings.baseURL+"css/media.css"
    ];
    const scripts =[
        "https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
        settings.baseURL+"js/jquery.basictable.min.js",
        settings.baseURL+"js/common_scripts.js",
        settings.baseURL+"js/home_scripts.js"
    ];
    const header = {
        title:"Home",
        headingTitle:"Computer Assets Management",
        active:'home'
    };

    const selectOptions=[
        {
            title: "Select All",
            value:"*"
        },
        {
            title: "Computer Name",
            value:"computer_name"
        }
    ];

    const tableHeader=["Computer Name","Domain","IPv4","Mac Address","Last Upload Time","OS","OS Architecture","Last Boot Time","Last UpdateInstalled Date","System Drive FreeSpace","Admin"];


    res.render('index',{
        styles:styles,
        scripts:scripts,
        header:header,
        selectOptions:selectOptions,
        tableHeader:tableHeader,
        baseURL:settings.baseURL
    });
});

router.get('/sw',(req, res)=>{
    const styles =[
        "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
        settings.baseURL+"css/style.css",
        settings.baseURL+"css/basictable.css",
        settings.baseURL+"css/media.css"
    ];
    const scripts =[
        "https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
        settings.baseURL+"js/jquery.basictable.min.js",
        settings.baseURL+"js/common_scripts.js",
        settings.baseURL+"js/sw_scripts.js"
    ];
    const header = {
        title:"SW",
        headingTitle:"Computer Assets Management",
        active:'sw'
    };

    const selectOptions=[
        {
            title: "Computer Name",
            value:"computer_name"
        },
        {
            title: "Name",
            value:"name"
        },
        {
            title: "Publisher",
            value:"publisher"
        }
    ];

    const tableHeader=["Computer Name","Name","Version","Install Date","Publisher","Uninstall","Size"];

    res.render('sw',{
        styles:styles,
        scripts:scripts,
        header:header,
        selectOptions:selectOptions,
        tableHeader:tableHeader,
        baseURL:settings.baseURL
    });
});

router.get('/hw',(req, res)=>{
    const styles =[
        "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
        settings.baseURL+"css/style.css",
        settings.baseURL+"css/basictable.css",
        settings.baseURL+"css/media.css"
    ];
    const scripts =[
        "https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
        settings.baseURL+"js/jquery.basictable.min.js",
        settings.baseURL+"js/common_scripts.js",
        settings.baseURL+"js/hw_scripts.js"
    ];
    const header = {
        title:"HW",
        headingTitle:"Computer Assets Management",
        active:'hw'
    };

    const selectOptions=[
        {
            title: "Select All",
            value:"*"
        },
        {
            title: "Computer Name",
            value:"computer_name"
        },
        {
            title: "Logical Cores",
            value:"logical_cores"
        },
        {
            title: "Manufacturer",
            value:"manufacturer"
        },
        {
            title: "Memory",
            value:"memory"
        },
        {
            title: "Model",
            value:"model"
        },
        {
            title: "Processor",
            value:"processor"
        },
        {
            title: "System Type",
            value:"system_type"
        }
    ];

    const tableHeader=["Computer Name","Logical Cores","Manufacturer","Memory","Model","Physical Cores","Processor","System Type"];

    res.render('hw',{
        styles:styles,
        scripts:scripts,
        header:header,
        selectOptions:selectOptions,
        tableHeader:tableHeader,
        baseURL:settings.baseURL
    });
});

router.get('/connections',(req, res)=>{
    const styles =[
        "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
        settings.baseURL+"css/style.css",
        settings.baseURL+"css/basictable.css",
        settings.baseURL+"css/media.css"
    ];
    const scripts =[
        "https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
        settings.baseURL+"js/jquery.basictable.min.js",
        settings.baseURL+"js/common_scripts.js",
        settings.baseURL+"js/connections_scripts.js"
    ];
    const header = {
        title:"Connections",
        headingTitle:"Computer Assets Management",
        active:'connections'
    };

    const selectOptions=[
        {
            title: "Select All",
            value:"*"
        },
        {
            title: "Computer Name",
            value:"computer_name"
        }
    ];

    const tableHeader=["Date","Time","Computer Name","IP","Protocol","Source IP","Destination IP","Source Port","Destination Port"];


    res.render('connections',{
        styles:styles,
        scripts:scripts,
        header:header,
        selectOptions:selectOptions,
        tableHeader:tableHeader,
        baseURL:settings.baseURL
    });
});

module.exports = router;