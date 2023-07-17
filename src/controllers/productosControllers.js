const { Product, Category, Sequelize } = require("../database/models");
const { Op } = Sequelize;
const { deleteOrder, getOrderById, getOrderByUser, getOrders, insertOrder, updateOrder } = require("../services/order.service");
const { deleteOrderItem, getOrderItemById, getOrderItemsByOrder, getOrderItemsByProduct, insertOrderItem, updateOrderItem, bulkDeleteOrderItems } = require("../services/orderItems.service");

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

module.exports = {
      carrito: async (req, res) => {
            try {
                  const idUser = req.session.user.id;
                  const order = await getOrderByUser(idUser);
                  //return res.send(order);
                  res.render("products/carrito", { order, session: req.session });
                  console.log(order)
            } catch (error) {
                  return res.status(500).json({ Error: `Error del Servidor ${error}` });
            }
      },
      addToOrder: async (req, res) => {
            //            //return res.send(`pp ${req.params.idProduct}`);
            try {
                  // id usuario
                  const idUser = req.session.user.id;
                  const order = await getOrderByUser(idUser);

                  // id producto + quantity
                  const idProduct = req.params.idProduct;
                  const quantity = req.body.quantity;

                  //return res.send(`${idProduct}  - ${quantity} - ${idUser}`);

                  // Verificar si existe una orden para el usuario
                  if (order) {
                        let dataItem;
                        // Si existe una orden, agregar el item
                        // id orden
                        const idOrder = order.idOrder;
                        const item = await getOrderItemsByProduct(idProduct);
                        if (item) {
                              dataItem = {
                                    idOrder,
                                    idProduct,
                                    quantity: item.quantity + quantity,
                              };
                              const updateOrderItemFetch = await updateOrderItem(dataItem, item.idOrderItem);
                              return res.status(200).json("Producto incrementado correctamenete");
                        } else {
                              dataItem = {
                                    idOrder,
                                    idProduct,
                                    quantity,
                              };
                              const createOrderItem = await insertOrderItem(dataItem);
                              const idUser = req.session.user.id;
                              const order = await getOrderByUser(idUser);
                              return res.render("products/carrito", { order, session: req.session });
                        }
                  } else {
                        // Si No existe una orden, crear la orden y agregar el item
                        const data = {
                              idUser,
                              state: "PENDING",
                        };
                        const createOrder = await insertOrder(data);
                        if (createOrder) {
                              let dataItem = {
                                    idOrder: createOrder.idOrder,
                                    idProduct,
                                    quantity,
                              };
                              const createOrderItem = await insertOrderItem(dataItem);
                              const idUser = req.session.user.id;
                              const order = await getOrderByUser(idUser);
                              return res.render("products/carrito", { order, session: req.session });
                              return res.status(201).json("Orden creada e item agregado correctamenete");
                        }
                        return res.status(400).json(`El usuario con el ID: ${idUser} no tiene ordenes creada`);
                  }
            } catch (error) {
                  return res.status(500).json({ Error: `Error del Servidor ${error}` });
            }
      },
      description: (req, res) => {
            const PRODUCT_PROMISE = Product.findByPk(req.params.id, {
                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
            });

            Promise.all([PRODUCT_PROMISE, INSALE_PROMISE])
                  .then(([product, inSale, imageMain]) => {
                        return res.render("products/descripcion", {
                              product,
                              inSale,
                              session: req.session,
                        });
                  })
                  .catch((error) => console.log(error));
      },
      filters: (req, res) => {
            let category = req.params.category;
            if (category != "Todos los Productos") {
                  Product.findAll({
                        where: {
                              "$subcategory.category.name$": category,
                        },

                        include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
                  }).then((products) => {
                        return res.render("products/filters", { products, category, session: req.session });
                  });
            } else {
                  Product.findAll({
                        include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
                  }).then((products) => {
                        return res.render("products/filters", { products, category, session: req.session });
                  });
            }
      },
      inSale: (req, res) => {
            const category = "¡OFERTAS!";
            Product.findAll({
                  where: {
                        discount: {
                              [Op.gt]: 0,
                        },
                  },
                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
            }).then((products) => {
                  res.render("products/filters", { products, category, session: req.session });
            });
            /* const products = dbProducts.filter((product) => {
                  return product.discount > 0;
            });
            res.render("products/filters", { products, category, session: req.session }); */
      },
      featured: (req, res) => {
            const category = "DESTACADOS";
            Product.findAll({
                  where: {
                        sold: {
                              [Op.gt]: 50,
                        },
                  },
                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
            }).then((products) => {
                  res.render("products/filters", { products, category, session: req.session });
            });
            /*  const products = dbProducts.filter((product) => {
                  return product.sold > 50;
            });
            res.render("products/filters", { products, category, session: req.session }); */
      },
      buscar: (req, res) => {
            /* let valor = req.query.valor;
            products = dbProducts.filter((product) => {
                  product.name = product.name.toLowerCase();
                  if (product.name.includes(valor.toLowerCase())) {
                        return product;
                  }
            });

            category = "all";
            res.render("products/filters", { products, category, session: req.session }); */
            let valor = req.query.valor;
            let category = "Resultado";
            Product.findAll({
                  where: {
                        name: { [Op.substring]: valor },
                  },

                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
            }).then((products) => {
                  return res.render("products/filters", { products, category, session: req.session });
            });
      },
};
