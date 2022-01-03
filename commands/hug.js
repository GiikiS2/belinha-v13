const Discord = require("discord.js");
const axios = require('axios');

module.exports = {
    name: "hug",
    desc: "abraça um usuário",
  categoria: 'fun'}

module.exports.run = async (client, message, args) => {

  let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (!user) {
return message.reply('vc tem q mencionar algm para abraçar! <:aaaaaaa:838498951199588402>');
}

let avatar = user.displayAvatarURL({format: 'png'});

  
  axios.get('https://purrbot.site/api/img/sfw/hug/gif')
  .then((res) => {

  let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(` **<:02_love:838497281086717962> | ${message.author} deu um abração em ${user}!**`)
        .setImage(res.data.link)
        .setTimestamp()
        .setThumbnail(avatar)
        .setFooter('💗 se abraçaram')
        .setAuthor(message.author.username, message.author.displayAvatarURL({format: 'png'}))
        if(user.id == message.author.id){message.reply({embeds: [embed], content: "amor próprio é tudo né"})}else{message.reply({embeds: [embed]})}
	})
  .catch((err) => {console.log(err)
    message.reply(`<:erro_bot:802249908781973514> houve um erro`) })
};
