module.exports = (sequelize, dataTypes) => {
      const alias = "Category";

      const cols = {
            idCategory: {
                  type: dataTypes.INTEGER(11).UNSIGNED,
                  primaryKey: true,
                  allowNull: false,
                  autoIncrement: true,
            },
            name: {
                  type: dataTypes.STRING(100),
                  allowNull: false,
            },
      };

      const config = {
            tableName: "categorys",
            timestamps: false,
      };

      const CATEGORY = sequelize.define(alias, cols, config);

      CATEGORY.associate = (models) => {
            CATEGORY.hasMany(models.Subcategory, {
                  as: "subcategories",
                  foreignKey: "idCategory",
            });
      };

      return CATEGORY;
};
