const { Category } = require("../database/models");
const fetch = require("node-fetch");

module.exports = {
      subcategories: (req, res) => {
            fetch("http://localhost:3060/api/v1/subcategories/index")
                  .then((response) => response.json()) // Parsear la respuesta JSON
                  .then((subcategorias) => {
                        res.render("admin/adminSubCategories", { subcategorias: subcategorias.data, session: req.session }); // Renderizar la vista EJS con los datos del producto
                  })
                  .catch((error) => {
                        console.log(error);
                  });
      },
      updateSucategoryAdmin: (req, res) => {
            res.send("En construcción, pronto estara funcional");
      },
};
