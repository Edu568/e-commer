const { deleteOrder, getOrderById, getOrderByUser, getOrders, insertOrder, updateOrder } = require("../../services/order.service");
const { deleteOrderItem, getOrderItemById, getOrderItemsByOrder, getOrderItemsByProduct, insertOrderItem, updateOrderItem, bulkDeleteOrderItems } = require("../../services/orderItems.service");
module.exports = {
      addToOrder: async (req, res) => {
            try {
                  // id usuario
                  // id producto + quantity
                  const { idProduct, quantity, idUser } = req.body;
                  const order = await getOrderByUser(idUser);

                  // Verificar si existe una orden para el usuario
                  if (order) {
                        let dataItem;
                        // Si existe una orden, agregar el item
                        // id orden
                        const idOrder = order.idOrder;
                        const item = await getOrderItemsByProduct(idProduct);
                        if (item) {
                              dataItem = {
                                    idOrder,
                                    idProduct,
                                    quantity: item.quantity + quantity,
                              };
                              const updateOrderItemFetch = await updateOrderItem(dataItem, item.idOrderItem);
                              return res.status(200).json("Producto incrementado correctamenete");
                        } else {
                              dataItem = {
                                    idOrder,
                                    idProduct,
                                    quantity,
                              };
                              const createOrderItem = await insertOrderItem(dataItem);
                              return res.status(201).json("Producto agregado correctamenete");
                        }
                  } else {
                        // Si No existe una orden, crear la orden y agregar el item
                        const data = {
                              idUser,
                              state: "PENDING",
                        };
                        const createOrder = await insertOrder(data);
                        if (createOrder) {
                              let dataItem = {
                                    idOrder: createOrder.idOrder,
                                    idProduct,
                                    quantity,
                              };
                              const createOrderItem = await insertOrderItem(dataItem);
                              return res.status(201).json("Orden creada e item agregado correctamenete");
                        }
                        return res.status(400).json(`El usuario con el ID: ${idUser} no tiene ordenes creada`);
                  }
            } catch (error) {
                  return res.status(500).json({ Error: `Error del Servidor ${error}` });
            }
      },
      removeOneItemFromOrder: async (req, res) => {
            try {
                  // id item
                  const idItem = req.params.idOrderItem;

                  const item = await getOrderItemById(idItem);
                  //return res.json(item);
                  if (!item) return res.status(400).json(`El item ${idItem} no existe`);
                  if (req.body.idUser == item.order.idUser) {
                        if (item.quantity > 1) {
                              // Si el item en el campo quatity tiene mas de 1, actualizo la cantidad (-1)
                              const updatedItem = {
                                    ...item,
                                    quantity: item.quantity - 1,
                              };
                              const updateItemResult = await updateOrderItem(updatedItem, idItem);
                              return updateItemResult ? res.status(200).json("Item actualizado correctamente") : res.status(400).json("Hubo un problema al actualizar el item");
                        }
                        if (item.quantity === 1) {
                              // Si el item en el campo quantity tiene 1, elimino el item
                              const itemDeleteResult = await deleteOrderItem(idItem);
                              const itemsOrder = await getOrderItemsByOrder(item.idOrder);
                              const orderHaveMoreItems = itemsOrder.length > 0;
                              if (!orderHaveMoreItems) {
                                    // si la orden no tiene mas items asignados, elimino la orden
                                    const orderDeleteResult = await deleteOrder(item.idOrder);
                                    return itemDeleteResult && orderDeleteResult
                                          ? res.status(200).json("Item y orden eliminados correctamente")
                                          : res.status(400).json("Hubo un problema al eliminar el item o la orden");
                              }
                              return itemDeleteResult ? res.status(200).json("Item eliminado correctamente") : res.status(400).json("Hubo un problema al eliminar el item");
                        }
                  }
                  res.status(400).json("Esta orden pertence a otro usuario");
            } catch (error) {
                  return res.status(500).json({ Error: `Error del Servidor ${error}` });
            }
      },
      removeAllFromOrder: async (req, res) => {
            try {
                  // id item
                  const idItem = req.params.idOrderItem;
                  const item = await getOrderItemById(idItem);
                  if (!item) return res.status(400).json(`El item ${idItem} no existe`);
                  if (req.body.idUser == item.order.idUser) {
                        const itemsOrder = await getOrderItemsByOrder(item.idOrder);
                        const itemDeleteResult = await deleteOrderItem(idItem);
                        if (itemsOrder.length > 1) {
                              // Si la orden tiene mas de 1 item, elimino el item\
                              return itemDeleteResult ? res.status(200).json("Item eliminado correctamente") : res.status(400).json("Hubo un problema al querer eliminar el item");
                        } else {
                              // Si la orden tiene 1 item, elimino el item, elimino la orden
                              const orderDeleteResult = await deleteOrder(item.idOrder);
                              return itemDeleteResult && orderDeleteResult
                                    ? res.status(200).json("Item y orden eliminados correctamente")
                                    : res.status(400).json("Hubo un problema al querer eliminar el item o la orden");
                        }
                  }
                  res.status(400).json("Esta orden pertence a otro usuario");
            } catch (error) {
                  return res.status(500).json({ Error: `Error del Servidor ${error}` });
            }
      },
};
