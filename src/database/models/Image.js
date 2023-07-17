module.exports = (sequelize, dataTypes) => {
      const alias = "Image";

      const cols = {
            idImage: {
                  type: dataTypes.INTEGER(11).UNSIGNED,
                  primaryKey: true,
                  allowNull: false,
                  autoIncrement: true,
            },
            name: {
                  type: dataTypes.STRING(100),
                  allowNull: false,
            },
            idProduct: {
                  type: dataTypes.INTEGER(11).UNSIGNED,
                  allowNull: false,
            },
      };

      const config = {
            tableName: "images",
            timestamps: false,
      };

      const IMAGE = sequelize.define(alias, cols, config);

      IMAGE.associate = (models) => {
            IMAGE.belongsTo(models.Product, {
                  as: "product",
                  foreignKey: "idProduct",
            });
      };

      return IMAGE;
};
