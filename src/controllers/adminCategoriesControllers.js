const { Category } = require("../database/models");
const fetch = require("node-fetch");

module.exports = {
      categories: (req, res) => {
            fetch("http://localhost:3060/api/v1/categories/index")
                  .then((response) => response.json()) // Parsear la respuesta JSON
                  .then((categorias) => {
                        res.render("admin/adminCategories", { categorias: categorias.data, session: req.session }); // Renderizar la vista EJS con los datos del producto
                  })
                  .catch((error) => {
                        console.log(error);
                  });
      },
      updateCatergoryAdmin: (req, res) => {
            res.send("En construcción, pronto estara funcional");
      },
};
