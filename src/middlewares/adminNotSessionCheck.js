module.exports = (req, res, next) => {
      if (!req.session.user) return res.redirect("/users/login");
      if (req.session.user.typeOfAccess !== "admin") return res.redirect("/");
      next();
};
