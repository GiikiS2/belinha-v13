const mongoose = require("mongoose");
 
mongoose.connect('mongodb+srv://giikiNotFound:bela123@belinhacluster.fiqdu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('📙│database servidor Conectado com sucesso! ✅')
})

const schemaudb = mongoose.Schema({
    guildID: String,
    configuradorID: String,
    defaultchannel: String,
    onoff: { type: String, default: `off` },
    canalID: { type: String, default: `noone` },
    Title: { type: String, default: `**Bem vinde!** <:02_love:838497281086717962>` },
    Image: { type: String, default: `on` },
    Description: { type: String, default: `
    <a:seta_da_belinha:804194557557211136> **Oi, que bom que você chegou <a:pantera_happy:804191164588752926>**
    <a:seta_da_belinha:804194557557211136> **não se esqueça de ler as Regras. **
    <a:seta_da_belinha:804194557557211136> ** divirta-se!** <a:002yay:804191643183218759>
    <a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033><a:barra:803387776530645033>
    ` },
    Thumbnail: { type: String, default: `on` },
    Footer: { type: String, default: `Obrigado por entrar no servidor ❤️` },
    lojasend: { type: String, default: `off` },
    lojachannel: { type: String, default: `noone` },
    //customimg: { type: String, default: `on` },
});
let a = new mongoose.model("welcomedb", schemaudb)
exports.welcomedb = a