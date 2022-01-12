require("http").createServer((req, res) => res.end(process.version)).listen()

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Uma nova mulher... firme e forte");
});

const Discord = require('discord.js')
const {
  Client,
  Intents
} = require('discord.js');
const client = new Client({
  intents: 32767
})
const config = require("./config.json");
require("colors")
const {
  readdirSync
} = require('fs');
let didYouMean = require('didyoumean')
require('dotenv').config()

client.login(process.env['TOKEN']);


client.on("ready", () => {

  let activities = [
      `latindo.exe 💻`,
      `b*help 🙋`,
      `em ${client.guilds.cache.size} servidores! ❤️`
    ],
    i = 0;
  setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
    type: "PLAYING"
  }), 100 * 60);
  client.user
    .setStatus("online")
  console.log('conectado' + ` Node.js ${process.version}`)
  console.log(`🔗│${client.user.username} esta online Online! em ${client.guilds.cache.size} servidores! 😄`.underline.red)
})

client.commands = new Discord.Collection();

const commandFiles = readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command, command.desc);
}

client.on('message', async message => { //Comandos

  if (message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`)
    message.reply('\\✨ **| Olá ' + message.author.username + '! Meu prefixo é `' + config.prefix + '`**!')
    .then(msg => setTimeout(() => {
      msg.delete()
    }, 5000))

  // Ignore all bots
  if (message.author.bot) return;

  if (message.content == config.prefix) return

  if (!message.content.toLowerCase().startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comandoNome = args.shift().toLowerCase();
  let emoji = require('./misc/emojis.js')

  if (!client.commands.has(comandoNome)) {
    didYouMean.threshold = 2;
    if (didYouMean(comandoNome, client.commands.map(c => c.name)) === null) return message.reply("<:erro_bot:802249908781973514> **| Esse comando não existe **" + emoji.randomoji(emoji.bug))
    return message.reply("<:erro_bot:802249908781973514> **| Esse comando não existe, talvez você queira** `-" + didYouMean(comandoNome, client.commands.map(c => c.name)) + "`");
  }

  const pdb = require("./misc/economydb.js");
  const mongoose = require("mongoose");

  try {
    if (!await pdb.User.findOne({
        userID: message.author.id
      })) {
      await pdb.User.create({
        userID: message.author.id
      })
      console.log('db criada')
    }
    message.channel.sendTyping();
    client.commands.get(comandoNome).run(client, message, args)
  } catch (erro) {
    message.reply(`<:erro_bot:802249908781973514> **| Houve um erro!** ${emoji.randomoji(emoji.bug)}\n`)
    console.log('❌│Erro: ' + erro + '\n❌│executado por ' + message.author.username + ' no servidor ' + message.guild.name + ' :disappointed_relieved:');
  };

});

client.on("guildMemberAdd", async (member) => {

  const gdb = require("./misc/guilddb.js")

  var serverid = member.guild.id;
  if (!await gdb.welcomedb.findOne({
      guildID: serverid
    })) {
    await gdb.welcomedb.create({
      guildID: serverid
    })
  }
  let data = await gdb.welcomedb.findOne({
    guildID: serverid
  })

  const welcomemsgd = require('./misc/welcomedb.js')
  welcomemsgd(data, client, member)

})

module.exports = client
require('./site/app.js')