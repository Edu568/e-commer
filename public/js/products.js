window.addEventListener("load", () => {
      let selectCategory = document.querySelector("#category");
      let selectSubcategory = document.querySelector("#subcategory");

      selectCategory.addEventListener("change", async (event) => {
            let categoryId = event.target.value;

            try {
                  const response = await fetch(`http://localhost:3060/api/v1/subCategories/category/${categoryId}`);
                  const { data } = await response.json();
                  selectSubcategory.innerHTML = "";

                  const obtenerOption = (subCategory) => {
                        return `<option value='${subCategory.idSubCategory}'>${subCategory.name}</option>`;
                  };

                  data.forEach((subCategory) => {
                        selectSubcategory.innerHTML += obtenerOption(subCategory);
                  });
            } catch (error) {
                  console.log(error);
            }
      });
      selectCategory.dispatchEvent(new Event("change"));
});
