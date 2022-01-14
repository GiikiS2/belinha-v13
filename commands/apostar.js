const Discord = require("discord.js")
const pdb =  require('../data/economydb.js');
const mongoose = require("mongoose");

module.exports = {
    name: "apostar",
    desc: 'aposte r2coins',
    categoria: 'social'}

module.exports.run = async (client, message, args) => {

    const valores = [
        {res: '🍉🍉🍇', value: 200, math: '-'},
        {res: '🍉🍉🍉', value: 800, math: '+'},
        {res: '🍓🍓🍉', value: 50, math: '-'},
        {res: '🍓🍓🍓', value: 1000, math: '+'},
        {res: '🍉🍉🍓', value: 300, math: '-'},
        {res: '🥛🥛🥛', value: 3000, math: '+'},
        {res: '🥛🚫🚫', value: 3000, math: '-'},
        {res: '🍇🍇🍓', value: 100, math: '-'},
        {res: '🍇🍓🍇', value: 50, math: '-'},
        {res: '🍉🍉🍉', value: 500, math: '+'},
        {res: '🍇🍇🍇', value: 900, math: '+'},
        {res: '🧁🧁🧁', value: 2000, math: '+'},
    ]
  const msg = valores[Math.floor(Math.random() * valores.length)]
  
  let me = message.author;

  if(!await pdb.User.findOne({userID: me.id})) {
    await pdb.User.create({userID: me.id, money: 0, apostarCooldown: 0})}

    let ddata = await pdb.User.findOne({userID: me.id})

    let cCooldown = ddata.apostarCooldown

    if(1000 - (Date.now() - cCooldown) > 0)
    {
        let embeddi = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .setTitle(`<:aaaaaaa:838498951199588402> | **__Calma ai sua jamanta!__**`)
        message.reply({embeds: [embeddi]})
} else {

    await pdb.User.findOneAndUpdate({userID: me.id}, {apostarCooldown: Date.now()});

    if(msg.math == '-'){

        let embeddi = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .setTitle(`🎰 | ${msg.res}`)
        .setDescription(`**:coin: | ${me} perdeu ${msg.value} r2coins!**`)
        message.reply({embeds: [embeddi]})

        ddata.money -= msg.value
        ddata.save()
    }
    if(msg.math !== '-'){

        
        let embeddi = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .setTitle(`🎰 | ${msg.res}`)
        .setDescription(`**:coin: | ${me} ganhou ${msg.value} r2coins!**`)
        message.reply({embeds: [embeddi]})

        ddata.money += msg.value
        ddata.save()
    }}
}
