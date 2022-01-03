const Discord = require("discord.js");
const moment = require('moment')
moment.locale('pt-BR')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  name: "botinfo",
  desc: "mostra informações sobre o bot",
   categoria: "bot"}
 
module.exports.run = async (client, message, args) => {

  user = client.user

  let userM = message.guild.members.cache.get(user.id)

const button1 = new MessageButton()
	.setCustomId('avatar')
	.setLabel('Avatar de '+user.username)
	.setStyle('PRIMARY')
	.setEmoji('872720085574373436');


const row = new MessageActionRow()
        .addComponents([button1])

        const button2 = new MessageButton()
	.setCustomId('userinfo')
	.setLabel('BotInfo')
	.setStyle('PRIMARY')
	.setEmoji('924582993715163156');


const row2 = new MessageActionRow()
        .addComponents([button2])
  
  let embed = new Discord.MessageEmbed()
  .setDescription(`
  \\🎲**Tag:** ${user.discriminator}
  \\💻**ID:** ${user.id}
  \\💎**Dono:** <@240269142848962560>

  \\📱**RAM:** ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB
  \\⚙️**node:** ${process.version}
  \\🛡️**Servidores:** ${client.guilds.cache.size}

  \\✨**Criado em:** ${moment(user.createdAt).format('LLL')}
  \\📆**Entrou em:** ${moment(userM.joinedTimestamp).format('LLL')}
  `)
  .setThumbnail(user.avatarURL({ dynamic: true, format: "png", size: 1024 }))

    message.reply({embeds: [embed], components: [row]}).then(m => { // Send Embed And Buttons
                const iFilter = i => i.user.id === message.author.id;
                const collector = m.createMessageComponentCollector({ filter: iFilter, time: 10 * 60000 });

                collector.on('collect', async i => {
                  i.deferUpdate()
                	if (i.customId === 'avatar') {
                    let embed2 = new Discord.MessageEmbed()
  .setImage(user.avatarURL({ dynamic: true, format: "png", size: 1024 }) || 'https://media.discordapp.net/attachments/845478112292896809/924590947092791296/no-image-1771002-1505134.png')
if(!user.avatarURL({ dynamic: true, format: "png", size: 1024 }) ){embed2.setTitle(user.username+' não tem avatar.')}
	              	m.edit({embeds: [embed2], components: [row2]})
              	}
                if (i.customId === 'userinfo') {
	              	m.edit({embeds: [embed], components: [row]})
                  
              	}
              });

            })

};
