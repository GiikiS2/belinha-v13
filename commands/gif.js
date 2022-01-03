const Discord = require("discord.js");
const axios = require('axios');


module.exports = {
    name: "gif",
    desc: "retorna um gif de acordo com a palavra fornecida",
   categoria: 'fun'}

module.exports.run = async (client, message, args) => {

   let fa = Math.floor(Math.random() * 40) + 1 

  let pr = {
    gifsearch: args.join(' '),
    lmt: fa,
    key: process.env['tenorkey']
  }

  axios.get(`https://g.tenor.com/v1/random?q=${pr.gifsearch}&key=${pr.key}&limit=${pr.lmt}`)
  .then((res) => {

    if(!pr.gifsearch){
        let embeddi = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`<:aaaaaaa:838498951199588402> | **__ você tem que escrever sobre oque é o gif!__**`)
        message.reply({embeds: [embeddi]})
    } else {

    //res.data.results.forEach(el => el.media.forEach(el1 => console.log('RES', el1.mediumgif.url)))

     let embed = new Discord.MessageEmbed()
     .setColor('#2f3136')
      .setTitle(`🖼️ | **__Resultado de gif para ${pr.gifsearch}:__**`)
      .setTimestamp();
      res.data.results.forEach(el => el.media.forEach(el1 => embed.setImage(el1.mediumgif.url || 'https://media.discordapp.net/attachments/840819886191542323/843703547967045642/no-image.png?width=480&height=480')))
      message.reply({embeds: [embed]})
   }}).catch((err) => message.creply(`<:erro_bot:802249908781973514> houve um erro, o gif não foi encontrado na api`) )
};