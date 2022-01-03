const Discord = require('discord.js');
const { get } = require('axios');
require('dotenv').config()

module.exports = {
    name: "render",
    desc: 'renderiza um link',
    categoria: 'utils'}


module.exports.run = async (client, message, args) => {
    
    if(!args.join('')) return message.reply('forneça um site')

    //if(args.join('').includes(['https://', 'www.', 'http://', 'open.'])) return message.reply('forneça um site valido')

    const url = args[0].replace('https://', '').replace('http://', '')

    const adultContent = /(https?)?(:\/\/(www\.)?)?(xvideos|sex|boafoda|rule34|cameraprive|pornhub|xhamster|xnxx|youporn|hclips|porn|tnaflix|tube8|spankbang|drtuber|vporn|spankwire|keezmovies|nuvid|ixxx|sunporno|nophaxy6|lisinha|pornhd|porn300|sexvid|thumbzilla|zbporn|instawank|xxxbunker|3movs|xbabe|porndroids|alohatube|tubev|lisinha|thehentaicomics|hentaikai|4tube|shameless|megatube|porntube|pornburst|bobs-tube|redporn|pornrox|pornmaki|pornid|fapster|slutload|proporn|pornhost|xxxvideos247|handjobhub|dansmovies|porn7|tubegals|camhub|24porn|pornheed|orgasm|pornrabbit|madthumbs|fux|bestpornbabes|xnxxhamster|xxvids|h2porn|metaporn|pornxio|pornerbros|youjizz|iporntv|mobilepornmovies|watchmygf\.mobi|pornplanner|mypornbible|badjojo|findtubes|pornmd|nudevista|jasmin|imlive|liveprivates|joyourself|stripchat|cams|luckycrush|camsoda|jerkmate|slutroulette|watchmyexgf|fantasti|watchmygf\.me|watch-my-gf\.com|watch-my-gf\.me|watchmygf\.tv|lovehomeporn|iknowthatgirl|daredorm|assoass|bigassporn|babesrater|stufferdb|pornpics|viewgals|jpegworld|pichunter|88gals|18asiantube|zenra|bdsmstreak|punishbang|clips4sale|zzcartoon|hentaihaven|hentaicore|hentaigasm|fakku|gelbooru|hentaipulse|porcore|cartoonporno|sankakucomplex|hentai-foundry|eggporncomics|vrporn|sexlikereal|vrbangers|vrsmash|badoinkvr|wankzvr|czechvr|vrcosplayx|vrconk|virtualtaboo|gaymaletube|manporn|youporngay|gayfuror|zzgays|justusboys|myporngay|iptorrents|pussytorrent|suicidegirls|fashiongirls|top live sex cams|freeones|barelist|babepedia|kindgirls|tubepornstars|hotsouthindiansex|xpaja|lesbian8|girlsway|shemalehd|anyshemale|tranny|tgtube|besttrannypornsites|nutaku|69games|gamcore|lifeselector|hooligapps|brazzers|the gf network|reality kings|digital playground|mofos|gfrevenge|twistys|teamskeet|bangbros|21sextury|ddf network|elegantangel|videosz|hustler|japanhdv|jav hd|newsensations|pornpros|perfect gonzo|all japanese pass|18videoz|nubiles|kinkyfamily|baberotica|all of gfs|dorcelclub|localhussies|adultfriendfinder|getiton|onlinefreechat|perezhilton|thehollywoodgossip|nakednews|avn|maxim|playboy|menshealth|forum\.xnxx|forumophilia|jdforum|joylovedolls|siliconwives|yourdoll|sexysexdoll|sexyrealsexdolls|kikdolls|asexdoll|dollwives|sexdollgenie|fansdolls)(\.com)?/g.test(message.content);

    const embed = await new Discord.MessageEmbed()

    .setDescription(`📷 | **render do site __${url}__**`)

    .setImage(`https://api.apiflash.com/v1/urltoimage?access_key=${process.env['imgtoken']}&url=https://${url}&format=png&width=1366&height=768&accept_language=pt-BR`);
    
    try {

        const search = await get(
            `https://api.apiflash.com/v1/urltoimage?access_key=${process.env['imgtoken']}&url=https://${url}&format=png&width=1366&height=768&accept_language=pt-BR`
        ).then(() => {

            sucess = true;

            if(adultContent){
                if(!message.channel.nsfw){
                    message.react('💢'); 
                    message.delete().catch(O_o => {});
                    message.reply('por favor n use o comando desta forma em um canal safe for work!')
                }
                if(message.channel.nsfw){
                    
                    message.reply({embeds: [embed]});    
               
             }
            }
        
            if(!adultContent){
        
                
                message.reply({embeds: [embed]});                
               
            }

        }, (err) => message.reply(`Deu erro.. kk <:will_kk:846111319874338826>`))
    } catch (err) {
        console.log(err)

        message.reply('deu erro.. kk <:will_kk:846111319874338826>');
    }

}