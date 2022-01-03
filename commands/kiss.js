const Discord = require("discord.js");
const axios = require('axios');

module.exports = {
    name: "kiss",
    desc: "beija um usuário",
   categoria: 'fun'}

module.exports.run = async (client, message, args) => {

  let user = message.mentions.users.first() || client.users.cache.get(args[0]);

  if(user.id == message.author.id) return message.reply('como você vai fazer pra se beijar? 🤨')
if (!user) {
return message.reply('vc tem q mencionar algm para beijar! <:aaaaaaa:838498951199588402>');
}

let avatar = user.displayAvatarURL({format: 'png'});

  
  axios.get('https://purrbot.site/api/img/sfw/kiss/gif')
  .then((res) => {
  let embed = new Discord.MessageEmbed()
        .setColor('#f7a3ff')
        .setDescription(` **<:02_love:838497281086717962> | ${message.author} deu um beijão em ${user}!**`)
        .setImage(res.data.link)
        .setTimestamp()
        .setThumbnail(avatar)
        .setFooter('💗 beijaram')
        .setAuthor(message.author.username, message.author.displayAvatarURL({format: 'png'}))
     message.reply({embeds: [embed]})
	})
  .catch((err) => message.reply(`<:erro_bot:802249908781973514> houve um erro`) )
};
