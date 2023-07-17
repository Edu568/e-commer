let qs = (elemento) => {
    return document.querySelector(elemento);
};
window.addEventListener("load", () => {
    let $inputName = qs("#name"),
          $nameErrors = qs("#nameErrors"),
          $price = qs("#price"),
          $priceErrors = qs("#priceErrors"),
          $discount = qs("#discount"),
          $discountErrors = qs("#discountErrors"),
          $description = qs("#description"),
          $descriptionErrors = qs("#descriptionErrors"),
          $category = qs("#category"),
          $categoryErrors = qs("#categoryErrors"),
          $subcategory = qs("#subcategory"),
          $subcategoryErrors = qs("#subcategoryErrors"),
          $sold = qs("#sold"),
          $soldErrors = qs("#soldErrors"),
          $stock = qs("#stock"),
          $stockErrors = qs("#stockErrors"),
          $form = qs("#form"),
          $file = qs("#image"),
          $fileErrors = qs("#fileErrors");
          $imgPreview = qs("#img-preview");
    (regExName = /^[a-zA-Z\sñáéíóúü ]{2,30}$/),
          (regExDecimal = /^\d+(\.\d+)?$/),
          (regExEntero = /^-?\d+$/);

    $inputName.addEventListener("blur", () => {
          switch (true) {
                case !$inputName.value.trim():
                      $nameErrors.innerText = "El campo nombre es obligatorio";
                      $inputName.classList.add("is-invalid");
                      break;
                /* case !regExName.test($inputName.value):
                      $nameErrors.innerText = "Nombre invalido";
                      $inputName.classList.add("is-invalid");
                      break; */
                default:
                      $inputName.classList.remove("is-invalid");
                      $inputName.classList.add("is-valid");
                      $nameErrors.innerText = "";
                      break;
          }
    });
    $price.addEventListener("blur", () => {
          switch (true) {
                case !$price.value :
                      $priceErrors.innerText = "El campo precio es obligatorio";
                      $price.classList.add("is-invalid");
                      break;
                      case !regExDecimal.test($price.value):
                      $priceErrors.innerText = "Precio invalido";
                      $price.classList.add("is-invalid");
                      break;
                default:
                      $price.classList.remove("is-invalid");
                      $price.classList.add("is-valid");
                      $priceErrors.innerText = "";
                      break;
          }
    });
    $discount.addEventListener("blur", () => {          
          switch (true) {
                
                case isNaN($discount.value):
                      $discountErrors.innerText = 'Debe ingresar un número válido.';
                      $discount.classList.add("is-invalid");
                      break;
                case $discount.value < 0:
                      $discountErrors.innerText = 'El campo Descuento no valido, debe ser entre 0-75';
                      $discount.classList.add("is-invalid");
                      break;
                case $discount.value > 75:
                      $discountErrors.innerText =  'El campo Descuento no valido, debe ser entre 0-75';
                      $discount.classList.add("is-invalid");
                      break;
                case !regExEntero.test($discount.value):
                      $discountErrors.innerText = 'El valor debe ser un número entero.';
                      $discount.classList.add("is-invalid");
                      break;
                case !$discount.value :
                      $discountErrors.innerText = "El campo descuento es obligatorio";
                      $discount.classList.add("is-invalid");
                      break;

                default:
                      $discount.classList.remove("is-invalid");
                      $discount.classList.add("is-valid");
                      $discountErrors.innerText = "";
                      break;
          }
    });
    $description.addEventListener("blur", () => {
          switch (true) {
                case !$description.value :
                      $descriptionErrors.innerText = "El campo descripcion es obligatorio";
                      $description.classList.add("is-invalid");
                      break;
                case $description.value.length  <= 20:
                      $descriptionErrors.innerText = 'El campo debe tener no más de 20 caracteres.';
                      $description.classList.add("is-invalid");
                      break;
                default:
                      $description.classList.remove("is-invalid");
                      $description.classList.add("is-valid");
                      $descriptionErrors.innerText = "";
                      break;
          }
    });
    $category.addEventListener("blur", () => {
          switch (true) {
                case !$category.value :
                      $categoryErrors.innerText = "El campo categoria es obligatorio";
                      $category.classList.add("is-invalid");
                      break;
                default:
                      $category.classList.remove("is-invalid");
                      $category.classList.add("is-valid");
                      $categoryErrors.innerText = "";
                      break;
          }
    });
    $subcategory.addEventListener("blur", () => {
          switch (true) {
                case !$subcategory.value :
                      $subcategoryErrors.innerText = "El campo subcategoria es obligatorio";
                      $subcategory.classList.add("is-invalid");
                      break;
                default:
                      $subcategory.classList.remove("is-invalid");
                      $subcategory.classList.add("is-valid");
                      $subcategoryErrors.innerText = "";
                      break;
          }
    });
    $sold.addEventListener("blur", () => {
          switch (true) {
                case !$sold.value :
                      $soldErrors.innerText = "El campo ventas es obligatorio";
                      $sold.classList.add("is-invalid");
                      break;
                case  !regExEntero.test($sold.value):
                      $soldErrors.innerText = "El campo ventas debe ser un numero positivo";
                      $sold.classList.add("is-invalid");
                      break;
                case  $sold.value < 0:
                      $soldErrors.innerText = "El campo ventas debe ser un numero positivo";
                      $sold.classList.add("is-invalid");
                      break;
                default:
                      $sold.classList.remove("is-invalid");
                      $sold.classList.add("is-valid");
                      $soldErrors.innerText = "";
                      break;
          }
    });
    $stock.addEventListener("blur", () => {
          switch (true) {
                case !$stock.value :
                      $stockErrors.innerText = "El campo stock es obligatorio";
                      $stock.classList.add("is-invalid");
                      break;
                case  !regExEntero.test($stock.value):
                      $stockErrors.innerText = "El campo stock debe ser un numero positivo";
                      $stock.classList.add("is-invalid");
                      break;
                case  $stock.value < 1:
                      $stockErrors.innerText = "El campo stock debe ser un numero positivo";
                      $stock.classList.add("is-invalid");
                      break;
                default:
                      $stock.classList.remove("is-invalid");
                      $stock.classList.add("is-valid");
                      $stockErrors.innerText = "";
                      break;
          }
    });
    $file.addEventListener("change", () => {
          let filePath = $file.value, //Capturo el valor del input
                allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i; //Extensiones permitidas
          if (!allowefExtensions.exec(filePath)) {
                //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
                $fileErrors.innerHTML = "Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif -.web)";
                $file.value = "";
                $imgPreview.innerHTML = "";
                return false;
          } else {
                // Image preview
                console.log($file.files);
                if ($file.files && $file.files[0]) {
                      let reader = new FileReader();
                      reader.onload = function (e) {
                            $imgPreview.innerHTML = '<img class="img-product" src="' + e.target.result + '"/>';
                      };
                      reader.readAsDataURL($file.files[0]);
                      $fileErrors.innerHTML = "";
                      $file.classList.remove("is-invalid");
                }
          }
    });
    $form.addEventListener("submit", (event) => {
          event.preventDefault();
          const FORM_ELEMENTS = event.target.elements;

          for (let index = 0; index < FORM_ELEMENTS.length - 1; index++) {
                const element = FORM_ELEMENTS[index];
                if (element.value === "" && element.type !== "file") {
                      element.classList.add("is-invalid");
                      element.dispatchEvent(new Event("blur"));
                }
          }


          let elementosConErrores = document.querySelectorAll(".is-invalid");
          let errores = elementosConErrores.length > 0;

          if (errores) {
                submitErrors.innerText = "Hay errores en el formulario";
          } else {
                $form.submit();
          }
    });
});
