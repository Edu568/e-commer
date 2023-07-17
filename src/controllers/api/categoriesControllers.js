const { Category } = require("../../database/models");
module.exports = {
      index: async (req, res) => {
            try {
                  const RESULT = await Category.findAll({});
                  return res.status(201).json({
                        meta: {
                              status: 201,
                              url: "api/v1/categories/list",
                              msg: "Listado de Categorias",
                        },
                        data: RESULT,
                  });
            } catch (error) {
                  console.error(error);
            }
      },
      store: async (req, res) => {
            try {
                  const RESULT = await Category.create({
                        name: req.body.name,
                  });
                  return res.status(201).json({
                        meta: {
                              status: 201,
                              url: "api/v1/categories/create",
                              msg: "Categoria Agregada",
                        },
                        data: RESULT,
                  });
            } catch (error) {
                  console.log(error);
            }
      },
      update: async (req, res) => {
            try {
                  const RESULT = await Category.update(
                        {
                              name: req.body.name,
                        },
                        { where: { idCategory: req.params.id } }
                  );
                  if (RESULT === 1) {
                        RESPONSE = {
                              meta: {
                                    status: 201,
                                    url: "api/v1/categories/update/:id",
                                    msg: "Categoria Modificada",
                              },
                              data: RESULT,
                        };
                  } else {
                        RESPONSE = {
                              meta: {
                                    status: 201,
                                    url: "api/v1/subcategories/delete/:id",
                                    msg: "Categoria No encontrada",
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
                  const RESULT = await Category.destroy({
                        where: { idCategory: req.params.id },
                  });
                  if (RESULT === 1) {
                        RESPONSE = {
                              meta: {
                                    status: 201,
                                    url: "api/v1/categories/delete/:id",
                                    msg: "Categoria Eliminada",
                              },
                        };
                  } else {
                        RESPONSE = {
                              meta: {
                                    status: 201,
                                    url: "api/v1/categories/delete/:id",
                                    msg: "Categoria No encontrada",
                              },
                        };
                  }
                  return res.status(201).json(RESPONSE);
            } catch (error) {
                  console.log(error);
            }
      },
};
