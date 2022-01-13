const Discord = require("discord.js");
const moment = require('moment')
moment.locale('pt-BR')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  name: "userinfo",
  desc: "mostra as informações de um usuário",
   categoria: 'utils'}
 
module.exports.run = async (client, message, args) => {

    let user = client.users.cache.get(args.join('')) || client.users.cache.find(user => user.username == args.join('')) || message.mentions.users.first() || message.author;
    let userM = message.guild.members.cache.get(user.id) || message.mentions.members.first() || message.member; 

    if(user.bot == false) {bott = 'não'} else {bott = 'sim'}
    

const bannerHash = (await client.api.users[user.id].get()).banner

const button1 = new MessageButton()
	.setCustomId('avatar')
	.setLabel('Avatar de '+user.username)
	.setStyle('PRIMARY')
	.setEmoji('872720085574373436');


const row = new MessageActionRow()
        .addComponents([button1])

        const button2 = new MessageButton()
	.setCustomId('userinfo')
	.setLabel('Userinfo')
	.setStyle('PRIMARY')
	.setEmoji('924582993715163156');


const row2 = new MessageActionRow()
        .addComponents([button2])
  
        console.log(user)
  let embed = new Discord.MessageEmbed()
  .setDescription(`
  \\🔖**Nome:** ${user.username}
  \\🎲**Tag:** ${user.discriminator}
  \\💻**ID:** ${user.id}

  \\🤖**Bot:** ${bott}
  \\✨**Criado em:** ${moment(user.createdAt).format('LLL')}
  \\📆**Entrou em:** ${moment(userM.joinedTimestamp).format('LLL')}
  
  \\📜**Cargos:** ${userM._roles.map(c => '<@&' + c + '>').join(', ')}.`)
  .setThumbnail(user.avatarURL({ dynamic: true, format: "png", size: 1024 }))

if(!bannerHash) embed.setImage()
if(bannerHash){const banner = `https://cdn.discordapp.com/banners/${user.id}/${bannerHash}${bannerHash.startsWith('a_') ? '.gif' : '.png'}?size=4096`
embed.setImage(banner)}


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
