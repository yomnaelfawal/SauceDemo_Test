module.exports = {
  url: "https://www.saucedemo.com/cart.html",

  elements: {
    checkOutBtn: "#checkout",
  },

  commands: {
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
  },
};
