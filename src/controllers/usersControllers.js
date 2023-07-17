const { validationResult } = require("express-validator");
const { readJSON, writeJSON } = require("../database");
const dbUsers = readJSON("users.json");
const bcrypt = require("bcryptjs");
const { User, UserDetail, Sequelize } = require("../database/models");
const { Op } = Sequelize;
const fs = require("fs");
const fetch = require("node-fetch");
module.exports = {
      users: (req, res) => {
            User.findAll({
                  include: [{ association: "userdetail" }],
            }).then((users) => {
                  return res.render("admin/adminusers", { users, session: req.session });
            });
      },
      updateAdmin: (req, res) => {
            res.send("En construccion");
      },
      login: (req, res) => {
            return res.render("users/login", { session: req.session });
      },
      storeLogin: (req, res) => {
            let errors = validationResult(req);
            if (errors.isEmpty()) {
                  User.findOne({
                        where: {
                              email: req.body.email,
                        },
                        include: [{ association: "userdetail" }],
                  }).then((user) => {
                        req.session.user = {
                              id: user.idUser,
                              name: user.userdetail.firstName,
                              avatar: user.userdetail.avatar,
                              typeOfAccess: user.typeOfAccess,
                        };
                        /* Se le asigna la session a local para que lo pueda ver des las vistas ejs */
                        res.locals.user = req.session.user;

                        if (req.body.recordar) {
                              //*********Guarar Cookie con tiempo de expiracion 1 hora************
                              let duracionSesion = new Date(Date.now() + 90000);
                              res.cookie("user", req.session.user, { expires: duracionSesion, httpOnly: true });
                        }

                        res.redirect("/");
                  });
            } else {
                  return res.render("users/login", {
                        errors: errors.mapped(),
                        old: req.body,
                        session: req.session,
                  });
            }
      },
      logout: (req, res) => {
            req.session.destroy();
            if (req.cookies.user) {
                  //Elimina la cookies poniendo tiempo de expiracion -1
                  res.cookie("user", "", { maxAge: -1 });
            }
            return res.redirect("/");
      },
      register: (req, res) => {
            return res.render("users/registro", { session: req.session });
      },
      store: (req, res) => {
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
                              return res.redirect("/users/login");
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
      profile: (req, res) => {
            User.findByPk(req.session.user.id, {
                  include: [{ association: "userdetail" }],
            }).then((user) => {
                  return res.render("users/userProfile", {
                        session: req.session,
                        user,
                  });
            });
            //let user = dbUsers.find((user) => user.id === req.session.user.id);
      },
      profileEdit: async (req, res) => {
            const user = await User.findByPk(req.session.user.id, {
                  include: [{ association: "userdetail" }],
            });
            const data = await fetch("https://apis.datos.gob.ar/georef/api/provincias?campos=nombre,id").then((response) => response.json());

            return res.render("users/userProfileEdit", {
                  session: req.session,
                  provinces: data.provincias,
                  user,
            });

            //let user = dbUsers.find((user) => user.id === req.session.user.id);
      },
      profileUpdate: (req, res) => {
            const errors = validationResult(req);

            if (errors.isEmpty()) {
                  //let user = dbUsers.find((user) => user.id === req.session.user.id);

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
                              //avatar: req.file ? req.file.filename : avatar,
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
                  if (req.file) {
                        fs.existsSync(`${req.file.destination}/${req.file.filename}`) && fs.unlinkSync(`${req.file.destination}/${req.file.filename}`);
                  }
                  User.findByPk(req.session.user.id, {
                        include: [{ association: "userdetail" }],
                  }).then((user) => {
                        const users = User.findByPk(req.session.user.id, { include: [{ association: "userdetail" }] });
                        const datas = fetch("https://apis.datos.gob.ar/georef/api/provincias?campos=nombre,id").then((response) => response.json());

                        Promise.all([users, datas]).then(([user, data]) => {
                              return res.render("users/userProfileEdit", {
                                    session: req.session,
                                    user,
                                    provinces: data.provincias,
                                    old: req.body,
                                    errors: errors.mapped(),
                              });
                        });
                  });
                  //                  let user = dbUsers.find((user) => user.id === req.session.user.id);
            }
      },
      destroy: (req, res) => {
            const ID_USER = req.params.id;
            User.findByPk(ID_USER, {
                  include: [{ association: "userdetail" }],
            }).then((user) => {
                  if (user) {
                        if (user.userdetail.avatar != "default-image.png") {
                              const MATCH = fs.existsSync(`./public/img/avatar/`, user.userdetail.avatar);
                              if (MATCH) {
                                    try {
                                          fs.unlinkSync(`./public/img/avatar/${user.userdetail.avatar}`);
                                    } catch (error) {
                                          throw new Error(error);
                                    }
                              }
                        }
                  } else {
                        console.log("No se encontró el archivo");
                  }
                  UserDetail.destroy({
                        where: {
                              idUser: ID_USER,
                        },
                  });
                  User.destroy({
                        where: {
                              idUser: ID_USER,
                        },
                  })
                        .then(() => {
                              return res.redirect("/admin/users");
                        })
                        .catch((error) => console.log(error));
            });
      },
};
