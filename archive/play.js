const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const { joinVoiceChannel } = require('@discordjs/voice');
const { DisTube } = require("distube")
require('ffmpeg')
require('@discordjs/opus')

module.exports = {
  name: "play",
  categoria: 'música'
}

module.exports.run = async (client, message, args) => {

  distube = require('../index.js')

  let emb = new Discord.MessageEmbed()
    .setColor("BLURPLE")
    .setDescription(`>>> Please Join My Voice Channel to Play Song`)
    .setFooter(
      client.user.tag,
      message.author.displayAvatarURL({ dynamic: true })
    )

  //message.guild.me.voice.channel; message.member.voice.channel
  let search = args.join(" ");
  let channel = message.member.voice.channel;
  let queue = distube.getQueue(message.guildId);
  if (!channel) {
    return message.reply({
      embeds: [emb.setDescription(`>>> Please Join a Voice Channel`)],
    });
  }
  if (message.guild.me.voice.channel !== channel) {
    return message.reply({
      embeds: [emb],
    });
  } else {
    distube.play(message, search);
  }
};
