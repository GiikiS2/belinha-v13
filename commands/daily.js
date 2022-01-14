const Discord = require("discord.js")
const pdb = require("../misc/economydb.js");
const mongoose = require("mongoose");

module.exports = {
    name: "daily",
    desc: 'resgatar r2coins diariamente',
    categoria: 'social'
}

module.exports.run = async (client, message, args) => {

    const valores = [
        500,
        260,
        700,
    ]
    const msg = valores[Math.floor(Math.random() * valores.length)]
    let me = message.author;

    if (!await pdb.User.findOne({
            userID: me.id
        })) {
        await pdb.User.create({
            userID: me.id,
            money: 0,
            dailyCooldown: 0
        })
    }

    let data = await pdb.User.findOne({
        userID: me.id
    })
    let dailyCooldown = data.dailyCooldown

    if (864e5 - (Date.now() - dailyCooldown) > 0) {
        let embeddi = new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setTitle(`:coin: | **__ Você ja pegou o daily hj__**`)
        message.reply({embeds: [embeddi]})
    } else {

        let ddata = await pdb.User.findOne({
            userID: me.id
        })

        let embeddi = new Discord.MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`**<a:confeteee:845455259291877377> | ${me} recebeu ${msg} r2coins!**`)
        message.reply({embeds: [embeddi]})

        ddata.money += msg
        ddata.save()

        await pdb.User.findOneAndUpdate({
            userID: me.id
        }, {
            dailyCooldown: Date.now()
        });
    }
}