module.exports = welcomemsg;

async function welcomemsg(canalid, guildid, client, member){

  let guild = await client.guilds.cache.get(guildid);
  let canal = await client.channels.cache.get(canalid);
  if (guild != member.guild) {

    return //console.log("👋 Sem boas vindas! servidor: " + member.guild.name + ' ❌');

  } else {
   const Discord = require('discord.js');

         var fundos = [
          {img: 'https://media.discordapp.net/attachments/914990230581444649/915363242543546388/3626340.png?width=805&height=453'},
          {img: 'https://media.discordapp.net/attachments/914990230581444649/915363511725621268/HertzAlegrio_oh-livingroom-towards-fireplace_72.png?width=947&height=453'},
          {img: 'https://media.discordapp.net/attachments/914990230581444649/915363624455929856/the_owl_house_wallpaper_by_vasartss_demaquj-fullview.png?width=805&height=453'},
          {img: 'https://media.discordapp.net/attachments/914990230581444649/915364177646858270/3217146.png?width=805&height=453'},
          {img: 'https://media.discordapp.net/attachments/914990230581444649/915364253416964167/351745-Adventure_Time.png?width=994&height=416'},
          {img: 'https://media.discordapp.net/attachments/914990230581444649/915364323432468510/tv-series-adventure-time-17577.png?width=640&height=397'},
          {img: 'https://media.discordapp.net/attachments/914990230581444649/915364398984482816/508929.png?width=805&height=453'},
          {img: 'https://media.discordapp.net/attachments/914990230581444649/915364470749007872/uUarfK2FMamb-5Usjc6UWee8ndtCze4CVyxmObVZheo.png?width=512&height=288'},
          {img: 'https://media.discordapp.net/attachments/914990230581444649/915364593981865985/tv-show-steven-universe-floating-island-moon-pearl-steven-universe-hd-wallpaper-preview.png?width=582&height=291'},
          {img: 'https://media.discordapp.net/attachments/914990230581444649/915364657072599070/ocean__steven_universe_background__by_mimicat16_ddi3rpp-fullview.png?width=814&height=453'},
          {img: 'https://media.discordapp.net/attachments/914990230581444649/915364722709241917/d8e2f106b53369cdc8f42f8314df7599c57934ef_hq.png?width=812&height=453'},
         ]
         let fa = fundos[Math.floor(Math.random() * fundos.length)]

     var msgs = [
    {msg: `Bem-vindo(a) ao servidor ${member.user.username}!`},
    {msg: `Ola, bom te ver! <:doggo:914996909091995678> ` },
    {msg: `Bem vinde! <:owh:915289528523190314> `},
  ]
   let bvmsgs = msgs[Math.floor(Math.random() * msgs.length)]

  let img = `https://belinha-website.herokuapp.com/welcome?avatar=${member.user.avatarURL({ dynamic: true, format: "png", size: 1024 })}&background=${fa.img.split('?')[0]}`

    let embed = await new Discord.MessageEmbed()
      .setColor("#303434")
      .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setTitle(`<a:ram_dance:804195185205968926> Boas-vindas! <a:rem_dance:804195131531591701> `)
      .setImage(img)
      .setDescription(`
<a:seta_da_belinha:804194557557211136> **${bvmsgs.msg}**
<a:seta_da_belinha:804194557557211136> Atualmente estamos com **${member.guild.memberCount} membros!**
<a:seta_da_belinha:804194557557211136> **não se esqueça de ler as regras. <#730404620589072445> **
<a:seta_da_belinha:804194557557211136> ** divirta-se!** <a:king:915362561338249284>
<a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033>`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setFooter("Obrigado por entrar no servidor ❤️")
      .setTimestamp();
    canal.send({
  content: `${member.user}`,
  embeds: [embed]
})
canal.send(img)
  }
}