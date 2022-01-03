var express = require("express");
let config = require("../config.json");
var app = express();
let client = require("../index.js");
let { categorias, common } = require("./backend.js");
const FormData = require("form-data");
const fetch = require("node-fetch");
app.use(require("express-session")(config.session));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));

app.get("/", async function (req, res) {
  const data = await fetch(`https://discord.com/api/users/@me`, {
    headers: { Authorization: `Bearer ${req.session.bearer_token}` },
  }); // Fetching user data
  const json = await data.json();

  res.render("../site/views/home", { client, categorias, json, req });
});

app.get("/dashboard", async function (req, res) {
  if (!req.session.bearer_token) {
    res.redirect("/");
  }

  const user = await fetch(`https://discord.com/api/users/@me`, {
    headers: { Authorization: `Bearer ${req.session.bearer_token}` },
  });
  const guilds = await fetch(`https://discord.com/api/users/@me/guilds`, {
    headers: { Authorization: `Bearer ${req.session.bearer_token}` },
  });
  const json = await user.json();
  const guildas = await guilds.json();

  const Guilds = Array.from(client.guilds.cache);

  let permguild = Object.values(guildas).filter(
    (valor) => (valor.permissions & (1 << 3)) == 1 << 3
  );

  let mootguild = permguild //Guilds.filter(value => permguild.includes(value.id));
  res.render("../site/views/dashboard", { client, categorias, json, mootguild, req });
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
  data.append("redirect_uri", "https://belinha-website.herokuapp.com/login/callback");
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
  res.redirect(
    `https://discord.com/api/oauth2/authorize?client_id=757352173481885717&redirect_uri=https%3A%2F%2Fbelinha-website.herokuapp.com%2Flogin%2Fcallback&response_type=code&scope=identify%20guilds`
  );
});

app.get("*", function (req, res) {
  res.render("../site/views/404", { client });
});

const server = app.listen(process.env.PORT || 3000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});
