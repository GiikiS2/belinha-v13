const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
  name: "disconnect",
  categoria: 'música'
}

module.exports.run = async (client, message, args) => {

  const connection = require('./join.js')

  const channel = message.guild.me.voice.channel;

  if(!channel) return message.reply('Não estou em nenhuma call <:alfredo:924844707895447552>')

  message.reply({
    content: "**sai da call!** <:shyduy:925747609975554049>"
  })
  connection.connection.destroy()


};
