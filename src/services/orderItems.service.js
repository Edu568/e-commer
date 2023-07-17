const { OrderItem } = require("../database/models");

const getOrdersItems = async () => {
      try {
            return await OrderItem.findAll();
      } catch (error) {
            console.error("Error while fetching order item:", error);
            throw new Error("Error fetching order item");
      }
};

const getOrderItemById = async (id) => {
      try {
            return await OrderItem.findByPk(id, {
                  include: [{ association: "order" }],
            });
      } catch (error) {
            console.error("Error while fetching order item:", error);
            throw new Error("Error fetching order item");
      }
};

const getOrderItemsByOrder = async (idOrder) => {
      try {
            return await OrderItem.findAll({
                  where: {
                        idOrder,
                  },
                  include: [{ association: "products" }],
            });
      } catch (error) {
            console.error("Error while fetching order item:", error);
            throw new Error("Error fetching order item");
      }
};

const getOrderItemsByProduct = async (idProduct) => {
      try {
            return await OrderItem.findOne({
                  where: {
                        idProduct,
                  },
                  include: [{ association: "products" }],
            });
      } catch (error) {
            console.error("Error while fetching order item:", error);
            throw new Error("Error fetching order item");
      }
};

const insertOrderItem = async (data) => {
      try {
            return await OrderItem.create(data);
      } catch (error) {
            console.error("Error while fetching order item:", error);
            throw new Error("Error fetching order item");
      }
};

const updateOrderItem = async (data, idOrderItem) => {
      try {
            return await OrderItem.update(data, {
                  where: {
                        idOrderItem,
                  },
            });
      } catch (error) {
            console.error("Error while fetching order item:", error);
            throw new Error("Error fetching order item");
      }
};

const deleteOrderItem = async (idOrderItem) => {
      try {
            return await OrderItem.destroy({
                  where: {
                        idOrderItem,
                  },
            });
      } catch (error) {
            console.error("Error while fetching order item:", error);
            throw new Error("Error fetching order item");
      }
};

const bulkDeleteOrderItems = async (idOrder) => {
      try {
            return await OrderItem.destroy({
                  where: {
                        idOrder,
                  },
            });
      } catch (error) {
            console.error("Error while deleting order items:", error);
            throw new Error("Error deleting order items");
      }
};

module.exports = {
      getOrdersItems,
      getOrderItemById,
      getOrderItemsByOrder,
      getOrderItemsByProduct,
      insertOrderItem,
      updateOrderItem,
      deleteOrderItem,
      bulkDeleteOrderItems,
};
