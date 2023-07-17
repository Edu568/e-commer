/* const dbProducts = require("../database/index"); */
//const { readJSON } = require("../database");

//const dbProducts = readJSON("products.json");
const { carousel } = require("../database");

const { Product, Category, Sequelize } = require("../database/models");
const { Op } = Sequelize;

module.exports = {
      index: (req, res) => {
            const IMAGE_MAIN_PROMISE = Product.findAll({
                  where: {
                        sold: {
                              [Op.gt]: 50,
                        },
                  },
                  limit: 5,
                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
            });
            const FEATURED_PROMISE = Product.findAll({
                  where: {
                        sold: {
                              [Op.gt]: 50,
                        },
                  },
                  limit: 5,
                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
            });
            const INSALE_PROMISE = Product.findAll({
                  where: {
                        discount: {
                              [Op.gt]: 0,
                        },
                  },
                  order: [["discount", "DESC"]],
                  limit: 5,
                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
            });
            Promise.all([FEATURED_PROMISE, INSALE_PROMISE, IMAGE_MAIN_PROMISE])

                  .then(([featured, inSale, imageMain]) => {
                        //return res.render("pruebaproduct", { featured, inSale, imageMain, session: req.session });
                        return res.render("home", {
                              carousel,
                              featured,
                              inSale,
                              imageMain,
                              session: req.session,
                        });
                  })
                  .catch((error) => console.log(error));

            /***************************************************************** */

            /*const featured = dbProducts
                  .filter((product) => {
                        return product.sold > 50;
                  })
                  .slice(0, 5);
            const inSale = dbProducts
                  .filter((product) => {
                        return product.discount > 0;
                  })
                  .slice(0, 5);
            const imageMain = dbProducts;
            return res.render("home", { featured, inSale, imageMain, session: req.session });*/
      },
};
