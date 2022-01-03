const Discord = require("discord.js");
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: "activities",
  desc: "gera convite para qualquer atividade do discord",
   categoria: 'utils'}

module.exports.run = async (client, message, args) => {
  
  const channel = message.member.voice.channel;

    if (!channel) return message.reply('você precisa estar em um canal de voz!')
  
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Escolha uma atividade!')
					.addOptions([
						{
							label: 'youtube',
							value: '880218394199220334',
              emoji: "925420763153055825"
						},
            {
							label: 'doodlecrew',
							value: '878067389634314250',
						emoji: "925420763153055825" 						
            },
            {
							label: 'puttparty',
							value: '763133495793942528',
						emoji: "925420763153055825" 						
            },
            {
							label: 'sketchyartist',
							value: '879864070101172255',
						emoji: "925416538863976468" 						
            },
            {
							label: 'checkers',
							value: '832013003968348200',
						emoji: "925420763153055825" 						
            },
            {
							label: 'spellcast',
							value: '852509694341283871',
						emoji: "925420763153055825" 						
            },
            {
							label: 'awkword',
							value: '879863881349087252',
						emoji: "925420763153055825" 						
            },
            {
							label: 'wordsnack',
							value: '879863976006127627',
						emoji: "925420763153055825" 						
            },
            {
							label: 'lettertile',
							value: '879863686565621790',
						emoji: "925420763153055825" 						
            },
            {
							label: 'chessdev',
							value: '832012586023256104',
						emoji: "925420763153055825" 						
            },
            {
							label: 'chess',
							value: '832012774040141894',
						emoji: "925420763153055825" 						
            },
            {
							label: 'fishing',
							value: '814288819477020702',
						emoji: "925420763153055825" 						
            },
            {
							label: 'betrayal',
							value: '773336526917861400',
						emoji: "925420763153055825" 						
            },
            {
							label: 'poker',
							value: '755827207812677713',
						emoji: "925420763153055825" 						
            },
            {
							label: 'youtubedev',
							value: '880218832743055411',
              disabled: "true",
						emoji: "925416538863976468"			
            },
					]),
			);

		await message.reply({ content: '<:smiledog:872720085574373436>', components: [row] }).then(m => {

      client.on('interactionCreate', interaction => {
	if (!interaction.isSelectMenu()) return;
  if(interaction.user.id !== message.author.id) return
  if(interaction.message.id !== m.id) return 
	try{

    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: interaction.values[0],
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${process.env['TOKEN']}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(async (invite) =>{
            if(!invite.code) return message.reply("<:erro_bot:802249908781973514> **| houve um erro durante a execução do comando!**")
            message.react('✅');  
            
            m.edit({content: `https://discord.com/invite/${invite.code}`,
            components: [] })
        })
  }catch(err){console.log(err)}
});

    })

    
}