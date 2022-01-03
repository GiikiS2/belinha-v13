const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
  name: "join",
  categoria: 'música'
}

module.exports.run = async (client, message, args) => {

  if (!message.member.voice.channel) return message.reply('você precisa estar em um canal de voz! <:alfredo:924844707895447552>')

  const button = new MessageButton()
    .setCustomId('sair')
    .setLabel('Sair da call')
    .setStyle('DANGER')
    .setEmoji('925137714049855558');

  const row = new MessageActionRow()
    .addComponents([button])

  const channel = message.guild.me.voice.channel;

  if (channel) return message.reply('Já estou em um canal <:alfredo:924844707895447552>')

  const connection = joinVoiceChannel({
    channelId: message.member.voice.channel.id,
    guildId: message.guild.id,
    adapterCreator: message.guild.voiceAdapterCreator
  })

  module.exports.connection = connection

  message.reply({
    content: "**entrei na call!** <:shyduy:925747609975554049>",
    components: [row]
  }).then(m => { // Send Embed And Buttons
    const iFilter = i => i.user.id === message.author.id;
    const collector = m.createMessageComponentCollector({ filter: iFilter, time: 10 * 60000 });

    collector.on('collect', async i => {
      i.deferUpdate()
      if (i.customId === 'sair') {
        connection.destroy()
        m.edit({
          content: "**sai da call!** <:shyduy:925747609975554049>",
          components: []
        })
      }
    })
  })


};
