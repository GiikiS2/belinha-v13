const mongoose = require("mongoose");
const Discord = require('discord.js');
 
mongoose.connect(process.env['MONGODB_URI'], { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('🌻│database geral Conectado com sucesso! ✅')
})

const schemaudb = mongoose.Schema({
    belinha: { type: String, default: `belinha`},
    comandos: {type: Array}
});
let a = new mongoose.model("geraldb", schemaudb)
exports.geraldb = a