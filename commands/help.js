const Discord = require('discord.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  name: "help",
  desc: "abre a central de ajuda, com todos os comandos",
   categoria: 'bot'}


module.exports.run = async (client, message, args) => {

   const cat1 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("moderação")
                .setStyle("PRIMARY")
                .setLabel("Moderação")
                .setEmoji(`🛡️`),
            new MessageButton()
                .setCustomId("bot")
                .setStyle("PRIMARY")
                .setLabel("Bot")
                .setEmoji(`🤖`),
                new MessageButton()
                .setCustomId("fun")
                .setStyle("PRIMARY")
                .setLabel("Fun")
                .setEmoji(`😄`),
                new MessageButton()
                .setCustomId("games")
                .setStyle("PRIMARY")
                .setLabel("Games")
                .setEmoji(`🎮`),
                new MessageButton()
                .setCustomId("utils")
                .setStyle("PRIMARY")
                .setLabel("Utils")
                .setEmoji(`⚒️`),
            )

            const cat2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("social")
                .setStyle("PRIMARY")
                .setLabel("Social")
                .setEmoji(`💸`))

        const back = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId("voltar")
            .setStyle("SECONDARY")
            .setLabel("Voltar")
            .setEmoji(`↩️`)
        );

  let principembed = new Discord.MessageEmbed()
    .setTitle(`**<:lola:924582993715163156> | Painel de ajuda da Belinha!**`)
    .setColor("#eb347a")
    .setDescription(
      `\n
                        > Olá me chamo ${client.user.username},\n` +
        `**Escolha uma categoria fornecida abaixo!** \n\n\n` +
        `> __**Entre para o servidor de suporte**([clica aqui](https://discord.com/invite/F7AWJZaYv8))__ \n` +
        `> __**Convide a Belinha para seu servidor**([clica aqui](https://discord.com/oauth2/authorize?client_id=757352173481885717&scope=bot&permissions=2147483647))__ \n` +
        `> __**Site da Belinha**([clica aqui](http://belinha.herokuapp.com))__
        caso precisa de mais ajuda, todos comandos estão documentados no site da belinha!`
    )
    .setThumbnail(client.user.displayAvatarURL());

        message.reply({embeds: [principembed], components: [cat1, cat2]}).then(m => { // Send Embed And Buttons
                const iFilter = i => i.user.id === message.author.id;
                const collector = m.createMessageComponentCollector({ filter: iFilter, time: 10 * 60000 });

                collector.on('collect', async i => {
                  i.deferUpdate()

                  if (i.customId === 'voltar') {
                      principembed
                      .setTitle(`**<:lola:924582993715163156> | Painel de ajuda da Belinha!**`)
        .setColor('#eb347a')
        .setDescription(
                        `\n
                        > Olá me chamo ${client.user.username},\n` +
                        `**Escolha uma categoria fornecida abaixo!** \n\n\n` +
                        `> __**Entre para o servidor de suporte**([clica aqui](https://discord.com/invite/F7AWJZaYv8))__ \n`+
                        `> __**Convide a Belinha para seu servidor**([clica aqui](https://discord.com/oauth2/authorize?client_id=757352173481885717&scope=bot&permissions=2147483647))__ \n`+
                        `> __**Site da Belinha**([clica aqui](https://giikinotfound.github.io/belinha-bot-website/))__`
                       )
        .setThumbnail(client.user.displayAvatarURL())
        m.edit({embeds: [principembed], components: [cat1, cat2]})

              	}else{
          principembed
           .setTitle('**<:book:838530901376892998> | lista de comandos**')
           .setDescription('> tenho `' + client.commands.filter(c => c.categoria === i.customId).map(c => c.name).length + '` comandos na categoria '+ i.customId+'!' + 
'```' + client.commands.filter(c => c.categoria === i.customId).map(c => c.name).join(" | ") + '```')
           .setThumbnail('https://media.discordapp.net/attachments/821036317344923660/838540560331309108/estagio_1_.png?width=432&height=432')
    m.edit({embeds: [principembed], components: [cat1, cat2, back]})
                }                
              });

            })






/*
  var categoriae = "bot"


  let embed = new Discord.MessageEmbed()
           .setTitle('<:book:838530901376892998> lista de comandos')
           .setDescription('tenho `' + client.commands.filter(c => c.categoria === categoriae).map(c => c.name).length + '` comandos na categoria '+ categoriae+'!' + 
'```' + client.commands.filter(c => c.categoria === categoriae).map(c => c.name).join(" | ") + '```')
           .setTimestamp()
           .setThumbnail('https://media.discordapp.net/attachments/821036317344923660/838540560331309108/estagio_1_.png?width=432&height=432')
    message.reply({embeds: [embed]})
*/
    
/*
   try{
     let embed = new Discord.MessageEmbed()
           .setTitle('<:book:838530901376892998> lista de comandos')
           .addField('<:blind_02:838540156264775731> | Use ``b*cinfo <comando>`` para ver a ajuda para um comando especifico.', 'exemplo: ``b*cinfo kiss``')
           .setDescription('tenho `' + files.length + '` comandos!' + 
'```' + cmd + '```')
           .setTimestamp()
           .setThumbnail('https://media.discordapp.net/attachments/821036317344923660/838540560331309108/estagio_1_.png?width=432&height=432')
    message.reply({embeds: [embed]})
   }catch (err) {
    message.reply('<:erro_bot:802249908781973514> **| Houve um erro!** \n `' + err + '`').catch();
   }*/
}
