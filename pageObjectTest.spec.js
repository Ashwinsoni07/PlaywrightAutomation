// rahulshettyacademy.com/client/auth/login
// anontest123@gmail.com
// Test1234
const { test, expect } = require('@playwright/test');
import { LoginPage } from '../tests/pageObjects/LoginPage';
import { DashboardPage } from '../tests/pageObjects/DashboardPage';
import { CartPage } from '../tests/pageObjects/CartPage';
import { CheckoutPage } from '../tests/pageObjects/CheckoutPage';



// test("Playwright Login test", async ({ browser }) => {

//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto("https://rahulshettyacademy.com/client/");


//     const loginUsername = page.locator("#userEmail");
//     const loginPassword = page.locator("#userPassword");
//     const loginSignIn = page.locator("#login");
//     const loginItem = page.locator("h5 b");

//     await loginUsername.fill("anontest123@gmail.com");
//     await loginPassword.fill("Test1234");
//     await loginSignIn.click();

//     // await loginItem.first.textContent();
//     await page.waitForLoadState("networkidle"); // this will wait until network requests get idle
//     // waitForLoadState is flaky and doesn't always work there is another way to get this resoved
//     await loginItem.first().waitFor(); // this waits until the elements are loaded
//     const itemList = await loginItem.allTextContents();
//     console.log(itemList);
//     console.log("your first item is: " + itemList[0]);

// });

test("E2E Scenario Test", async function ({ page }) {

    // const context = await browser.newContext();
    // const page = await context.newPage();

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const checkoutPage = new CheckoutPage(page);
    const cartPage = new CartPage(page);

    const username = "anontest123@gmail.com";
    const password = "Test1234";
    const productName = 'ZARA COAT 3';
    const countryText = "ind";
    const expectedCountry = " India";



    // const cardNumber = page.locator("[value*='4542']");
    const myorders = page.locator("button[routerlink*='myorders']");


    // await loginUsername.fill(username);
    // await loginPassword.fill("Test1234");
    // await loginSignIn.click();

    // await loginItem.first.textContent();

    await loginPage.goTo();
    await loginPage.validLogin(username, password);

    await dashboardPage.addProductToCart(productName);
    await dashboardPage.navigateToCart();

    const flag = await cartPage.verifyProductVisible();
    await expect(flag).toBeTruthy();
    await cartPage.goToCheckoutPage();

    await checkoutPage.selectCountry(countryText, expectedCountry);
    await expect(checkoutPage.checkoutEmail).toHaveText(username);
    await checkoutPage.placeOrder();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    console.log(orderId);
    // await cardNumber.fill("4542 9931 9292 2293");

    // await page.locator('tr:has-text("${orderId}")');

    await myorders.click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {

        const rowOrderId = await rows.nth(i).locator("th").textContent();
        console.log("this is " + i + " row");

        if (orderId.includes(rowOrderId)) {

            await rows.nth(i).locator("button").first().click();
            console.log("The user is navigated to Order details page")
            break;

        }

    }
    const orderDetailId = await page.locator("div.col-text").textContent();
    expect(orderId.includes(orderDetailId)).toBeTruthy();



});
