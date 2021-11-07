const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args));
const actividades = async (id,ctx) => {
    fetch('http://localhost:5000/Frontend/ActividadesAlumno?' + new URLSearchParams({ 
        id: id, 
    }),{
        method: 'GET',
    }).then(res => res.json()).then(data => {
        data.forEach(valor=>{
            ctx.reply(`${valor.nombre_tarea}\nPunteo: ${valor.punteo}\nEstado: ${valor.estado}`)
        });
    });
}
const notas_curso = async (data, ctx) => {
    try {
        fetch('http://localhost:5000/Frontend/obtenernotas?' + new URLSearchParams({
            carnet: data.id_estudiante
        }), {
            method: 'GET',
        }).then(res => res.json()).then(item => {
            ctx.reply(`Notas actuales:\n\nCurso: ${item.id_curso}\nParcial #1: ${item.pparcial}\nParcial #2: ${item.sparcial}\nActividades: ${item.actividades}\nExamen final: ${item.efinal}\nNota final: ${parseInt(item.pparcial) + parseInt(item.sparcial) + parseInt(item.actividades) + parseInt(item.efinal)}`);
        });
    } catch (e) {
        console.log(e.message);
    }
}
module.exports = {
    obtener_actividades: async (ctx) => {
        ctx.reply('A continuacion se muestran todas tus tareas:')
        fetch('http://localhost:5000/Frontend/BuscarAlumno?' + new URLSearchParams({
            id: ctx.from.id
        }), {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            
            actividades(data.id_estudiante, ctx);
        });
    },
    obtener_notas: async (ctx) => {
        fetch('http://localhost:5000/Frontend/BuscarAlumno?' + new URLSearchParams({
            id: ctx.from.id
        }), {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            notas_curso(data, ctx);
        });
    }
}