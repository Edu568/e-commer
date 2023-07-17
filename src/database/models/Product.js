module.exports = (sequelize, dataTypes) => {
      const alias = "Product";

      const cols = {
            idProduct: {
                  type: dataTypes.INTEGER(10).UNSIGNED,
                  primaryKey: true,
                  allowNull: false,
                  autoIncrement: true,
            },
            name: {
                  type: dataTypes.STRING(150),
                  allowNull: false,
            },
            description: {
                  type: dataTypes.TEXT,
                  allowNull: false,
            },
            price: {
                  type: dataTypes.DECIMAL(8, 2),
                  allowNull: false,
            },
            discount: {
                  type: dataTypes.INTEGER(11).UNSIGNED,
                  allowNull: false,
            },
            sold: {
                  type: dataTypes.INTEGER(11).UNSIGNED,
                  allowNull: false,
            },
            stock: {
                  type: dataTypes.INTEGER(11).UNSIGNED,
                  allowNull: false,
            },
            idSubCategory: {
                  type: dataTypes.INTEGER(11).UNSIGNED,
                  allowNull: false,
            },
      };

      const config = {
            tableName: "products",
            timestamps: false,
      };

      const PRODUCT = sequelize.define(alias, cols, config);

      PRODUCT.associate = (models) => {
            PRODUCT.belongsTo(models.Subcategory, {
                  as: "subcategory",
                  foreignKey: "idSubCategory",
            });

            PRODUCT.belongsTo(models.Image, {
                  as: "images",
                  foreignKey: "idProduct",
            });

            /*  PRODUCT.belongsTo(models.OrderItem, {
            as: "orderItem",
            foreignKey: "productId"
        }); */
      };

      return PRODUCT;
};
