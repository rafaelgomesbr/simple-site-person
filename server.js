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
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/534384101637051.5f232251c2f26.jpg",
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
