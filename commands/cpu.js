
module.exports = {
  name: "cpu",
  desc: "mostra quanto da cpu que o bot esta usando",
   categoria: 'bot'}
   
module.exports.run = async (bot, message, args) => {

message.reply(`<:correct_bot:802257764860297226> Estou Consumindo: **${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%** de CPU
<:correct_bot:802257764860297226> Estou Consumindo **${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB** de Memória RAM`)
}