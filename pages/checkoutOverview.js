module.exports = {
  url: "https://www.saucedemo.com/checkout-step-two.html",

  elements: {
    finishBtn: "#finish",
    itemsTotalPrice:
      "#checkout_summary_container > div > div.summary_info > div.summary_subtotal_label",
    tax: "#checkout_summary_container > div > div.summary_info > div.summary_tax_label",
    totalPrice:
      "#checkout_summary_container > div > div.summary_info > div.summary_total_label",
    productList: "#checkout_summary_container > div > div.cart_list",
  },

  commands: {
    getItemsNumber(callback) {
      return this.api.elements(
        "css selector",
        `${this.elements.productList.selector} > *`,
        (result) => {
          if (callback) {
            callback(result.value.length);
          }
        }
      );
    },
    getProductName(index, callback) {
      return this.getText(
        `.cart_item:nth-of-type(${index}) .inventory_item_name`,
        (result) => {
          if (callback) {
            callback(result.value);
          }
        }
      );
    },
    getProductPrice(index, callback) {
      let price;
      return this.getText(
        `.cart_item:nth-of-type(${index}) .inventory_item_price`,
        (result) => {
          price = parseFloat(result.value.replace(/[^0-9.]+/g, ""));
          if (callback) {
            callback(price);
          }
        }
      );
    },
    getProductQuantity(index, callback) {
      return this.getText(
        `.cart_item:nth-of-type(${index}) .cart_quantity`,
        (result) => {
          if (callback) {
            callback(parseInt(result.value));
          }
        }
      );
    },
    getDisplayedItemTotal(callback) {
      return this.getText("@itemsTotalPrice", (result) => {
        if (callback) {
          callback(parseFloat(result.value.replace(/[^0-9.]+/g, "")));
        }
      });
    },
    getDisplayedTax(callback) {
      return this.getText("@tax", (result) => {
        if (callback) {
          callback(parseFloat(result.value.replace(/[^0-9.]+/g, "")));
        }
      });
    },
    getDisplayedTotal(callback) {
      return this.getText("@totalPrice", (result) => {
        if (callback) {
          callback(parseFloat(result.value.replace(/[^0-9.]+/g, "")));
        }
      });
    },
    finish() {
      return this.click("@finishBtn");
    },
  },
};
