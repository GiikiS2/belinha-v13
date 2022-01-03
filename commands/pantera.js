 const Discord = require("discord.js");

module.exports = {
    name: "pantera",
    desc: "converse com a pantera",
   categoria: 'fun'}

module.exports.run = async (client, message, args) => {

    const msg = args.join(' ');

    let name = ('Pantera');

    let avatar = {avatar: 'https://media.discordapp.net/attachments/821036317344923660/840772588690341908/804174521782239252.png?width=96&height=90'}
    

    if(!msg){
        
try{
    message.channel.createWebhook(name, avatar).then(w => {
      w.send( 'oi')
    })}catch{message.reply('**Eu não tenho permissão para criar um Webhook neste servidor**')}

    }
  var list = [
  'Sim! <:pantera_sunglasses_thumbsup:804356411416772648>',
  'Não! <a:pantera_triggered:804356779756355644>',
  'Minhas fontes dizem que sim! <:pantera_blind:804356235205148733>',
  'Não sei :pensive:',
  'provavelmente sim <:thonk:838544225699233843>',
  'deve ser <:pog:804350259391103016>'
  ];
  
  var rand = list[Math.floor(Math.random() * list.length)];

    if(msg.endsWith('?')){try {

    message.channel.createWebhook(name, avatar).then(w => { 
      w.send(rand)

    });

    } catch (err) {
        message.reply('**Eu não tenho permissão para criar um Webhook neste servidor**') //caso o bot n tenha permissão de criar o webhook
    }}else{
      try {

    message.channel.createWebhook(name, avatar).then(w => { 
      if(msg === 'oi') return w.send('oi')
      w.send('Me faça perguntas com ? no final :rolling_eyes:')

    });

    } catch (err) {
        message.reply('**Eu não tenho permissão para criar um Webhook neste servidor**') //caso o bot n tenha permissão de criar o webhook
    }
    }
}