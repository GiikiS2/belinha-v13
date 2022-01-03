const Discord = require("discord.js");
const Canvas = require("canvas");
const pdb = require("../misc/economydb.js");
const mongoose = require("mongoose");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  name: "pet",
  desc: "mostra um painel com seu pet e algumas opções",
  categoria: "social",
};

module.exports.run = async (client, message, args) => {

    let people = message.mentions.users.first() || message.author;

  const cat1 = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId("nome")
      .setStyle("PRIMARY")
      .setLabel("Trocar nome do pet")
      .setEmoji(`📛`),
    new MessageButton()
      .setCustomId("ver")
      .setStyle("PRIMARY")
      .setLabel("Ver o pet")
      .setEmoji(`👁️`)
  );

  const back = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId("voltar")
      .setStyle("SECONDARY")
      .setLabel("Voltar")
      .setEmoji(`↩️`)
  );

  let data = await pdb.User.findOne({userID: message.author.id})

  let principembed = new Discord.MessageEmbed()
    .setTitle(`**<:lola:924582993715163156> | Painel Pet da Belinha!**`)
    .setDescription(
      `\n
                  > Olá me chamo ${client.user.username}, e por aqui você tera controle do seu pet\n` +
        `**Escolha uma categoria fornecida abaixo!**`
    )
    .setThumbnail(client.user.displayAvatarURL());

  message.reply({ embeds: [principembed], components: [cat1] }).then((m) => {
    // Send Embed And Buttons
    const iFilter = (i) => i.user.id === message.author.id;
    const collector = m.createMessageComponentCollector({
      filter: iFilter,
      time: 10 * 60000,
    });

    collector.on("collect", async (i) => {
      i.deferUpdate();

      if (i.customId === "voltar") {
        m.edit({ embeds: [principembed], components: [cat1], files: [] });
      }
      if (i.customId === "ver") {
        if(data.pufflet == 'noinfo') return m.edit({embeds: [], content: "Você não tem um pet, pode adotar um com b*loja", components: [back]})
        if(people.id !== message.author.id){
            if(data.pufflen == 'noname')return m.edit({embeds: [], content: "O pet de ${people.username} não tem um nome, ${people.username} pode dar um para ele, com o botão do painel", components: [back]})
        }
        if(data.pufflen == 'noname') return m.edit({embeds: [], content: "Seu pet não tem um nome, pode dar um para ele, com o botão do painel", components: [back]})

        const canvas = Canvas.createCanvas(556, 475);
            const ctx = canvas.getContext('2d')
            const background = await Canvas.loadImage(data.igluimg)
            ctx.drawImage(background, 0, 0, 556, 475);
                 const userimg = await Canvas.loadImage(data.puffleimg);
                 ctx.drawImage(userimg, 200, 250, 150, 150);
                 const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'pet.png');
        let embed = await new Discord.MessageEmbed()
              .setAuthor('Belinha', 'https://media.discordapp.net/attachments/782073353094955038/794441177453035520/f94415b8b0987cab240a6f547ae8f83c.png?width=480&height=480')
              .setImage('attachment://pet.png')
              .setTitle(`**<a:puffle3:841504927968657448> | aqui esta seu pet!**`)
              .setDescription(`> **__NOME:__** **${data.pufflen}**
        > **__TIPO:__** **${data.pufflet}**
        > **__CASA:__** **${data.iglut}**`)
              .setTimestamp();
              m.edit({embeds: [embed], files: [attachment], components: [back]}) 

      }
      if (i.customId === "nome") {

        if(data.pufflet == 'noinfo') return m.edit({content: "Você não tem um pet, pode adotar um com b*loja"})

        m.edit({components: [], embeds: [principembed.setDescription('digite abaixo o nome de seu pet.')]})            
        const filter = m => m.author.id === message.author.id;
        const collectorm = message.channel.createMessageCollector({ filter, time: 10 * 60000, max: 1 });

        collectorm.on('collect', async m => {

            if(!m.content.match(/[a-z]/i)) return message.channel.send('Nunca vi nome sem letra 😒')
            if(m.content.length >= 30) return message.reply('Que nome grande hein... escolhe um mais curto 😒')
            if(m.content.includes('   ')) return message.reply('pra que tanto espaço em um nome? :fearful:') 


        await pdb.User.findOneAndUpdate({userID: message.author.id}, {pufflen: m.content});

        let embed = new Discord.MessageEmbed()
        .setTitle(`Agora o nome de seu pet é ${m.content}`)
        message.channel.send({embeds: [embed]})
          

        });
        
      }
    });
  });
};
