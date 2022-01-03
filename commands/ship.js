const Canvas = require('canvas');
const Discord = require('discord.js')
const canvas = Canvas.createCanvas(384, 128);
const ctx = canvas.getContext('2d');
const { createCanvas, loadImage } = require('canvas')

module.exports = {
  name: "ship",
  desc: "mostra o nivel de amor entre 2 usuários",
   categoria: 'fun'}

module.exports.run = async (bot, message, args) => {//exportando o comando como ship
  let membro1 = message.mentions.members.first()
    let membro2 = message.mentions.members.last()
  
  if(!membro1 || !membro2) return message.reply('Lembre-se de mencionar dois usuários para shippar')
    if(membro1 === membro2) return message.reply('Mencione duas pessoas diferentes')
  
  const amor = Math.floor(Math.random() * 100);
    const loveIndex = Math.floor(amor / 10);
  const loveLevel = "█".repeat(loveIndex) + ".".repeat(10 - loveIndex);

  const firstName = membro1.user.username
const secondName = membro2.user.username
// Pegar a metade inicial do primeiro nome
const dividedFirstName = firstName.slice(0, firstName.length / 2)
// Pegar a metade final do segundo nome
const dividedSecondName = secondName.slice(secondName.length / 2, secondName.length)
// Juntar os nomes
const nomeship = dividedFirstName + dividedSecondName
  
  let emoticon
    if(amor > 80) {
      emoticon = ("./imgs/hearts.png"); //casal perfeito
    } else if(amor > 60) {
      emoticon = ("./imgs/sparkles.png"); //fofo
    } else if(amor >= 40) {
      emoticon = ("./imgs/cringe.png"); //imagem de sei lá
    } else {
      emoticon = ("./imgs/mds.png"); //imagem chorando
    }

  let desc;
    if(amor > 90) {
      desc = ("**Almas Gémeas** :sparkling_heart:\n`"+membro1.user.username+"`\n`"+membro2.user.username+"`\n:heart: `"+nomeship+"` Esse é o casal perfeito! :heart:");
    } else if(amor >= 70) {
      desc = ("**eita! sera que eles formam um bom casal?** :sparkling_heart:\n`"+membro1.user.username+"`\n`"+membro2.user.username+"`\n:flushed: `"+nomeship+"` Esses aqui já estão namorando e n contaram pra ngm! :flushed:");
    } else if(amor >= 45) {
      desc = ("**HMMM, vai rolar ou não vai?** <:smiledog:872720085574373436>\n`"+membro1.user.username+"`\n`"+membro2.user.username+"`\n😕 `"+nomeship+"` Talvez só precise que "+membro2.user.username+" queira... 😕");
    } else {
      desc = ("**sei nn ein :|** <:alfredo:924844707895447552>\n`"+membro1.user.username+"`\n`"+membro2.user.username+"`\n:cry: `"+nomeship+"`queria muito dizer que é possivel, mas... :cry: ");
    }
  
  const canvas = Canvas.createCanvas(384, 128);
  const ctx = canvas.getContext('2d');
    
  const emote = await Canvas.loadImage(emoticon);
    const foto1 = await Canvas.loadImage(membro1.user.displayAvatarURL({format: "png"}))
  const foto2 = await  Canvas.loadImage(membro2.user.displayAvatarURL({format: "png"}))

    ctx.drawImage(emote, 125, 0, 128, 128)
      ctx.drawImage(foto1, -10, 0, 128, 128)
    ctx.drawImage(foto2, 260, 0, 128, 128)

 const amorat = new Discord.MessageAttachment(canvas.toBuffer(), 'chances-image.png')
      
  
let amorEmbed = new Discord.MessageEmbed()
  .setColor('#ff3399')
    .setDescription("**"+amor+"%** [`"+loveLevel+"`]")
  .setImage('attachment://chances-image.png')
  
  message.reply({
  content: '<@'+message.author.id+'> \n'+desc,
  embeds: [amorEmbed],
  files: [amorat]
})

  
}