module.exports = (sequelize, dataTypes) => {
      let alias = "UserDetail";
      let cols = {
            idUserDetail: {
                  type: dataTypes.INTEGER(11).UNSIGNED,
                  primaryKey: true,
                  allowNull: false,
                  autoIncrement: true,
            },
            firstName: {
                  type: dataTypes.STRING(80),
            },
            lastName: {
                  type: dataTypes.STRING(80),
            },
            avatar: {
                  type: dataTypes.STRING(100),
            },
            phone: {
                  type: dataTypes.STRING(20), //decimal?
            },
            address: {
                  type: dataTypes.STRING(100),
            },
            postalCode: {
                  type: dataTypes.STRING(15), //decimal?
            },
            province: {
                  type: dataTypes.STRING(50),
            },
            city: {
                  type: dataTypes.STRING(50),
            },
            idUser: {
                  type: dataTypes.INTEGER(11),
                  allowNull: false,
            },
      };
      let config = {
            tableName: "usersdetail",
            timestamps: false,
      };
      const USERDETAIL = sequelize.define(alias, cols, config);
      USERDETAIL.associate = (models) => {
            USERDETAIL.belongsTo(models.User, {
                  as: "user",
                  foreignKey: "idUser",
            });
      };
      return USERDETAIL;
};
