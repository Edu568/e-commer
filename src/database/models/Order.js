module.exports = (sequelize, dataTypes) => {
      const alias = "Order";

      const cols = {
            idOrder: {
                  type: dataTypes.INTEGER(11),
                  allowNull: false,
                  autoIncrement: true,
                  primaryKey: true,
            },
            idUser: {
                  type: dataTypes.INTEGER(11),
                  allowNull: false,
            },
            state: {
                  type: dataTypes.STRING(100),
                  allowNull: false,
            },
      };

      const config = {
            tableName: "orders",
            createdAt: "created_at",
            updatedAt: "updated_at",
      };

      const ORDER = sequelize.define(alias, cols, config);

      ORDER.associate = (models) => {
            ORDER.belongsTo(models.User, {
                  as: "user",
                  foreignKey: "idUser",
            });

            ORDER.hasMany(models.OrderItem, {
                  as: "orderItems",
                  foreignKey: "idOrder",
            });
      };

      return ORDER;
};
