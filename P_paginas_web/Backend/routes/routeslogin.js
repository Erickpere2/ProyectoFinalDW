const express = require ('express');
const router = express.Router();
require('../JS/database'); //conexion a la bd

//variables para manejar el crud
var query = require('../middleware/auth');
const{
    logAlum
}=require('../JS/login');
const {
    check,
    validationResult
} = require('express-validator');

router.post('/Frontend/tipologin', function (req, res, next) {
    tipologin(req, res, next, validationResult);
});
router.post('/Frontend/login', function (req, res, next) {
    logAlum(req, res, next, validationResult);
});
router.post('/errors', function (requ, res) {
    console.error(requ.body, res);
    res.sendStatus(200);
});

//region get
module.exports = router;