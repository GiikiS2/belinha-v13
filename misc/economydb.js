const mongoose = require("mongoose")
 
mongoose.connect(process.env['MONGODB_URI'], { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('💸│database economica Conectado com sucesso! 👌')
}) 

const schemaudb = mongoose.Schema({
    userID: String,
    marry: { type: String, default: `noone` },
    karmaCooldown: { type: Number, default: 0 },
    apostarCooldown: { type: Number, default: 0 },
    karma: { type: Number, default: 0 },
    money: { type: Number, default: 0 },
    pv: { type: Number, default: 0 },
    dailyCooldown: { type: Number, default: 0 },
    pufflet: { type: String, default: `noinfo` },
    puffleimg: { type: String, default: `noimg` },
    pufflen: { type: String, default: `noname` },
    igluimg: { type: String, default: `https://images-ext-1.discordapp.net/external/5edTqdYzXBaNbWrYekBI2hUZSN-3pNsDN20xy_Au6H8/%3Fwidth%3D500%26height%3D427/https/media.discordapp.net/attachments/803083179706679366/841498674630885436/kisspng-club-penguin-igloo-house-clip-art-5aff49f4d57781.5556512915266800528744.png?width=450&height=384` },
    iglut: { type: String, default: `simples` },
    profilebanner: { type: String, default: `https://media.discordapp.net/attachments/841033444875829309/844082808079253504/bela_banner.png?width=976&height=263` },
});
let a = new mongoose.model("User", schemaudb)
exports.User = a