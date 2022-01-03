const Discord = require('discord.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: "lock",
    desc: "bloqueia um canal para os membros",
   categoria: 'moderação'}


   module.exports.run = async (client, message, args) => {

       const button1 = new MessageButton()
	      .setCustomId('unlock')
	      .setLabel('Destrancar canal')
	      .setStyle('SUCCESS')
	      .setEmoji('🔓');


const row = new MessageActionRow()
        .addComponents([button1])

          const button2 = new MessageButton()
	.setCustomId('lock')
	.setLabel('Trancar canal')
	.setStyle('DANGER')
	.setEmoji('🔒');


const row2 = new MessageActionRow()
        .addComponents([button2])

    if(!message.member.permissions.has("ADMINISTRATOR")) {
        return message.reply('<:lock:845074524008480779> | **vc n tem as perms necessarias :/**')
      }

      if (!message.channel.permissionsFor(message.channel.guild.roles.everyone).has("SEND_MESSAGES"))return message.reply(`**<:smiledog:872720085574373436> | ${message.author}, Este canal já está bloqueado! Use ${'`'}${config.prefix}unlock${'`'} para destravar!**`)
    
    message.channel.permissionOverwrites.edit(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
    
    message.channel.send({content: `<a:checkmark69:846197278335172619> | **O Canal foi trancado com sucesso!**`,
    components: [row]}).then(m => { // Send Embed And Buttons
                const iFilter = i => i.user.id === message.author.id;
                const collector = m.createMessageComponentCollector({ filter: iFilter, time: 10 * 60000 });

                collector.on('collect', async i => {
                  i.deferUpdate()
                	if (i.customId === 'unlock') {
                    message.channel.permissionOverwrites.edit(message.channel.guild.roles.everyone, { SEND_MESSAGES: true });
                    m.edit({content: `<a:checkmark69:846197278335172619> | **O Canal foi destrancado com sucesso!**`,
    components: [row2]})
              	}
                if (i.customId === 'lock') {
                      message.channel.permissionOverwrites.edit(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
	              	m.edit({content: `<a:checkmark69:846197278335172619> | **O Canal foi trancado com sucesso!**`,
    components: [row]})
                  
              	}
              });

            })
    

}