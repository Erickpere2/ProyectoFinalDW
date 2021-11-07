const express = require('express');
const router = express.Router();
require('../JS/database'); //conexion a la bd
//#region constantes
const {
    getActivityCurso,
    alumnosNotas,
    BuscarAlumno,
    Buscaridbot,
    BuscarAlumnocorreo,
    updateAlum
} = require('../JS/alumno');

const {
    check,
    validationResult
} = require('express-validator');
// #endregion

//#region GET
router.get('/Frontend/obtenertareas', function (req, res, next) {
    getActivityCurso(req, res, next, validationResult);
});
router.get('/Frontend/obtenernotas', function (req, res, next) {
    alumnosNotas(req, res, next, validationResult);
});
router.get('/Frontend/BuscarAlumno', function (req, res, next) {
    BuscarAlumno(req, res, next, validationResult);
});
router.get('/Frontend/Buscarcorreo', function (req, res, next) {
    BuscarAlumnocorreo(req, res, next, validationResult);
});
router.get('/Frontend/Buscaridbot', function (req, res, next) {
    Buscaridbot(req, res, next, validationResult);
});

//region PUT
router.put('/Frontend/Updateidbot', function (req, res, next) {
    updateAlum(req, res, next, validationResult);
});
module.exports = router;