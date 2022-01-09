var express = require("express");
const pdb = require("../misc/economydb.js");
let config = require("../config.json");
var app = express();
let client = require("../index.js");
const cliente = client
let {
    categorias,
    common
} = require("./backend.js");
const FormData = require("form-data");
const fetch = require("node-fetch");
let pets = require("../misc/pets.json");
let casas = require("../misc/casas.json");
let banners = require("../misc/banners.json");
app.use(require("express-session")(config.session));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get("/", async function (req, res) {
    const user = await fetch(`https://discord.com/api/users/@me`, {
        headers: {
            Authorization: `Bearer ${req.session.bearer_token}`
        },
    }); // Fetching user data
    const json = await user.json();
    let data = await pdb.User.findOne({
        userID: json.id
    })
    if (!data) await pdb.User.create({
        userID: json.id
    })

    res.render("../site/views/home", {
        cliente,
        data,
        categorias,
        json,
        req
    });
});

app.get("/dashboard", async function (req, res) {
    if (!req.session.bearer_token) return res.redirect("/");


    const user = await fetch(`https://discord.com/api/users/@me`, {
        headers: {
            Authorization: `Bearer ${req.session.bearer_token}`
        },
    });
    const guilds = await fetch(`https://discord.com/api/users/@me/guilds`, {
        headers: {
            Authorization: `Bearer ${req.session.bearer_token}`
        },
    });
    const json = await user.json();
    const guildas = await guilds.json();

    const Guilds = Array.from(cliente.guilds.cache);
    let data = await pdb.User.findOne({
        userID: json.id
    })
    if (!data) await pdb.User.create({
        userID: json.id
    })

    let permguild = Object.values(guildas).filter(
        (valor) => (valor.permissions & (1 << 3)) == 1 << 3
    );

    let mootguilds = permguild //Guilds.filter(value => permguild.includes(value.id));
    res.render("../site/views/dashboard", {
        cliente,
        data,
        json,
        mootguilds,
        req
    });
});

app.get("/shop", async function (req, res) {
    if (!req.session.bearer_token) return res.redirect("/");
    const {
        id
    } = req.query;
    if (!id) return res.send({
        erro: 'forneça um id'
    })

    const user = await fetch(`https://discord.com/api/users/@me`, {
        headers: {
            Authorization: `Bearer ${req.session.bearer_token}`
        },
    });
    const json = await user.json();
    let data = await pdb.User.findOne({
        userID: json.id
    })
    if (!data) await pdb.User.create({
        userID: json.id
    })

    res.render("../site/views/shop", {
        json,
        banners,
        pets,
        casas,
        data,
        req,
        id
    });
});

app.post('/shop', async function (req, res, next) {
    const user = await fetch(`https://discord.com/api/users/@me`, {
        headers: {
            Authorization: `Bearer ${req.session.bearer_token}`
        },
    });
    const json = await user.json();
    let data = await pdb.User.findOne({
        userID: json.id
    })
    let item = JSON.parse(req.body.item)

    if (req.body.tipo === 'casa') {
        await pdb.User.findOneAndUpdate({
            userID: json.id
        }, {
            igluimg: `https://belinha-website.herokuapp.com/assets/casa/${item.alt}.png`,
            iglut: item.nome
        });
        data.money -= item.preço;
        data.save();
    }
    if (req.body.tipo === 'pet') {
        await pdb.User.findOneAndUpdate({
            userID: json.id
        }, {
            puffleimg: `https://belinha-website.herokuapp.com/assets/pet/${item.alt}.png`,
            pufflen: 'noname',
            pufflet: item.tipo
        });
        data.money -= item.preço;
        data.save();
    }
    if (req.body.tipo === 'banner') {
        await pdb.User.findOneAndUpdate({
            userID: json.id
        }, {
            profilebanner: `https://belinha-website.herokuapp.com/assets/banner/${item.alt}.png`
        });
        data.money -= item.preço;
        data.save();
    }


});

app.get("/profile", async function (req, res) {
    if (!req.session.bearer_token) return res.redirect("/");
    const {
        id
    } = req.query;
    if (!id) return res.send({
        erro: 'forneça um id'
    })

    const userj = await fetch(`https://discord.com/api/users/@me`, {
        headers: {
            Authorization: `Bearer ${req.session.bearer_token}`
        },
    });
    const json = await userj.json();
    let puser = await pdb.User.findOne({
        userID: id
    })
    if (!puser) return await pdb.User.create({
        userID: id
    }).then(res.redirect(`/profile?id${json.id}`))
    let data = await pdb.User.findOne({
        userID: json.id
    })
    if (!data) return await pdb.User.create({
        userID: json.id
    }).then(res.redirect(`/profile?id${json.id}`))
    let user = cliente.users.cache.get(id)
    if (!user) return res.send({
        erro: 'usuario invalido'
    })

    res.render("../site/views/profile", {
        json,
        puser,
        id,
        data,
        cliente,
        req,
        user
    });
});

app.get("/api/welcome", function (req, res) {
    require("../site/api/welcome.js").run(req, res);
});

app.get("/login/callback", async (req, resp) => {
    const accessCode = req.query.code;
    if (!accessCode) return resp.send("No access code specified");

    const data = new FormData();
    data.append("client_id", process.env["clientid"]);
    data.append("client_secret", process.env["clientsecret"]);
    data.append("grant_type", "authorization_code");
    data.append("redirect_uri", process.env["redirect"]);
    data.append("scope", "identify");
    data.append("code", accessCode);

    const json = await (
        await fetch("https://discord.com/api/oauth2/token", {
            method: "POST",
            body: data,
        })
    ).json();
    req.session.bearer_token = json.access_token;

    resp.redirect("/");
});



app.get("/login", (req, res) => {
    res.redirect(`https://discord.com/api/oauth2/authorize` +
        `?client_id=${process.env["clientid"]}` +
        `&redirect_uri=${process.env["redirect"]}` +
        `&response_type=code&scope=identify%20guilds`)
});

app.get("/logout", async (req, resp) => {
    if (!req.session.bearer_token) return resp.redirect("/");

    const data = new FormData();
    data.append("client_id", process.env["clientid"]);
    data.append("client_secret", process.env["clientsecret"]);
    data.append('token', req.session.bearer_token);

    const json = await (
        await fetch("https://discord.com/api/oauth2/token/revoke", {
            method: "POST",
            body: data,
        })
    ).json();
    req.session.bearer_token = json.access_token;

    resp.redirect("/");
});

app.get("*", async function (req, res) {
    const user = await fetch(`https://discord.com/api/users/@me`, {
        headers: {
            Authorization: `Bearer ${req.session.bearer_token}`
        },
    });
    const json = await user.json();
    let data = await pdb.User.findOne({
        userID: json.id
    })
    if (!data) await pdb.User.create({
        userID: json.id
    })

    res.render("../site/views/404", {
        req,
        data,
        json
    });
});

const server = app.listen(process.env.PORT || 3000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
});