module.exports = {
  commands: {
    getProductName(index, callback) {
      return this.api.getText(
        `.inventory_item:nth-of-type(${index}) .inventory_item_name`,
        (result) => {
          const name = result.value;
          if (callback) {
            callback(name);
          }
        }
      );
    },
    getProductPrice(index, callback) {
      return this.api.getText(
        `#inventory_container > div > div:nth-child(${index}) > div.inventory_item_description > div.pricebar > div`,
        (result) => {
          const price = parseFloat(result.value.replace("$", ""));
          if (callback) {
            callback(price);
          }
        }
      );
    },
    addProductToCart(index) {
      return this.waitForElementVisible(
        `.inventory_item:nth-of-type(${index}) .pricebar .btn_inventory`
      ).click(`.inventory_item:nth-of-type(${index}) .pricebar .btn_inventory`);
    },
  },
};
