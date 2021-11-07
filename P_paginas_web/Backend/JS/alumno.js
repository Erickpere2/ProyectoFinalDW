const alumno = require('../modelos/alumno');
const notas = require('../modelos/notas');
const activities = require('../modelos/actividades');

module.exports = {

    //#region GET
    getActivityCurso: async (req, res, next, validationResult) => {
        try {
            var actividades = await activities.find({});
            res.status(200).send(actividades);
        } catch (err) {
            res.status(404).send('No he encontrado');
        }

    },
    alumnosNotas:async (req,res,next,validaResult)=>{
            try{
                var obtenernotas = await notas.findOne({id_estudiante:req.query.carnet});
                console.log(obtenernotas);
                res.status(200).send(obtenernotas);
            }catch(err){
                    res.status(404).send(JSON.stringify('no existen notas '));
                    console.log(err);
                    
            }
    },
    Buscaridbot: async (req, res, next, validationResult) => {
        try {
            var Alumnos = await alumno.findOne({id_bot:req.query.id});
            if(Alumnos==null){
                res.status(404).send(JSON.stringify('no he encontrado'));
            }
            else{
                res.status(200).send(Alumnos);
            }
            console.log(Alumnos);
        } catch (err) {
            res.status(404).send(JSON.stringify('no he encontrado'));
        }
    },
    BuscarAlumno: async (req, res, next, validationResult) => {
        try {
            console.log(JSON.stringify(req.query.id));
            var Alumnos = await alumno.findOne({id_bot:req.query.id});
            if(Alumnos==null){
                res.status(404).send(JSON.stringify('No he encontrado'));
            }
            else{
                res.status(200).send(Alumnos);
            }
            console.log(Alumnos);
        } catch (err) {
            res.status(404).send(JSON.stringify('No he encontrado'));
        }
    },
    BuscarAlumnocorreo: async (req, res, next, validationResult) => {
        try {
            console.log(JSON.stringify(req.query.id));
            var Alumnos = await alumno.findOne({correo:req.query.correo});
            if(Alumnos==null){
                res.status(404).send(JSON.stringify('no he encontrado'));
            }
            else{
                res.status(200).send(Alumnos);
            }
            console.log(Alumnos);
        } catch (err) {
            res.status(404).send(JSON.stringify('no he encontrado'));
        }
    },
    //#region POST
    //#region PUT
    // actualizar cualquier dato de un alumno
    updateAlum: async (req, res, next, validationResult) => {
        try {
            await alumno.findOneAndUpdate({
                correo: req.query.correo
            }, {
                id_bot: req.query.id_bot
            });
            res.status(201).send(JSON.stringify('Actualizado'));
        } catch (err) {
            res.status(404).send(JSON.stringify('No he encontrado'));
            console.log(err);
        }
    },
    //#endregion PUT
}