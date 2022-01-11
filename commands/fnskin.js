const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "skin",
  desc: "mostrar as informações de um cosmético do fortnite",
  categoria: "games",
};

//https://dash.fortnite-api.com/
module.exports.run = async (client, message, args) => {
  const nomeskin = args.join(" ");

  if (!nomeskin) return message.reply("forneça o nome de alguma skin");

  let embeddierr = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(
      `<:erro_bot:802249908781973514> houve um erro, a skin **${nomeskin}** não foi encontrada na api`
    );

  axios
    .get(
      `https://fortnite-api.com/v2/cosmetics/br/search?name=${nomeskin}&language=pt-BR&matchMethod=contains`
    )
    .then((res) => {
      console.log('status skin search = ', res.data)
      if (res.data.status == "200") {
        if (res.data.data.showcaseVideo)
          videoskin = `https://www.youtube.com/watch?v=${res.data.data.showcaseVideo}`;

        if (!res.data.data.showcaseVideo) videoskin = `não tem :x:`;

        if (res.data.data.images.icon)
          iconimg = `[link](${res.data.data.images.icon})`;

        if (!res.data.data.images.icon) iconimg = `não tem :x:`;

        if (res.data.data.images.featured)
          fimg = `[link](${res.data.data.images.featured})`;

        if (!res.data.data.images.featured) fimg = `não tem :x:`;

        let embed = new Discord.MessageEmbed()
          .setColor("#FFC0CB")
          .setImage(res.data.data.images.featured)
          .setDescription(
            ` 
<:user:849148829626531892> **nome:** ${res.data.data.name} 

<:rar:849149231164030986> **raridade:** ${res.data.data.rarity.displayValue} 

<:desc:849149383063765003> **descrição:** ${res.data.data.description} 

<:type:849148473780862976> **tipo:** ${res.data.data.type.displayValue}  

<:people:849149855339380786> **${
              res.data.data.set?.text || "Não tem conjunto!"
            }**

<:cal_ico:849153550012907520> **${res.data.data.introduction.text}**


<:img_ico:849153168540565564> **link da imagem icon:** ${iconimg}
<:img_ico:849153168540565564> **link da imagem featured:** ${fimg}


<:video_ico:849153365866315776> **video:** ${videoskin}

<:dtl_ico:849154023386382386> **id:** ${res.data.data.id}

<:tag_vaza:849148309754347540> **tags:**` +
              "```" +
              res.data.data.gameplayTags +
              "```" +
              `

<:pt_ico:849154472579825694> **path:**` +
              "``" +
              res.data.data.path +
              "``"
          )

          .setThumbnail(res.data.data.images.icon);
        message.reply({embeds: [embed]});

        if (!res.data.data.variants) return;
        res.data.data.variants[0].options.forEach((se) => {
          if (se.name == res.data.data.name) return;
          if (se.name == "PADRÃO") return;
          if (se.name == "Padrão") return;

          let embed2 = new Discord.MessageEmbed()
            .setColor("#FFC0CB")
            .setDescription(
              `
<:user:849148829626531892> **NOME:** ${res.data.data.name || "indefinido"}

<:desc:849149383063765003> **VARIANTE:** ${se.name || "indefinido"}`
            )
            .setThumbnail(se.image);
          message.channel.send({embeds: [embed2]});
        });

        if (!res.data.data.variants[1]) return;
        res.data.data.variants[1].options.forEach((se) => {
          if (se.name == res.data.data.name) return;
          if (se.name == "PADRÃO") return;
          if (se.name == "Padrão") return;

          let embed2 = new Discord.MessageEmbed()
            .setColor("#FFC0CB")
            .setDescription(
              `
<:user:849148829626531892> **NOME:** ${res.data.data.name || "indefinido"}

<:desc:849149383063765003> **VARIANTE:** ${se.name || "indefinido"}`
            )
            .setThumbnail(se.image);
          message.channel.send({embeds: [embed2]});
        });
      } else {
        message.reply("não achei isso ai na api afe");
      }
    })
    .catch((err) =>
      axios
        .get(
          `https://fortnite-api.com/v2/cosmetics/br/search?name=${nomeskin}&language=pt-BR&searchLanguage=pt-BR&matchMethod=contains`
        )
        .then((res) => {
          console.log('status skin search = ', res.data.status)
          if (res.data.status == "200") {
            if (res.data.data.showcaseVideo)
              videoskin = `https://www.youtube.com/watch?v=${res.data.data.showcaseVideo}`;

            if (!res.data.data.showcaseVideo) videoskin = `não tem :x:`;

            if (res.data.data.images.icon)
              iconimg = `[link](${res.data.data.images.icon})`;

            if (!res.data.data.images.icon) iconimg = `não tem :x:`;

            if (res.data.data.images.featured)
              fimg = `[link](${res.data.data.images.featured})`;

            if (!res.data.data.images.featured) fimg = `não tem :x:`;

            let embed = new Discord.MessageEmbed()
              .setColor("#FFC0CB")
              .setImage(res.data.data.images.featured)
              .setDescription(
                ` 
<:user:849148829626531892> **nome:** ${res.data.data.name} 

<:rar:849149231164030986> **raridade:** ${res.data.data.rarity.displayValue} 

<:desc:849149383063765003> **descrição:** ${res.data.data.description} 

<:type:849148473780862976> **tipo:** ${res.data.data.type.displayValue}  

<:people:849149855339380786> **${
                  res.data.data.set?.text || "Não tem conjunto!"
                }**

<:cal_ico:849153550012907520> **${res.data.data.introduction.text}**


<:img_ico:849153168540565564> **link da imagem icon:** ${iconimg}
<:img_ico:849153168540565564> **link da imagem featured:** ${fimg}


<:video_ico:849153365866315776> **video:** ${videoskin}

<:dtl_ico:849154023386382386> **id:** ${res.data.data.id}

<:tag_vaza:849148309754347540> **tags:**` +
                  "```" +
                  res.data.data.gameplayTags +
                  "```" +
                  `

<:pt_ico:849154472579825694> **path:**` +
                  "``" +
                  res.data.data.path +
                  "``"
              )

              .setThumbnail(res.data.data.images.icon);
            message.reply({embeds: [embed]});

            if (!res.data.data.variants) return;
            res.data.data.variants[0].options.forEach((se) => {
              if (se.name == res.data.data.name) return;
              if (se.name == "PADRÃO") return;
              if (se.name == "Padrão") return;

              let embed2 = new Discord.MessageEmbed()
                .setColor("#FFC0CB")
                .setDescription(
                  `
<:user:849148829626531892> **NOME:** ${res.data.data.name || "indefinido"}

<:desc:849149383063765003> **VARIANTE:** ${se.name || "indefinido"}`
                )
                .setThumbnail(se.image);
              message.channel.send({embeds: [embed2]});
            });

            if (!res.data.data.variants[1]) return;
            res.data.data.variants[1].options.forEach((se) => {
              if (se.name == res.data.data.name) return;
              if (se.name == "PADRÃO") return;
              if (se.name == "Padrão") return;

              let embed2 = new Discord.MessageEmbed()
                .setColor("#FFC0CB")
                .setDescription(
                  `
<:user:849148829626531892> **NOME:** ${res.data.data.name || "indefinido"}

<:desc:849149383063765003> **VARIANTE:** ${se.name || "indefinido"}`
                )
                .setThumbnail(se.image);
              message.channel.send({embeds: [embed2]});
            });
          } else {
            message.reply("não achei isso ai na api afe");
          }
        })
        .catch((err) => message.reply({embeds: [embeddierr]}))
    );
};
