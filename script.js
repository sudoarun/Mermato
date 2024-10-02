document.querySelectorAll(".btn-group .btn").forEach((button) => {
  button.addEventListener("click", function () {
    document.querySelector(".btn-group .active").classList.remove("active");
    this.classList.add("active");
  });
});

let products; // this variable will save all the data of api

const showProducts = (category) => {
  const productContainer = document.getElementById("product-group");
  productContainer.innerHTML = ""; // Clear previous products

  const selectedCategory = products.find(
    (cat) => cat?.category_name?.toLowerCase() === category
  );

  if (selectedCategory && selectedCategory?.category_products) {
    selectedCategory?.category_products?.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      let discount = product?.compare_at_price - product?.price;
      let discountedPercent = (
        (discount / product?.compare_at_price) *
        100
      ).toFixed(2); // get discounted percentage

      // this will render all the products inside product-group div with a div class of product-card
      productCard.innerHTML = `
              <img
              src="${product?.image}"
              class="rounded-1 img-poster"
              height="200"
              style="width: 100%"
            />
            <div class="footer-product">
              <h3 class="my-2 heading-product">${product?.title}<span>•</span>${product?.vendor}</h3>
              <h6 class="my-3 product-price">
                <span>Rs ${product?.price}.00</span> <strike>${product?.compare_at_price}</strike><span>${discountedPercent}% Off</span>
              </h6>
              <button class="w-100 cartBtn">Add to Cart</button>
            </div>
                    `;
      productContainer?.appendChild(productCard);
    });
  }
};
const getProducts = () => {
  fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  )
    .then((response) => response.json())
    .then((data) => {
      products = data?.categories; // Store category data
      showProducts("men"); // Show Men's products by default
    })
    .catch((error) => console.error("Error fetching products:", error));
};

getProducts();
