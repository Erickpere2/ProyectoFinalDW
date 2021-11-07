const token_bot = '2143412236:AAHeV7ZRheIlu9rtSNpDNr7xK2aeFK0yrxQ';
const {
    Telegraf
} = require('telegraf');
const bot = new Telegraf(token_bot);
const {
    verificar_id,
    verificar_correo,
    update_bot
} = require('./funciones');
const {
    obtener_actividades, obtener_notas
} = require('./consultas.js');


bot.start((cxt) => {
    verificar_id(cxt.from.id).then(async val => {
        if (val) {
            cxt.reply(`Hola ${cxt.from.first_name}! ¿En que te puedo ayudar?\n\nOpciones:\n/miscursos\n/actividades\n/notas`);
        } else {
            await cxt.reply(`Bienvenido ${cxt.from.first_name}! \nYo seré tu asistente de educación virtual. \nPrimero debemos verificar tu correo electronico de la \nuniversidad.`);
            cxt.reply(`Escribe tu correo electronico\nEjemplo: \nmibot@miumg.edu.gt`);
        }
    });
});

bot.email(new RegExp('([a-zA-Z0-9]\@miumg\.edu\.gt)'), async (cxt) => {
    await verificar_correo(cxt.message.text).then(async val => {
        if (val!='x') {
            await update_bot(cxt.message.text, cxt.from.id);
            cxt.reply(`Ya has sido registrado!! ${cxt.message.text}`);
        } else {
            cxt.reply(`El correo ${cxt.message.text} no esta registrado, comunicate con tu profesor`);
        }
    });
});

bot.command('miscursos', (ctx) => {
    verificar_id(ctx.from.id).then(async val => {
        if (val) {
            ctx.reply( `Cursos en los que estas inscrito actualmente:
            Analisis de Sistemas II
            Arquitectura de Computadoras II
            Desarrollo Web
            Redes de Computadoras I
            Etica Profesional`);
        } else {
            await ctx.reply(`Bienvenido ${ctx.from.first_name}! \nYo seré tu asistente de educación virtual. \nPrimero debemos verificar tu correo electronico de la \nuniversidad.`);
            ctx.reply(`Escribe tu correo electronico\nEjemplo: \nmibot@miumg.edu.gt`);
        }
    });
});

bot.command('actividades', (ctx) => {
    verificar_id(ctx.from.id).then(async val => {
        if (val) {
            obtener_actividades(ctx);
        } else {
            await ctx.reply(`Bienvenido ${ctx.from.first_name}! \nYo seré tu asistente de educación virtual. \nPrimero debemos verificar tu correo electronico de la \nuniversidad.`);
            ctx.reply(`Escribe tu correo electronico\nEjemplo: \nmibot@miumg.edu.gt`);
        }
    });
});
bot.command('notas', (ctx) => {
    verificar_id(ctx.from.id).then(async val => {
        if (val) {
            obtener_notas(ctx);
        } else {
            await ctx.reply(`Bienvenido ${ctx.from.first_name}! \nYo seré tu asistente de educación virtual. \nPrimero debemos verificar tu correo electronico de la \nuniversidad.`);
            ctx.reply(`Escribe tu correo electronico\nEjemplo: \nmibot@miumg.edu.gt`);
        }
    });
});

bot.on('text', async cxt => {
    verificar_id(cxt.from.id).then(async val => {
        if (val) {
            cxt.reply(`Hola ${cxt.from.first_name}! ¿En que te puedo ayudar?\n\nOpciones:\n/miscursos\n/actividades\n/notas`);
        } else {
            var recibido = cxt.message.text.toLowerCase();
            if (recibido.startsWith('pin')) {
                validando_pin(recibido, cxt);
            } else {
                await cxt.reply(`Bienvenido ${cxt.from.first_name}! \nYo seré tu asistente de educación virtual. \nPrimero debemos verificar tu correo electronico de la \nuniversidad.`);
            cxt.reply(`Escribe tu correo electronico\nEjemplo: \nmibot@miumg.edu.gt`);
            }
        }
    });

});

module.exports = bot.launch();