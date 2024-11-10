module.exports = {
  url: "https://www.saucedemo.com/",

  elements: {
    userNameField: "#user-name",
    passwordField: "#password",
    loginBtn: "#login-button",
    errorMessage:
      "#login_button_container > div > form > div.error-message-container.error > h3",
  },

  commands: {
    fillOutLoginForm(username, password) {
      return this.setValue("@userNameField", username).setValue(
        "@passwordField",
        password
      );
    },
    fillOutLoginFormStdUser() {
      return this.setValue("@userNameField", "standard_user").setValue(
        "@passwordField",
        "secret_sauce"
      );
    },
    logIn() {
      return this.waitForElementVisible("@loginBtn").click("@loginBtn");
    },
  },
};
