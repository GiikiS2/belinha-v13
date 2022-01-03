const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  name: "site",
  desc: "retorna o link do site da belinha",
   categoria: 'bot'}

module.exports.run = async (client, message, args) => {

  const button1 = new MessageButton()
	.setLabel('Site da belinha!')
	.setStyle('LINK')
	.setEmoji('❤️')
  .setURL('https://belinha-website.herokuapp.com')


const row = new MessageActionRow()
        .addComponents([button1])

  message.reply({
    content: "<a:msn_spinning:847235636192870450> | **link do site abaixo!**",
    components: [row]
  })
};
