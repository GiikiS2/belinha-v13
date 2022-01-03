const Discord = require("discord.js");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  name: "ban",
  desc: "bane um usuário",
  categoria: 'moderação'
}

module.exports.run = async (client, message, args) => {

  function serververify(user) {
    if (!message.guild.members.cache.get(user.id)) {
      return (false)
    } else {
      return (true)
    }
  }

  function ban(userBan) {

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

    const button3 = new MessageButton()
      .setCustomId('skip')
      .setLabel('skip')
      .setStyle('PRIMARY')
      .setEmoji('925461535508295720');

    const row = new MessageActionRow()
      .addComponents([button1])
      .addComponents([button2])

    const row2 = new MessageActionRow()
      .addComponents([button3])


    let reasonBan = 'motivo não provido'

    const embedConfirm = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag}`, message.author.avatarURl)
      .setDescription(`Você realmente deseja banir \`${userBan.tag}\`?`)
      .setColor("#36393F");
    message.reply({
      embeds: [embedConfirm],
      components: [row]
    }).then(m => { // Send Embed And Buttons
      const iFilter = i => i.user.id === message.author.id;
      const collector = m.createMessageComponentCollector({ filter: iFilter, time: 10 * 60000 });

      collector.on('collect', async i => {
        i.deferUpdate()
        if (i.customId === 'yes') {

          m.edit({ embeds: [embedConfirm.setDescription(`Digite no chat o motivo do ban`)], components: [row2] }).then(m2 => {


            const filter = m => m.author.id === message.author.id;
            const collectorm = message.channel.createMessageCollector({ filter, time: 10 * 60000, max: 1 });

            collectorm.on('collect', async m => {
              reasonBan = m.content
              m2.edit({ components: [] })
              try {
                message.guild.members.ban(userBan.id, { reason: `Autor do ban: ${message.author.tag} motivo: ${reasonBan} 🔨` })
                  .then(userBan => {
                    const embedR = new Discord.MessageEmbed()
                      .setTitle(`Relatório do banimento. <:bugsuco:925137713961783326>`)
                      .setDescription(`Autor do ban: \`${message.author.tag}\`\nMotivo do ban: \`${reasonBan || 'motivo não provido'}\` \nUsuario banido: \`${userBan.tag}\`\nserver: \`${message.guild.name}\``)
                      .setImage('https://media.discordapp.net/attachments/925137065224597567/925440096373735435/mp4-_2_.gif')
                      .setColor("#36393F");
                    message.channel.send({ embeds: [embedR], components: [] })
                    userBan.send({ embeds: [embedR] }).catch(e => console.log(`Ocorreu um erro no ban de ${userBan.tag} por sua DM estar privada.`))
                  })
              } catch (erro) {
                console.log(erro)
                message.reply(`não consegui realizar o banimento <:mds:925444328233500753>`)
              }
            });

            //collectorm.on('end', async collected => {});

            const collector2 = m2.createMessageComponentCollector({ filter: iFilter, time: 10 * 60000 });
            collector2.on('collect', async i => {
              if (i.customId === 'skip') {

                reasonBan = 'motivo não provido'
                collectorm.stop()
                try {
                  message.guild.members.ban(userBan.id, { reason: `Autor do ban: ${message.author.tag} motivo: ${reasonBan} 🔨` })
                    .then(userBan => {

                      const embedR = new Discord.MessageEmbed()
                        .setTitle(`Relatório do banimento. <:bugsuco:925137713961783326>`)
                        .setDescription(`Autor do ban: \`${message.author.tag}\`\nMotivo do ban: \`${reasonBan || 'motivo não provido'}\` \nUsuario banido: \`${userBan.tag}\`\nserver: \`${message.guild.name}\``)
                        .setImage('https://media.discordapp.net/attachments/925137065224597567/925440096373735435/mp4-_2_.gif')
                        .setColor("#36393F");
                      m2.edit({ embeds: [embedR], components: [] })
                      userBan.send({ embeds: [embedR] }).catch(e => console.log(`Ocorreu um erro no ban de ${userBan.tag} por sua DM estar privada.`))
                    })
                } catch (erro) {
                console.log(erro)
                message.reply(`não consegui realizar o banimento <:mds:925444328233500753>`)
              }
              }
            })
          })
        }
        if (i.customId === 'no') {
          let embedNo = new Discord.MessageEmbed()
            .setDescription(`${userBan.tag} não foi banido. <:smiledog:872720085574373436>`)
            .setColor("#36393F");
          m.edit({ embeds: [embedNo], components: [] })
        }
      });

    })
  }

  let Member = client.users.cache.get(args.join('')) || client.users.cache.find(user => user.username == args.join('')) || message.mentions.users.first()

  if (!Member)
    return message.reply(
      `Você tem que mencionar alguém, bobinho <:akkoshrug:925413336890372216>`
    );

  if (!message.member.permissions.has("BAN_MEMBERS"))
    return message.reply(
      `Você não tem permissão para fazer isso <:akkoshrug:925413336890372216>`
    );

  if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply('não tenho as permições necessarias :pensive:')

  if (serververify(Member) === true) {//ta no server
    if (message.guild.members.cache.get(Member.id).bannable === false) return message.reply("eu não posso banir este membro <:nervous:925435964543864923>")

    if (!message.guild.members.cache.get(Member.id))
      return message.reply(`Não consegui encontrar o usuário <:desespero:925436307658932294>`);

    if (Member.id === message.author.id)
      return message.reply(`Pq vc quer se banir? <:oxi:925431026015145984>`);

    if (Member.id === client.user.id)
      return message.reply(`Por favor não me bana! <:sobbing:925432302945861683>`);

    ban(Member)

  } else {
    //n ta no server
    return ban(Member)
  }
};