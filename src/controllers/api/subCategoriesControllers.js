const { Subcategory } = require("../../database/models");
module.exports = {
      index: async (req, res) => {
            try {
                  const RESULT = await Subcategory.findAll({
                        include: [{ association: "products" }, { association: "category" }],
                  });
                  return res.status(201).json({
                        meta: {
                              status: 201,
                              url: "api/v1/subcategories/list",
                              msg: "Listado de SubCategorias",
                        },
                        data: RESULT,
                  });
            } catch (error) {
                  console.error(error);
            }
      },
      category: async (req, res) => {
            try {
                  const RESULT = await Subcategory.findAll({ where: { idCategory: req.params.id } });
                  return res.status(201).json({
                        meta: {
                              status: 201,
                              url: "api/v1/subCategories/category/:id",
                              msg: "Subcategoria Agregada",
                        },
                        data: RESULT,
                  });
            } catch (error) {
                  console.log(error);
            }
      },
      store: async (req, res) => {
            try {
                  const RESULT = await Subcategory.create({
                        name: req.body.name,
                        idCategory: req.body.idCategory,
                  });
                  return res.status(201).json({
                        meta: {
                              status: 201,
                              url: "api/v1/subcategories/create",
                              msg: "Subcategoria Agregada",
                        },
                        data: RESULT,
                  });
            } catch (error) {
                  console.log(error);
            }
      },
      update: async (req, res) => {
            try {
                  const RESULT = await Subcategory.update(
                        {
                              name: req.body.name,
                              idCategory: req.body.idCategory,
                        },
                        { where: { idSubcategory: req.params.id } }
                  );
                  if (RESULT === 1) {
                        RESPONSE = {
                              meta: {
                                    status: 201,
                                    url: "api/v1/subcategories/update/:id",
                                    msg: "Subcategoria Modificada",
                              },
                              data: RESULT,
                        };
                  } else {
                        RESPONSE = {
                              meta: {
                                    status: 201,
                                    url: "api/v1/subcategories/delete/:id",
                                    msg: "Subcategoria No encontrada",
                              },
                        };
                  }
                  return res.status(201).json(RESPONSE);
            } catch (error) {
                  console.log(error);
            }
      },
      destroy: async (req, res) => {
            try {
                  const RESULT = await Subcategory.destroy({
                        where: { idSubcategory: req.params.id },
                  });
                  if (RESULT === 1) {
                        RESPONSE = {
                              meta: {
                                    status: 201,
                                    url: "api/v1/subcategories/delete/:id",
                                    msg: "Subcategoria Eliminada",
                              },
                        };
                  } else {
                        RESPONSE = {
                              meta: {
                                    status: 201,
                                    url: "api/v1/subcategories/delete/:id",
                                    msg: "Subcategoria No encontrada",
                              },
                        };
                  }
                  return res.status(201).json(RESPONSE);
            } catch (error) {
                  console.log(error);
            }
      },
};
