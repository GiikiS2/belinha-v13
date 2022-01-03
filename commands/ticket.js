const Discord = require('discord.js')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  name: "ticket",
  desc: "abre um ticket para membro receber suporte",
   categoria: 'moderação'}

module.exports.run = async (client, message, args) => {

  const button1 = new MessageButton()
	.setCustomId('close')
	.setLabel('Clique aqui para fechar o ticket')
	.setStyle('PRIMARY')
	.setEmoji('857241318254051338');


const row = new MessageActionRow()
        .addComponents([button1])

      const user = message.author;
      const name = "🎫│ticket-" + user.discriminator;

      let embedl = new Discord.MessageEmbed()

    if(message.guild.channels.cache.find(channel => channel.name == name)){
        message.channel.send({embeds: [embedl.setDescription(`<:erro_bot:802249908781973514> | **__Você já abriu um ticket 🐒__**`)]})
    }else{

message.guild.channels.create(name).then(canal => {
    
    canal.permissionOverwrites.edit(message.guild.roles.everyone, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false
      })
    canal.permissionOverwrites.edit(user.id,{
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true
      })

  message.channel.send({embeds: [embedl.setDescription(`<:correct_bot:802257764860297226> | **__seu ticket foi criado! ${canal}__**`)]})
canal.send({
  content: `${user}`,
  embeds: [embedl.setDescription(`<:UNSPWarntIcon:848276907089985556> | **__O suporte estará aqui em breve...__**`)],
  components: [row]
}).then(m => {
  m.pin()

                  const iFilter = i => i.user.id === message.author.id;
                const collector = m.createMessageComponentCollector({ filter: iFilter, time: 10 * 60000 });

                collector.on('collect', async i => {
                  i.deferUpdate()
                	if (i.customId === 'close') {
                    canal.delete()
                  }
                    

              });


})
      
})
}

}
