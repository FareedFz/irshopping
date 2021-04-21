var express = require('express')
var controller=require('./searchcontroller')
 
var router  =  express.Router();

router.get('/AirShopping',controller.search)

module.exports = router;
