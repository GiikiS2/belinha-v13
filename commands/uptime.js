const Discord = require("discord.js");

module.exports = {
  name: "uptime",
  desc: "mostra á quanto tempo o esta online",
   categoria: 'bot'}

module.exports.run = async (client, message, args) => {
  let totalSeconds = client.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  let uptime = `🗓 ${days.toFixed()} dias, ${hours.toFixed()} horas, ${minutes.toFixed()}, minutos e ${seconds.toFixed()} segundos`;

  const embed = new Discord.MessageEmbed()
    .setTitle(`<:clock_bel:849618205084352552> | **Tempo de atividade**`)
    .setDescription(`**Estou online há:**\n${uptime}`)
    .setImage('https://media.discordapp.net/attachments/840819886191542323/924652816415465532/ezgif.com-gif-maker_7.gif')

  message.channel.send({embeds: [embed]});
};