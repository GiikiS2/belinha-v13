const Discord = require("discord.js");
const axios = require('axios');

module.exports = {
  name: "aes",
  desc: "mostra todas as chaves aes do fortnite",
  categoria: 'games'
}

module.exports.run = async (client, message, args) => {

  let user = message.mentions.users.first() || message.author
  let membro = user.displayAvatarURL({ format: 'png', size: 1024 })

  axios.get('https://fortnite-api.com/v2/aes')
    .then((res) => {
      let embed = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .setAuthor('')
        .setTitle(`**__CHAVES AES__** <a:002yay:804191643183218759>`)
        .setImage('https://media.discordapp.net/attachments/795109969216667658/795990164219756564/img.png?width=216&height=34')
        .setDescription(`**CHAVE PRINCIPAL:** 0x${res.data.data.mainKey}`)
        .setThumbnail(membro)
        .setFooter(`request by ${message.author.tag}`)
        .setTimestamp();
      res.data.data.dynamicKeys.forEach(el => embed.addField(el.pakFilename, `Key: 0x${el.key} - GUID: ${el.pakGuid}`, true));

      let embed2 = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .setAuthor('')
        .setTitle(`**__CHAVE AES__** <a:002yay:804191643183218759>`)
        .setDescription(`0x${res.data.data.mainKey}`)
        .setThumbnail(membro)
        .setFooter(`request by ${message.author.tag}`)
        .setTimestamp();

      message.reply({ embeds: [embed] }).catch(err => {
        message.reply({ embeds: [embed2] }).catch(err => (message.reply('houve um erro')))
      })
    })
}