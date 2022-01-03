module.exports = {
  name: "ping",
  desc: "mostra o ping do bot",
   categoria: 'bot'}

module.exports.run = async (client, message, args) => {
  const m = await message.reply('ping?');

  m.edit(`🏓 **| Pong!**\n> Latência do Server: **${m.createdTimestamp -
      message.createdTimestamp}ms.**\n> Latência da API: **${Math.round(
      client.ws.ping
    )}ms**`
  );
};
