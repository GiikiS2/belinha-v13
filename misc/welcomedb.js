const Discord = require('discord.js');
module.exports = welcomemsgd;

async function welcomemsgd(data, client, member) {


    let guild = await client.guilds.cache.get(data.guildID);
    let canal = await client.channels.cache.get(data.canalID);
    if (guild != member.guild) {
        return
    }

    if (data.guildID == null) return
    if (data.onoff === 'on') {
        if (data.canalID === 'noone') return


        var fundos = [{
                img: 'https://media.discordapp.net/attachments/914990230581444649/915363242543546388/3626340.png?width=805&height=453'
            },
            {
                img: 'https://media.discordapp.net/attachments/914990230581444649/915363511725621268/HertzAlegrio_oh-livingroom-towards-fireplace_72.png?width=947&height=453'
            },
            {
                img: 'https://media.discordapp.net/attachments/914990230581444649/915363624455929856/the_owl_house_wallpaper_by_vasartss_demaquj-fullview.png?width=805&height=453'
            },
            {
                img: 'https://media.discordapp.net/attachments/914990230581444649/915364177646858270/3217146.png?width=805&height=453'
            },
            {
                img: 'https://media.discordapp.net/attachments/914990230581444649/915364253416964167/351745-Adventure_Time.png?width=994&height=416'
            },
            {
                img: 'https://media.discordapp.net/attachments/914990230581444649/915364323432468510/tv-series-adventure-time-17577.png?width=640&height=397'
            },
            {
                img: 'https://media.discordapp.net/attachments/914990230581444649/915364398984482816/508929.png?width=805&height=453'
            },
            {
                img: 'https://media.discordapp.net/attachments/914990230581444649/915364470749007872/uUarfK2FMamb-5Usjc6UWee8ndtCze4CVyxmObVZheo.png?width=512&height=288'
            },
            {
                img: 'https://media.discordapp.net/attachments/914990230581444649/915364593981865985/tv-show-steven-universe-floating-island-moon-pearl-steven-universe-hd-wallpaper-preview.png?width=582&height=291'
            },
            {
                img: 'https://media.discordapp.net/attachments/914990230581444649/915364657072599070/ocean__steven_universe_background__by_mimicat16_ddi3rpp-fullview.png?width=814&height=453'
            },
            {
                img: 'https://media.discordapp.net/attachments/914990230581444649/915364722709241917/d8e2f106b53369cdc8f42f8314df7599c57934ef_hq.png?width=812&height=453'
            },
        ]
        let fa = fundos[Math.floor(Math.random() * fundos.length)]

        imagem = ''
        if (data.Image == 'on') imagem = `https://belinha.herokuapp.com/api/welcome?avatar=${member.user.avatarURL({ dynamic: true, format: "png", size: 1024 })}&background=${fa.img.split('?')[0]}`

        dttb = ''
        if (data.Thumbnail == 'on') dttb = guild.iconURL({size: 2048, format:"png", dynamic : true})

        let embed = await new Discord.MessageEmbed()
            .setColor("#303434")
            .setAuthor({ name: 'Belinha', iconURL: 'https://cdn.discordapp.com/avatars/757352173481885717/3469b1143a8b56ff7fa2ada2f2908be1.png', url: 'https://belinha.herokuapp.com/' })
            .setTitle(data.Title)
            .setImage(imagem)
            .setDescription(data.Description)
            .setThumbnail(dttb)
            .setFooter(data.Footer)
            .setTimestamp();
        canal.send({
            content: `${member.user}`,
            embeds: [embed]
        })

    }

}