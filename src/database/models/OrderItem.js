module.exports = (sequelize, dataTypes) => {
      const alias = "OrderItem";

      const cols = {
            idOrderItem: {
                  type: dataTypes.INTEGER(11),
                  allowNull: false,
                  autoIncrement: true,
                  primaryKey: true,
            },
            idOrder: {
                  type: dataTypes.INTEGER(11),
                  allowNull: false,
            },
            idProduct: {
                  type: dataTypes.INTEGER(11),
                  allowNull: false,
            },
            quantity: {
                  type: dataTypes.INTEGER(11),
                  allowNull: false,
            },
      };

      const config = {
            tableName: "orderitems",
            createdAt: "created_at",
            updatedAt: "updated_at",
      };

      const ORDER_ITEM = sequelize.define(alias, cols, config);

      ORDER_ITEM.associate = (models) => {
            ORDER_ITEM.belongsTo(models.Product, {
                  as: "products",
                  foreignKey: "idProduct",
            });

            ORDER_ITEM.belongsTo(models.Order, {
                  as: "order",
                  foreignKey: "idOrder",
            });
      };

      return ORDER_ITEM;
};
