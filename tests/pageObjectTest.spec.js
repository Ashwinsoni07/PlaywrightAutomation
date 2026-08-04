// rahulshettyacademy.com/client/auth/login
// anontest123@gmail.com
// Test1234
const { test, expect } = require('@playwright/test');
import { PageObjectManager } from '../tests/pageObjects/PageObjectManager';
//json -> string(using JSON.stringify() method) -> JSObject - to avoid ecoding related issues

const dataset = JSON.parse(JSON.stringify(require("../utils/placeOrderTestData.json")));//converts JSON into Js object


test("E2E Scenario Test", async function ({ page }) {

    const pageObjectManager = new PageObjectManager(page);

    const loginPage = pageObjectManager.getLoginPage();
    const dashboardPage = pageObjectManager.getDashboardPage();
    const cartPage = pageObjectManager.getCartPage();
    const checkoutPage = pageObjectManager.getCheckoutPage();
    const thankyouPage = pageObjectManager.getThankyouPage();
    const myOrdersPage = pageObjectManager.getMyOrdersPage();
    const orderDetailsPage = pageObjectManager.getOrderDetailsPage();

    const username = "anontest123@gmail.com";
    const password = "Test1234";
    const productName = 'ZARA COAT 3';
    const countryText = "ind";
    const expectedCountry = " India";
    const thankyouText = " Thankyou for the order. ";


    await loginPage.goTo();
    await loginPage.validLogin(dataset.username, dataset.password);

    await dashboardPage.addProductToCart(dataset.productName);
    await dashboardPage.navigateToCart();

    const flag = await cartPage.verifyProductVisible();
    await expect(flag).toBeTruthy();
    await cartPage.goToCheckoutPage();

    await checkoutPage.selectCountry(dataset.countryText, dataset.expectedCountry);
    await expect(checkoutPage.checkoutEmail).toHaveText(dataset.username);
    await checkoutPage.placeOrder();

    await expect(thankyouPage.getThankyouLocator()).toHaveText(dataset.thankyouText);
    const orderId = await thankyouPage.getOrderId();

    await thankyouPage.goToMyOrdersPage();

    await myOrdersPage.goToMyOrder(orderId);

    const orderDetailId = await orderDetailsPage.getOrderDetailId();
    await expect(orderId.includes(orderDetailId)).toBeTruthy();



});
