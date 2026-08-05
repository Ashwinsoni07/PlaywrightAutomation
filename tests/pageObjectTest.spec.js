// rahulshettyacademy.com/client/auth/login
// anontest123@gmail.com
// Test1234
const { test, expect } = require('@playwright/test');
import { PageObjectManager } from '../tests/pageObjects/PageObjectManager';

const testData = JSON.parse(JSON.stringify(require("../tests/utils/placeOrderTestData.json")));



test("E2E Scenario Test", async function ({ page }) {

    const pageObjectManager = new PageObjectManager(page);

    const loginPage = pageObjectManager.getLoginPage();
    const dashboardPage = pageObjectManager.getDashboardPage();
    const checkoutPage = pageObjectManager.getCheckoutPage();
    const cartPage = pageObjectManager.getCartPage();
    const myOrdersPage = pageObjectManager.getMyOrdersPage();
    const orderDetailsPage = pageObjectManager.getOrderDetailsPage();
    const thankyouPage = pageObjectManager.getThankyouPage();


    await loginPage.goTo();
    await loginPage.validLogin(testData.username, testData.password);

    await dashboardPage.addProductToCart(testData.productName);
    await dashboardPage.navigateToCart();

    const flag = await cartPage.verifyProductVisible();
    await expect(flag).toBeTruthy();
    await cartPage.goToCheckoutPage();

    await checkoutPage.selectCountry(testData.countryText, testData.expectedCountry);
    await expect(checkoutPage.checkoutEmail).toHaveText(testData.username);
    await checkoutPage.placeOrder();

    await expect(thankyouPage.getThankyouLocator()).toHaveText(testData.thankyouText);
    const orderId = await thankyouPage.getOrderId();

    await thankyouPage.goToMyOrdersPage();
    
    await myOrdersPage.goToMyOrder(orderId);

    const orderDetailId = await orderDetailsPage.getOrderDetailId();
    await expect(orderId.includes(orderDetailId)).toBeTruthy();



});
