const Discord = require("discord.js");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  name: "unban",
  desc: "esbane algum usuario",
  categoria: 'moderação'
}

module.exports.run = async (client, message, args) => {


  const button1 = new MessageButton()
    .setCustomId('yes')
    .setLabel('Sim')
    .setStyle('SUCCESS')
    .setEmoji('✅');

  const button2 = new MessageButton()
    .setCustomId('no')
    .setLabel('Não')
    .setStyle('DANGER')
    .setEmoji('❌');


  const row = new MessageActionRow()
    .addComponents([button1])
    .addComponents([button2])

  if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply("você não tem permissão.");

  const guild = client.guilds.cache.get(message.guild.id);

  if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply('não tenho as permições necessarias :pensive:')

  let userBan = client.users.cache.get(args.join('')) || client.users.cache.find(user => user.username == args.join('')) || message.mentions.users.first()

  const embedSintaxe = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURL())
    .setColor("#36393F")
    .setDescription(`Para executar um unban, utilize: \`b*unban {Usuário}.\``);
  if (!userBan) return message.reply({ embeds: [embedSintaxe] });

  const banList = await message.guild.bans.fetch();

  const bannedUser = banList.find(u => u.user.id === userBan.id)

  if (!bannedUser) return message.reply({embeds: [embedSintaxe.setDescription(`**<:erro_bot:802249908781973514> | \`${userBan.username}\` não está banido!**`)] });

  const embedConfirm = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURl)
    .setDescription(`🌈 | **Você realmente deseja desbanir \`${userBan.tag}\`?**`)
    .setColor("#36393F");
  message.reply({components: [row], embeds: [embedConfirm]}).then(m => { // Send Embed And Buttons
    const iFilter = i => i.user.id === message.author.id;
    const collector = m.createMessageComponentCollector({ filter: iFilter, time: 10 * 60000 });

    collector.on('collect', async i => {
      i.deferUpdate()
      if (i.customId === 'yes') {

        const embedR = new Discord.MessageEmbed()
          .setAuthor(`Relatório do desbanimento.`, message.author.avatarURL)
          .setDescription(`Autor do unban: \`${message.author.tag}\` \nUsuario desbanido: \`${userBan.tag}\``)
          .setColor("#36393F");
        m.edit({ embeds: [embedR], components: []})
        await userBan.send(embedR).catch(e => console.log(`Ocorreu um erro no unban de ${userBan.tag} por sua DM estar privada.`))
        await message.guild.members.unban(userBan, { reason: `Autor do unban: ${message.author.tag}🌼` });

      }
      if (i.customId === 'no') {
        let embedNo = new Discord.MessageEmbed()
          .setDescription(`${userBan.tag} não foi desbanido.`)
          .setColor("#36393F");
        m.edit({ embeds: [embedNo], components: []})
      }
    });

  })

};