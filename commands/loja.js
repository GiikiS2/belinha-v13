const Discord = require("discord.js");
const pdb = require("../misc/economydb.js");
const mongoose = require("mongoose");
const {
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
  MessageEmbed,
} = require("discord.js");
let pets = require("../misc/pets.json");

module.exports = {
  name: "loja",
  desc: "mostra a loja da belinha, aonde você pode comprar de tudo",
  categoria: "social",
};

module.exports.run = async (client, message, args) => {
  let people = message.mentions.users.first() || message.author;

  const cat1 = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId("pet")
      .setStyle("PRIMARY")
      .setLabel("Pet")
      .setEmoji(`🐾`),
    new MessageButton()
      .setCustomId("casa")
      .setStyle("PRIMARY")
      .setLabel("Casa")
      .setEmoji(`🏠`)
  );

  const back = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId("voltar")
      .setStyle("SECONDARY")
      .setLabel("Voltar")
      .setEmoji(`↩️`)
  );

  let data = await pdb.User.findOne({ userID: people.id });

  let embed1 = new Discord.MessageEmbed()
    .setTitle(`**<:lola:924582993715163156> | Loja da Belinha!**`)
    .setDescription(
      `\n > Olá me chamo ${client.user.username}, e estou aqui para te ajudar em sua compra!\n` +
        `**Escolha uma categoria fornecida abaixo!**`
    )
    .setThumbnail(client.user.displayAvatarURL());
  //.setImage('https://media.discordapp.net/attachments/821036317344923660/838540560331309108/estagio_1_.png')

  message.reply({ embeds: [embed1], components: [cat1] }).then((m) => {
    // Send Embed And Buttons
    const iFilter = (i) => i.user.id === message.author.id;
    const collector = m.createMessageComponentCollector({
      filter: iFilter,
      time: 10 * 60000,
    });

    collector.on("collect", async (i) => {
      i.deferUpdate();

      if (i.customId === "voltar") {
        m.edit({ embeds: [embed1], components: [cat1] });
      }
      if (i.customId === "pet") {
        let selection = new MessageSelectMenu()
          .setCustomId("select")
          .setPlaceholder("Escolha um pet!");

        pets.forEach((pet) => {
          selection.addOptions([
            {
              label: pet.nome,
              description: `valor: ${pet.preço} 💰 - tipo: ${pet.tipo} 🐾`,
              value: pet.nome,
            },
          ]);
        });

        const row = new MessageActionRow().addComponents([selection]);

        let principembed = new Discord.MessageEmbed()
          .setTitle("**🦴 | Pets disponiveis**")
          .setThumbnail(
            "https://media.discordapp.net/attachments/821036317344923660/838540560331309108/estagio_1_.png?width=432&height=432"
          );
        pets.forEach((pet) =>
          principembed.addField(
            pet.nome,
            `> **valor:** ${pet.preço} :coin: \n > **tipo:** ${pet.tipo} 🐾`,
            true
          )
        );
        m.edit({ embeds: [principembed], components: [row, back] }).then(
          (m2) => {
            client.on("interactionCreate", async (interaction) => {
              if (!interaction.isSelectMenu()) return;
              if (interaction.user.id !== message.author.id) return;
              if (interaction.message.id !== m2.id) return;

              let infopet = pets.filter(
                (c) => c.nome === interaction.values[0]
              )[0];

              let data = await pdb.User.findOne({ userID: message.author.id });

              const button1 = new MessageButton()
                .setCustomId("não")
                .setLabel("Não")
                .setStyle("DANGER")
                .setEmoji("❌");

              const button2 = new MessageButton()
                .setCustomId("sim")
                .setLabel("Sim")
                .setStyle("SUCCESS")
                .setEmoji("✅");

              const sn = new MessageActionRow().addComponents([
                button2,
                button1,
              ]);

              if (data.pufflet !== "noinfo") {
                message.channel
                  .send({
                    content:
                      "Você ja tem um pet, deseja mesmo lhe subistituir?",
                    components: [sn],
                  })
                  .then((m3) => {
                    // Send Embed And Buttons
                    const iFilter = (i) => i.user.id === message.author.id;
                    const collector = m3.createMessageComponentCollector({
                      filter: iFilter,
                      time: 10 * 60000,
                    });

                    collector.on("collect", async (i) => {
                      i.deferUpdate();

                      if (i.customId === "sim") {
                        m3.delete();

                        if (data.money < infopet.preço) {
                          let embeddi = new Discord.MessageEmbed().setTitle(
                            `:coin: | **__ Você não tem r2coins o suficiente!__**`
                          );
                          return message.channel.send({ embeds: [embeddi] });
                        }

                        await pdb.User.findOneAndUpdate(
                          { userID: message.author.id },
                          { pufflet: infopet.nome }
                        );
                        await pdb.User.findOneAndUpdate(
                          { userID: message.author.id },
                          { puffleimg: `/assets/pets/${infopet.nome}.png` }
                        );
                        await pdb.User.findOneAndUpdate(
                          { userID: message.author.id },
                          { pufflen: `noname` }
                        );
                        data.money -= infopet.preço;
                        data.save();

                        let embedno = new Discord.MessageEmbed()
                          .setTitle(
                            `🐕 **__| Você adotou um ${infopet.nome}!__**`
                          )
                          .setImage(`attachment://${infopet.nome}.png`)
                          .setDescription(
                            "lembrando que você pode mudar o nome do pet com b*comando"
                          );
                        m2.edit({
                          embeds: [embedno],
                          components: [],
                          files: [`/assets/pets/${infopet.nome}.png`],
                        });
                        let embeddi = new Discord.MessageEmbed().setTitle(
                          `:coin: | **__ ${infopet.preço} r2coins foram removidos de sua conta!__**`
                        );
                        message.channel.send({ embeds: [embeddi] });
                      }
                      if (i.customId === "não") {
                        m3.delete();
                        let embeddi = new Discord.MessageEmbed().setTitle(
                          `❌ | **__loja fechada__**`
                        );
                        return m2.edit({ embeds: [embeddi] });
                      }
                    });
                  });
              } else {
                if (data.money < infopet.preço) {
                  let embeddi = new Discord.MessageEmbed().setTitle(
                    `:coin: | **__ Você não tem r2coins o suficiente!__**`
                  );
                  return message.channel.send({ embeds: [embeddi] });
                }

                await pdb.User.findOneAndUpdate(
                  { userID: message.author.id },
                  { pufflet: infopet.nome }
                );
                await pdb.User.findOneAndUpdate(
                  { userID: message.author.id },
                  { puffleimg: `/assets/pets/${infopet.nome}.png` }
                );
                await pdb.User.findOneAndUpdate(
                  { userID: message.author.id },
                  { pufflen: `noname` }
                );
                data.money -= infopet.preço;
                data.save();

                let embedno = new Discord.MessageEmbed()
                  .setTitle(`🐕 **__| Você adotou um ${infopet.nome}!__**`)
                  .setImage(`attachment://${infopet.nome}.png`)
                  .setDescription(
                    "lembrando que você pode mudar o nome do pet com b*comando"
                  );
                m2.edit({
                  embeds: [embedno],
                  components: [],
                  files: [`/assets/pets/${infopet.nome}.png`],
                });
                let embeddi = new Discord.MessageEmbed().setTitle(
                  `:coin: | **__ ${infopet.preço} r2coins foram removidos de sua conta!__**`
                );
                message.channel.send({ embeds: [embeddi] });
              }
            });
          }
        );
      }
    });
  });
};
