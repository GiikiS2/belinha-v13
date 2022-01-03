const Discord = require("discord.js");
const axios = require('axios');

module.exports = {
    name: "mineskin",
    desc: "mostra uma skin do minecraft de acordo com o nick fornecido",
   categoria: 'games'}

module.exports.run = async (client, message, args) => {

  const nomeskin = args.join(' ');

  if(!nomeskin) return message.reply('forneça um nick!')

      let embed = new Discord.MessageEmbed()
      .setColor("#FFC0CB")
      .setTitle(`**__<:alfredo:924844707895447552> | Minecraft Skin__**`)
      .setImage(`https://mc-heads.net/body/${encodeURI(nomeskin)}/right`)
      .addField((`download`), `[baixar](https://mc-heads.net/skin/${encodeURI(nomeskin)})`, true)
      .setDescription(`<a:mine_cube:803419151015346227> | **skin de ${nomeskin}**`)
      .setThumbnail(`https://mc-heads.net/head/${encodeURI(nomeskin)}`)
      .setFooter(`request by ${message.author.tag}`, 'https://media.discordapp.net/attachments/762182791432896512/803421622233071666/5a1x3LP.png?width=461&height=461')
      .setTimestamp();
     message.reply({embeds: [embed]})
}
