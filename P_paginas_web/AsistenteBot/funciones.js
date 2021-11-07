const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args));
module.exports = {
    update_bot: async (correo, idbot) => {
        var resul = false;
        await fetch('http://localhost:5000/Frontend/Updateidbot?' + new URLSearchParams({
            id_bot: idbot,
            correo: correo
        }), {
            method: 'PUT',
        }).then(res => res.json()).then(data => {
            if (data == 'Actualizado') {
                resul = true;

            } else {
                resul = false;
            }
        });
        return resul;
    },
    verificar_id: async (id) => {
        var resul = false;
        await fetch('http://localhost:5000/Frontend/Buscaridbot?' + new URLSearchParams({
            id: id
        }), {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            if (data == 'no he encontrado') {
                resul = false;

            } else {
                resul = true;
            }
        });
        return resul;
    },
    verificar_correo: async (valor) => {
        var resul;
        await fetch('http://localhost:5000/Frontend/BuscarCorreo?' + new URLSearchParams({
            correo: valor
        }), {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            if (data == 'no he encontrado') {
                resul = 'x';

            } else {
                resul = data;
            }
        });
        return resul;
    }
}