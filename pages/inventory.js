module.exports = {
  url: "https://www.saucedemo.com/inventory.html",

  elements: {
    sortDropDown:
      "#header_container > div.header_secondary_container > div > span > select",
    inventoryList: "#inventory_container > div",
    inCartNumber: "#shopping_cart_container > a > span",
  },

  commands: {
    selectSort(value) {
      //function accepts number as value, sort options are counted from top to bottom starting at 1
      return this.click("@sortDropDown").click(
        `#header_container > div.header_secondary_container > div > span > select > option:nth-child(${value})`
      );
    },
    getNumberOfProducts(callback) {
      let inventoryItemsCount;
      return this.api.elements(
        "css selector",
        `${this.elements.inventoryList.selector} > *`,
        (result) => {
          inventoryItemsCount = result.value.length;
          if (callback) {
            callback(inventoryItemsCount);
          }
        }
      );
    },
    getCartItemsNumber(callback) {
      return this.getText("@inCartNumber", (result) => {
        if (callback) {
          callback(result.value);
        }
      });
    },
  },
};
