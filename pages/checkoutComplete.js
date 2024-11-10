module.exports = {
  url: "https://www.saucedemo.com/checkout-complete.html",

  elements: {
    successMessage: "#checkout_complete_container > h2",
  },
  commands: {
    getMessage(callback) {
      return this.getText("@successMessage", (result) => {
        if (callback) {
          callback(result.value);
        }
      });
    },
  },
};
