var request = require('request');
var fs = require('fs');

module.exports = {
  name: "removebg",
  desc: "remove o fundo de uma imagem",
   categoria: 'utils'}

let mojiarray = [
  '<:doggggooo:915385710763192360>',
  '<:doggo:914996909091995678>', 
  '<:dogo:915385628265426984>', 
  '<:dogoo:915385760566374411>' ,
  '<:nobg:914995202261942313>',
  '<a:belinha_piscando:809889626943651890>'
]
let randommoji = mojiarray[Math.floor(Math.random() * mojiarray.length)]


module.exports.run = async (client, message, args) => {


  const url = args.join(' ');

  if (message.attachments.size !== 0) {    
    const firstAttachment = message.attachments.first();
        request.post({
  url: 'https://api.remove.bg/v1.0/removebg',
  formData: {
    image_url: `${firstAttachment.url}`,
    size: 'auto',
  },
  headers: {
    'X-Api-Key': process.env['removebgkey']
  },
  encoding: null
}, function(error, response, body) {
  if(error) return message.reply('houve um erro durante a execução do comando :pensive:');
  if(response.statusCode != 200) return console.log('Error:', response.statusCode, body.toString('utf8'));
  fs.writeFileSync("no-bg.png", body);
  message.reply({
    content: `aqui esta ${randommoji}`,
    files: [{
      attachment: 'no-bg.png',
      name: 'removebg.png'
    }]
  })
}); 
}

  if (url) {    
      if (!url) { message.channel.send(`desculpe, não achei nenhum avatar, imagem ou link 😭 `)  }
        request.post({
  url: 'https://api.remove.bg/v1.0/removebg',
  formData: {
    image_url: `${url}`,
    size: 'auto',
  },
  headers: {
    'X-Api-Key': process.env['removebgkey']
  },
  encoding: null
}, function(error, response, body) {
  if(error) return message.reply('houve um erro durante a execução do comando :pensive:');
  if(response.statusCode != 200) return console.log('Error:', response.statusCode, body.toString('utf8'));
  fs.writeFileSync("no-bg.png", body);
  message.reply({
    content: `aqui esta ${randommoji}`,
    files: [{
      attachment: 'no-bg.png',
      name: 'removebg.png'
    }]
  })
}); 
}

 let user = message.mentions.users.first()


if (user) {    
  const avatar = user.displayAvatarURL({format: 'png', size: 1024})
      if (!avatar) { message.channel.send(`desculpe, não achei nenhum avatar, imagem ou link 😭 `) }
        request.post({
  url: 'https://api.remove.bg/v1.0/removebg',
  formData: {
    image_url: `${avatar}`,
    size: 'auto',
  },
  headers: {
    'X-Api-Key': process.env['removebgkey']
  },
  encoding: null
}, function(error, response, body) {
  if(error) return message.reply('houve um erro durante a execução do comando :pensive:');
  if(response.statusCode != 200) return console.log('Error:', response.statusCode, body.toString('utf8'));
  fs.writeFileSync("no-bg.png", body);
  message.reply({
    content: `aqui esta ${randommoji}`,
    files: [{
      attachment: 'no-bg.png',
      name: 'removebg.png'
    }]
  })
}); 
}

}
