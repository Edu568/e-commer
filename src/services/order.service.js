const { Order } = require("../database/models");

const getOrders = async () => {
      return await Order.findAll();
};

const getOrderById = async (idOrder) => {
      return await Order.findByPk(idOrder);
};

const getOrderByUser = (idUser) => {
      return Order.findOne({
            where: {
                  idUser,
            },
            include: [
                  { association: "orderItems", include: [{ association: "products", include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }] }] },
            ],
      });
};

const insertOrder = async (data) => {
      try {
            return await Order.create(data);
      } catch (error) {
            console.error("Error while fetching order :", error);
            throw new Error("Error fetching order ");
      }
};

const updateOrder = async (data, idOrder) => {
      try {
            return await Order.create(data, {
                  where: {
                        idOrder,
                  },
            });
      } catch (error) {
            console.error("Error while fetching order :", error);
            throw new Error("Error fetching order ");
      }
};

const deleteOrder = async (idOrder) => {
      try {
            return await Order.destroy({
                  where: {
                        idOrder,
                  },
            });
      } catch (error) {
            console.error("Error while fetching order :", error);
            throw new Error("Error fetching order ");
      }
};

module.exports = {
      getOrders,
      getOrderById,
      getOrderByUser,
      insertOrder,
      updateOrder,
      deleteOrder,
};
