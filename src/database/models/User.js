module.exports = (sequelize, dataTypes) => {
      let alias = "User";
      let cols = {
            idUser: {
                  type: dataTypes.INTEGER(11).UNSIGNED,
                  primaryKey: true,
                  allowNull: false,
                  autoIncrement: true,
            },
            email: {
                  type: dataTypes.STRING(80),
                  allowNull: false,
            },
            password: {
                  type: dataTypes.STRING(80),
                  allowNull: false,
            },
            typeOfAccess: {
                  type: dataTypes.STRING(15),
                  allowNull: false,
            },
      };
      let config = {
            tableName: "users",
            timestamps: false,
      };
      const USER = sequelize.define(alias, cols, config);
      USER.associate = (models) => {
            USER.belongsTo(models.UserDetail, {
                  as: "userdetail",
                  foreignKey: "idUser",
            });
      };
      return USER;
};
