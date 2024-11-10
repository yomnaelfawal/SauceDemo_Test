const request = require("supertest");

let currPage, jacketPrice, onesiePrice;

module.exports = {
  before: function (browser) {
    currPage = browser.page.login();
    currPage.navigate();
  },

  "Login with Wrong Credentials Test": function () {
    currPage
      .fillOutLoginForm("wrongUser", "wrongPassword")
      .logIn()
      .verify.elementPresent(
        `${currPage.elements.errorMessage.selector}`,
        "Login is allowed with wrong credentials"
      );
  },

  "Login with Valid Credentials Standard User Test": function () {
    currPage
      .fillOutLoginFormStdUser()
      .logIn()
      //use assert to end test suite here if login is unsuccessful
      .assert.not.elementPresent(
        `${currPage.elements.errorMessage.selector}`,
        "Login is unsuccessful with standard user"
      );
  },

  "Add Product Sauce Labs Fleece Jacket Test": function () {
    currPage.assert.urlEquals(`${browser.page.inventory().url}`);
    currPage = browser.page.inventory();
    currPage.getNumberOfProducts((productsNumber) => {
      let productFound = false;
      product = browser.page.productItem();
      for (let i = 1; i < productsNumber; i++) {
        product.getProductName(i, (productName) => {
          if (productName === "Sauce Labs Fleece Jacket") {
            product.addProductToCart(i);
            product.getProductPrice(i, (productPrice) => {
              jacketPrice = productPrice;
            });
            currPage.getCartItemsNumber((inCart) => {
              product.verify.ok(
                inCart == 1,
                "Fleece Jacket not added to cart successfully"
              );
              productFound = true;
            });
          } else if (i === productsNumber - 1 && !productFound) {
            product.verify.fail("Fleece Jacket is not in inventory");
          }
        });
      }
    });
  },

  "Open Sauce Labs Onesie and Add to Cart Test": async function () {
    const productsNumber = await new Promise((resolve) => {
      currPage.getNumberOfProducts(resolve);
    });
    product = browser.page.productItem();
    for (let i = 1; i < productsNumber; i++) {
      const productName = await new Promise((resolve) => {
        product.getProductName(i, resolve);
      });
      if (productName === "Sauce Labs Onesie") {
        await new Promise((resolve) => {
          product.goToProductPage(i, resolve);
        });
        currPage = browser.page.productPage();
        await currPage.addToCart();
        onesiePrice = await new Promise((resolve) => {
          currPage.getPrice(resolve);
        });
        const inCartItemsNumber = await new Promise((resolve) => {
          currPage.getInCartItemsNumber(resolve);
        });
        currPage.verify.ok(
          inCartItemsNumber == 2,
          "Sauce Labs Onesie not added to cart successfully"
        );
        break;
      }
    }
  },
  "Check Cart Tests": async function () {
    let jacketInCart = false;
    let onesieInCart = false;
    await currPage.goToCart();
    currPage = browser.page.cart();
    const itemsNumber = await new Promise((resolve) => {
      currPage.getNumberOfItems(resolve);
    });
    currPage.verify.ok(itemsNumber == 4, "The cart quantity is incorrect");
    for (let i = 3; i <= itemsNumber; i++) {
      const productName = await new Promise((resolve) => {
        currPage.getCartItemName(i, resolve);
      });
      if (productName === "Sauce Labs Onesie") {
        onesieInCart = true;
        const onesieCartPrice = await new Promise((resolve) => {
          currPage.getCartItemPrice(i, resolve);
        });
        currPage.verify.ok(
          onesieCartPrice === onesiePrice,
          "Onesie prices on product listing and in cart are different"
        );
      }
      if (productName === "Sauce Labs Fleece Jacket") {
        jacketInCart = true;
        const jacketCartPrice = await new Promise((resolve) => {
          currPage.getCartItemPrice(i, resolve);
        });
        currPage.verify.ok(
          jacketCartPrice === jacketPrice,
          "Jacket prices on product listing and in cart are different"
        );
      }
    }
    currPage.verify
      .ok(onesieInCart, "Onesie is not in cart")
      .verify.ok(jacketInCart, "Jacket is not in cart");
  },

  "Checkout Info Test": async function () {
    currPage.checkout();
    currPage = browser.page.checkoutInfo();
    const response = await request("https://jsonplaceholder.typicode.com").get(
      "/users/1"
    );
    names = response.body.name.split(" ");
    zip = response.body.address.zipcode;
    currPage
      .fillOutInfo(names[0], names[1], zip)
      .continue()
      .assert.not.elementPresent(
        `${currPage.elements.errorMsg.selector}`,
        "Cannot continue to checkout"
      );
  },

  "Overview Page Test": async function () {
    let jacketInCart = false;
    let onesieInCart = false;
    currPage = browser.page.checkoutOverview();
    const itemsCount = await new Promise((resolve) => {
      currPage.getItemsNumber(resolve);
    });
    currPage.verify.ok(itemsCount == 4, "The cart items count is incorrect");
    for (let i = 3; i <= itemsCount; i++) {
      const productName = await new Promise((resolve) => {
        currPage.getProductName(i, resolve);
      });
      if (productName === "Sauce Labs Onesie") {
        onesieInCart = true;
        const onesieCartPrice = await new Promise((resolve) => {
          currPage.getProductPrice(i, resolve);
        });
        currPage.verify.ok(
          onesieCartPrice === onesiePrice,
          "Onesie prices on product listing and in cart are different"
        );
        const onesieCartQty = await new Promise((resolve) => {
          currPage.getProductQuantity(i, resolve);
        });
        currPage.verify.ok(
          onesieCartQty === 1,
          `Onesie quantity in cart is in correct, expected 1 but displayed ${onesieCartQty}`
        );
      }
      if (productName === "Sauce Labs Fleece Jacket") {
        jacketInCart = true;
        const jacketCartPrice = await new Promise((resolve) => {
          currPage.getProductPrice(i, resolve);
        });
        currPage.verify.ok(
          jacketCartPrice === jacketPrice,
          "Jacket prices on product listing and in cart are different"
        );
        const jacketCartQty = await new Promise((resolve) => {
          currPage.getProductQuantity(i, resolve);
        });
        currPage.verify.ok(
          jacketCartQty === 1,
          `Jacket quantity in cart is in correct, expected 1 but displayed ${jacketCartQty}`
        );
      }
    }
    currPage.verify
      .ok(onesieInCart, "Onesie is not in cart")
      .verify.ok(jacketInCart, "Jacket is not in cart");
  },

  "Overview Page Total Test": async function () {
    const calculatedTotal = jacketPrice + onesiePrice;
    const cartItemsTotal = await new Promise((resolve) => {
      currPage.getDisplayedItemTotal(resolve);
    });
    currPage.verify.ok(
      calculatedTotal === cartItemsTotal,
      `Items total displayed on page does not equal the sum of their prices, total display is \$${cartItemsTotal} while their price sum is \$${calculatedTotal}`
    );
  },

  "Complete purchase Test": async function () {
    await currPage
      .finish()
      .verify.urlEquals(browser.page.checkoutComplete().url);
  },

  after: function () {
    currPage.end();
  },
};
