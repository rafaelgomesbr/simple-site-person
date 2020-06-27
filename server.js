//Pedindo requisição do express e nunjucks
const express = require("express");
const nunjucks = require("nunjucks");

//Atribuindo a função express a variavel server;
const server = express();

//pedindo acesso aos dados do data.js
const videos = require("./data.js");

//tornando a pasta 'public' estatica;
server.use(express.static("public"));

//não Sei explicar ainda kk
server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: false,
}); //

//Mandando Rotas do servidor para o cliente
server.get("/", function (req, res) {
  //Conteudo que vai ser enviado até o about.njk
  const about = {
    avatar:
      "https://instagram.fmab1-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/98475559_176730757004748_4485427540403937781_n.jpg?_nc_ht=instagram.fmab1-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=u2Ln-XPLsLgAX_2DPQ4&oh=ed41eeea1161fbe9c4249b4e9844e3d9&oe=5F107984",
    name: "Rafael Souza",
    cargo: "Desenvolvedor - Full Stack",
    description:
      'Desenvolvedor recem formado, mas com muita garra e vontade de crescer, conheça minha  <a href="http://instagram.com/irl_rafa" target="_blank">rede social.</a>',
    social: [
      { link: "https://www.linkedin.com/in/rafaelgomesbr/", name: "Linkedin" },
      { link: "https://instagram.com/irl_rafa", name: "Instagram" },
      { link: "https://facebook.com/rafasoftware16", name: "Facebook" },
    ],
  };

  return res.render("about", { about });
});

//Conteudo que vai para o portifolio.njk
server.get("/portifolio", function (req, res) {
  return res.render("portifolio", { itens: videos });
});

server.get("/video", function (req, res) {
  const id = req.query.id;
  const video = videos.find(function (video) {
    if (video.id == id) return true;
  });

  if (!video) return res.send("video Not Found");

  return res.render("video", {item: video})
 
});

// Servidor passa a ouvir na porta 5000
server.listen(5000, function () {
  console.log("Server rodando");
});
