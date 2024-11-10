module.exports = {
  url: "https://www.saucedemo.com/checkout-step-one.html",

  elements: {
    firstNameField: "#first-name",
    lastNameField: "#last-name",
    zipCodeField: "#postal-code",
    continueBtn: "#continue",
    errorMsg:
      "#checkout_info_container > div > form > div.checkout_info > div.error-message-container.error > h3",
  },

  commands: {
    fillOutInfo(firstName, lastName, zipCode) {
      return this.setValue("@firstNameField", firstName)
        .setValue("@lastNameField", lastName)
        .setValue("@zipCodeField", zipCode);
    },
    continue() {
      return this.click("@continueBtn");
    },
  },
};
