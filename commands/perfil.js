const Discord = require('discord.js');
const pdb =  require('../misc/economydb.js');
const mongoose = require("mongoose");


module.exports = {
    name: "perfil",
   desc: 'mostra seu perfil na economia da Belinha',
   categoria: 'social'}


module.exports.run = async (client, message, args) => {


    let people = message.mentions.users.first() || message.author;


    if(!await pdb.User.findOne({userID: people.id})) {
        await pdb.User.create({userID: people.id})}

    let data = await pdb.User.findOne({userID: people.id})

    let valorp = 'não tem'
    if(data.pufflet !== 'noinfo') valorp = data.pufflet

    let valorc = 'ninguem'
    if(data.marry !== 'noone') valorc = client.users.cache.get(data.marry)?.username 
    
    if(!await pdb.User.findOne({userID: people.id})) {
        await pdb.User.create({userID: people.id})
    }

    if(message.author.id !== people.id){
        data.pv += 1
        data.save()
    }

    
        let embedno = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .setTitle(`👤 | **Perfil de ${people.username}**`)
        .addField(':coin: | **__R2coins:__**', '```' + `${data.money}` + '```', true)
        .addField(':ring: | **__Casad@ com:__**', '```' + `${valorc || 'ninguem'}` + '```', true)
        .addField('✨ | **__Karma:__**', '```' + `${data.karma}` + '```', true)
        .addField('<:Puffle_black1017_paper:841832232784363551> | **__Pet:__**', '```' + `${valorp}` + '```', true)
        .addField('<:iglu:841508173437337640> | **__Casa:__**', '```' + `${data.iglut}` + '```', true)
        .setImage(data.profilebanner)
        .setFooter(`👁️ | ${data.pv} views`)
        message.reply({embeds: [embedno]})    
    
}