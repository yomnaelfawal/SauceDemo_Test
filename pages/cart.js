module.exports = {
  url: "https://www.saucedemo.com/cart.html",

  elements: {
    checkOutBtn: "#checkout",
    cartList: "#cart_contents_container > div > div.cart_list",
  },

  commands: {
    getNumberOfItems(callback) {
      this.api.elements(
        "css selector",
        `${this.elements.cartList.selector} > *`,
        (result) => {
          if (callback) {
            callback(result.value.length);
          }
        }
      );
    },
    getCartItemName(index, callback) {
      return this.getText(
        `.cart_item:nth-of-type(${index}) .inventory_item_name`,
        (result) => {
          if (callback) {
            callback(result.value);
          }
        }
      );
    },
    getCartItemPrice(index, callback) {
      return this.getText(
        `.cart_item:nth-of-type(${index}) .inventory_item_price`,
        (result) => {
          if (callback) {
            callback(parseFloat(result.value.replace("$", "")));
          }
        }
      );
    },
    getItemQuantity(index, callback) {
      return this.getText(
        `.cart_item:nth-of-type(${index}) .cart_quantity`,
        (result) => {
          if (callback) {
            callback(parseInt(result.value));
          }
        }
      );
    },
    checkout() {
      return this.click("@checkOutBtn");
    },
  },
};
