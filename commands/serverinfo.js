const Discord = require("discord.js");
const moment = require('moment')
moment.locale('pt-BR')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: "serverinfo",
    desc: "mostra informações do servidor",
   categoria: 'utils'}
 
module.exports.run = async (client, message, args) => {

  const button1 = new MessageButton()
	.setCustomId('icon')
	.setLabel('Ícone do servidor')
	.setStyle('PRIMARY')
	.setEmoji('872720085574373436');


const row = new MessageActionRow()
        .addComponents([button1])

        const button2 = new MessageButton()
	.setCustomId('serverinfo')
	.setLabel('Serverinfo')
	.setStyle('PRIMARY')
	.setEmoji('924582993715163156');


const row2 = new MessageActionRow()
        .addComponents([button2])

    let server = message.guild

let nivel = server.premiumTier
if(server.premiumTier === "NONE") nivel = "Nenhum"

  let embed = new Discord.MessageEmbed()
  .setDescription(`
  \\🔖**Nome:** ${server.name}
  \\💻**ID:** ${server.id}
  \\👑**Dono:** <@${server.ownerId}>
  \\🗺️**Região Do Servidor:** ${server.preferredLocale}
  \\📅**Criado em:** ${moment(server.createdAt).format('LLL')}
  
  \\👥**Membros:** ${server.members.cache.size}
  \\💎**Boosts:** ${server.premiumSubscriptionCount}
  \\✨**Nivel:** ${nivel}
  \\👔**Cargos:** ${server.roles.cache.size}
  \\🎤**Canais De Voz:** ${server.channels.cache.filter(channel => channel.type === 'voice').size}
  \\💬**Canais De Texto:** ${server.channels.cache.filter(channel => channel.type === 'text').size}
  \\😗**Emojis:** ${server.emojis.cache.size}
  `)
  .setThumbnail(server.iconURL({size: 2048, format:"png", dynamic : true}))
  .setImage(server.bannerURL({size: 2048, format:"png", dynamic : true}))

    message.channel.send({embeds: [embed], components: [row]}).then(m => { // Send Embed And Buttons
                const iFilter = i => i.user.id === message.author.id;
                const collector = m.createMessageComponentCollector({ filter: iFilter, time: 10 * 60000 });

                collector.on('collect', async i => {
                  i.deferUpdate()
                	if (i.customId === 'icon') {
                    let embed2 = new Discord.MessageEmbed()
  .setImage(server.iconURL({size: 2048, format:"png", dynamic : true}) || 'https://media.discordapp.net/attachments/845478112292896809/924590947092791296/no-image-1771002-1505134.png')
if(!server.iconURL({size: 2048, format:"png", dynamic : true}) ){embed2.setTitle(server.name+' não tem ícone.')}
	              	m.edit({embeds: [embed2], components: [row2]})
              	}
                if (i.customId === 'serverinfo') {
	              	m.edit({embeds: [embed], components: [row]})
                  
              	}
              });

            })
};
