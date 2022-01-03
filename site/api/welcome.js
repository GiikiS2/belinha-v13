const Canvas = require("canvas")

module.exports.run = async (req, res) => {
	const { avatar, background } = req.query;
	if (!avatar) return res.json({ erro: "Forneça um avatar." })
	if (!background) return res.json({ erro: "Forneça um background." })
	try {
		const canvas = Canvas.createCanvas(900, 360);
        const ctx = canvas.getContext('2d')
        const texto = await Canvas.loadImage('https://media.discordapp.net/attachments/782073366580035605/794342657710227456/BEM_VINDO.png?width=660&height=139')
        const fundo = await Canvas.loadImage(background)
        let altura
        if(fundo.height < 360){altura = 360}else{altura = fundo.height}
        ctx.drawImage(fundo, 0, 0, 900, altura);
        const mask = await Canvas.loadImage('https://images-ext-2.discordapp.net/external/XwRRBlz4YawkXBqIQhofhcHovymtqENLxQRvqJVNNyE/https/upload.wikimedia.org/wikipedia/commons/thumb/0/00/Disk_pack1.svg/1200px-Disk_pack1.svg.png?width=480&height=480');
        ctx.drawImage(mask, 350, 50, 205, 205);
        ctx.drawImage(texto, 270, 285, 366, 62);
        ctx.beginPath();
          ctx.arc(452, 152, 95, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        const userimg = await Canvas.loadImage(avatar);
        ctx.drawImage(userimg, 351, 50, 200, 200);
		res.set({ "Content-Type": "image/png" })
		res.send(canvas.toBuffer())
	} catch (error) {
        res.json({ erro: `houve um erro. ${error}` })
        console.log(error)
	}
}