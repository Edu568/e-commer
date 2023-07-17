const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { User, UserDetail, Sequelize } = require("../database/models");
const { Op } = Sequelize;
const fs = require("fs");
module.exports = {
      list: async (req, res) => {
            try {
                  const RESULT = await User.findAll({});
                  return res.status(201).json({
                        meta: {
                              status: 201,
                              url: "api/v1/users/list",
                              msg: "Listado de Usuarios",
                        },
                        data: RESULT,
                  });
            } catch (error) {
                  console.error(error);
            }
      },
      /*  store: (req, res) => {
            const errors = validationResult(req);

            if (errors.isEmpty()) {
                  User.create({
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.pass, 12),
                        typeOfAccess: "user",
                  }).then((user) => {
                        UserDetail.create({
                              firstName: req.body.nombre,
                              lastName: req.body.apellido,
                              avatar: req.file ? req.file.filename : "default-image.png",
                              idUser: user.idUser,
                        }).then(() => {
                              return res.redirect("/usuarios/login");
                        });
                  });
            } else {
                  if (req.file) {
                        fs.existsSync(`${req.file.destination}/${req.file.filename}`) && fs.unlinkSync(`${req.file.destination}/${req.file.filename}`);
                  }
                  res.render("users/registro", {
                        errors: errors.mapped(),
                        old: req.body,
                        session: req.session,
                  });
            }
      },
      profileUpdate: (req, res) => {
            const errors = validationResult(req);

            if (errors.isEmpty()) {
                  const { firstName, lastName, tel, address, postal_code, province, city, email } = req.body;

                  UserDetail.update(
                        {
                              firstName: firstName,
                              lastName: lastName,
                              phone: tel,
                              address: address,
                              postalCode: postal_code,
                              province: province,
                              city: city,
                        },
                        {
                              where: { idUser: req.session.user.id },
                        }
                  )
                        .then((response) => {
                              if (response) {
                                    if (req.file) {
                                          UserDetail.findOne({
                                                where: { idUser: req.session.user.id },
                                          }).then((user) => {
                                                const MATCH = fs.existsSync("./public/img/avatar/", user.avatar);
                                                if (MATCH) {
                                                      try {
                                                            fs.unlinkSync(`./public/img/avatar/${user.avatar}`);
                                                      } catch (error) {
                                                            throw new Error(error);
                                                      }
                                                } else {
                                                      console.log("No se encontró el archivo");
                                                }
                                                UserDetail.update(
                                                      {
                                                            avatar: req.file.filename,
                                                      },
                                                      {
                                                            where: { idUser: req.session.user.id },
                                                      }
                                                );
                                          });
                                    }
                                    User.findByPk(req.session.user.id, {
                                          include: [{ association: "userdetail" }],
                                    }).then((user) => {
                                          req.session.user = {
                                                id: user.idUser,
                                                name: user.userdetail.firstName,
                                                avatar: user.userdetail.avatar,
                                                typeOfAccess: user.typeOfAccess,
                                          };
                                          res.locals.user = req.session.user;
                                          return res.render("users/userProfile", {
                                                session: req.session,
                                                user,
                                          });
                                    });
                              } else {
                                    throw new Error("Mensaje de error");
                              }
                        })
                        .catch((error) => console.log(error));
            } else {
                  User.findByPk(req.session.user.id, {
                        include: [{ association: "userdetail" }],
                  }).then((user) => {
                        return res.render("users/userProfileEdit", {
                              session: req.session,
                              user,
                              errors: errors.mapped(),
                        });
                  });
            }
      }, */
};
