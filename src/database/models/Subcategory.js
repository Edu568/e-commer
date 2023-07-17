module.exports = (sequelize, dataTypes) => {
      const alias = "Subcategory";

      const cols = {
            idSubCategory: {
                  type: dataTypes.INTEGER(11),
                  allowNull: false,
                  autoIncrement: true,
                  primaryKey: true,
            },
            name: {
                  type: dataTypes.STRING(45),
                  allowNull: false,
            },
            idCategory:{
                  type:dataTypes.INTEGER(11),
                  allowNull:false,
            }
      };

      const config = {
            tableName: "subcategorys",
            timestamps: false,
      };

      const SUBCATEGORY = sequelize.define(alias, cols, config);

      SUBCATEGORY.associate = (models) => {
            SUBCATEGORY.hasMany(models.Product, {
                  as: "products",
                  foreignKey: "idSubCategory",
            });

            SUBCATEGORY.belongsTo(models.Category, {
                  as: "category",
                  foreignKey: "idCategory",
            });
      };

      return SUBCATEGORY;
};
