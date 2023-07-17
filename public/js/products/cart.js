window.addEventListener("load", () => {
      let $quantity = document.querySelectorAll("#quantity");
      let $add = document.querySelectorAll("#add");
      let $remove = document.querySelectorAll("#remove");
      let $deleteOrder = document.querySelectorAll("#deleteOrder");
      let $price = document.querySelectorAll("#price");
      let $priceTotal = document.querySelectorAll("#price-total");
      let $idProduct = document.querySelectorAll("#idProduct");
      let $idOrderItem = document.querySelectorAll("#idOrderItem");
      let $shoppingCartContainer = document.querySelectorAll("#shoppingCartContainer");
      let $idUser = document.querySelector("#idUser");
      let $totalOrder = document.querySelector("#totalOrder");

      const idUser = $idUser.getAttribute("value");
      function total(index) {
            $priceTotal[index].innerText = (Number($price[index].innerText) * $quantity[index].value).toFixed(2);
            $totalOrder.innerText = (Number($totalOrder.innerText) + Number($priceTotal[index].innerText)).toFixed(2);
      }
      function sumarTotal() {
            $totalOrder.innerText = 0;
            for (let index = 0; index < $add.length; index++) {
                  total(index);
            }
      }
      const sendAdd = async (quantity, index) => {
            const data = {
                  idProduct: $idProduct[index].getAttribute("value"),
                  quantity,
                  idUser,
            };
            try {
                  const response = await fetch("http://localhost:3003/api/v1/order/add", {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                  });
                  const responseData = await response.json();
                  console.log("Respuesta de la API:", responseData);
                  // Aquí puedes trabajar con la respuesta de la API
            } catch (error) {
                  alert("error");
                  console.error("Error al enviar la solicitud:", error);
            }
      };

      const sendRemoveItem = async (idOrderItem) => {
            try {
                  const data = {
                        idUser,
                  };
                  const response = await fetch(`http://localhost:3003/api/v1/order/remove/${idOrderItem} `, {
                        method: "PUT",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                  });
                  const responseData = await response.json();
                  console.log("Respuesta de la API:", responseData);
                  // Aquí puedes trabajar con la respuesta de la API
            } catch (error) {
                  alert("error");
                  console.error("Error al enviar la solicitud:", error);
            }
      };
      const sendRemoveOrder = async (idOrderItem) => {
            try {
                  const data = {
                        idUser,
                  };
                  const response = await fetch(`http://localhost:3003/api/v1/order/remove/${idOrderItem} `, {
                        method: "DELETE",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                  });
                  const responseData = await response.json();
                  console.log("Respuesta de la API:", responseData);
                  // Aquí puedes trabajar con la respuesta de la API
            } catch (error) {
                  alert("error");
                  console.error("Error al enviar la solicitud:", error);
            }
      };

      Array.from($add).forEach((element, index) => {
            element.addEventListener("click", async () => {
                  $quantity[index].value = Number($quantity[index].value) + 1;
                  total(index);
                  sendAdd(1, index);
                  sumarTotal();
            });
      });
      Array.from($remove).forEach((element, index) => {
            element.addEventListener("click", () => {
                  $quantity[index].value = Number($quantity[index].value) - 1;
                  total(index);
                  sendRemoveItem($idOrderItem[index].getAttribute("value"));
                  if (Number($quantity[index].value) == 0) {
                        $shoppingCartContainer[index].classList.add("notVisible");
                        $shoppingCartContainer[index].classList.remove("shopping-cart-container");
                  }
                  sumarTotal();
            });
      });
      Array.from($deleteOrder).forEach((element, index) => {
            element.addEventListener("click", () => {
                  /*$quantity[index].value = Number($quantity[index].value) - 1;
                  total(index); */
                  sendRemoveOrder($idOrderItem[index].getAttribute("value"));
                  $shoppingCartContainer[index].classList.add("notVisible");
                  $shoppingCartContainer[index].classList.remove("shopping-cart-container");
                  $quantity[index].value = 0;
                  sumarTotal();
            });
      });

      /* for (let index = 0; index < $add.length; index++) {
            total(index);
      } */
      sumarTotal();
});
