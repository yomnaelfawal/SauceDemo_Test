module.exports = {
  url: "https://www.saucedemo.com/",

  elements: {
    userNameField: "#user-name",
    passwordField: "#password",
    loginBtn: "#login-button",
  },

  data: {
    usernameStd: "standard_user",
    passwordStd: "secret_sauce",
  },

  commands: {
    fillOutLoginForm(username, password) {
      return this.setValue("@userNameField", username).setValue(
        "@passwordField",
        password
      );
    },
    fillOutLoginFormStdUser() {
      return this.setValue("@userNameField", this.data.usernameStd).setValue(
        "@passwordField",
        this.data.passwordStd
      );
    },
    logIn() {
      return this.waitForElementVisible("@loginBtn").click("@loginBtn");
    },
  },
};
