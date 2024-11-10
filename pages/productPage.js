module.exports = {
  elements: {
    productName:
      "#inventory_item_container > div > div > div.inventory_details_desc_container > div.inventory_details_name.large_size",
    productPrice:
      "#inventory_item_container > div > div > div.inventory_details_desc_container > div.inventory_details_price",
    addToCartBtn: "#add-to-cart",
    inCartNumber: "#shopping_cart_container > a > span",
    cartBtn: "#shopping_cart_container > a",
  },
  commands: {
    getPrice(callback) {
      return this.getText("@productPrice", (result) => {
        if (callback) {
          callback(parseFloat(result.value.replace("$", "")));
        }
      });
    },
    getName(callback) {
      return this.getText("@productName", (result) => {
        if (callback) {
          callback(result.value);
        }
      });
    },
    addToCart() {
      return this.click("@addToCartBtn");
    },
    getInCartItemsNumber(callback) {
      return this.getText("@inCartNumber", (result) => {
        if (callback) {
          callback(result.value);
        }
      });
    },
    goToCart() {
      return this.click("@cartBtn");
    },
  },
};
