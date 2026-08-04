// rahulshettyacademy.com/client/auth/login
// anontest123@gmail.com
// Test1234
const { test, expect } = require('@playwright/test');

test("Playwright Login test", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");


    const loginUsername = page.locator("#userEmail");
    const loginPassword = page.locator("#userPassword");
    const loginSignIn = page.locator("#login");
    const loginItem = page.locator("h5 b");

    await loginUsername.fill("anontest123@gmail.com");
    await loginPassword.fill("Test1234");
    await loginSignIn.click();

    // await loginItem.first.textContent();
    await page.waitForLoadState("networkidle"); // this will wait until network requests get idle
    // waitForLoadState is flaky and doesn't always work there is another way to get this resoved
    await loginItem.first().waitFor(); // this waits until the elements are loaded
    const itemList = await loginItem.allTextContents();
    console.log(itemList);
    console.log("your first item is: " + itemList[0]);

});

test("E2E Scenario Test", async function ({ browser }) {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    const loginUsername = page.locator("#userEmail");
    const loginPassword = page.locator("#userPassword");
    const loginSignIn = page.locator("#login");
    const loginItem = page.locator(".card-body");
    const productName = 'ZARA COAT 3';
    const cart = page.locator("[routerlink*='cart']");
    const checkout = page.locator("button[type='button'] ").last();
    const selectCountry = page.locator("[placeholder='Select Country']");
    const countryOptions = page.locator(".ta-results");
    // const cardNumber = page.locator("[value*='4542']");
    const email = "anontest123@gmail.com";
    const placeOrder = page.locator(".action__submit");
    const myorders = page.locator("button[routerlink*='myorders']");


    await loginUsername.fill(email);
    await loginPassword.fill("Test1234");
    await loginSignIn.click();

      // await loginItem.first.textContent();
    await page.waitForLoadState("networkidle"); // this will wait until network requests get idle
    // waitForLoadState is flaky and doesn't always work there is another way to get this resoved
    await loginItem.first().waitFor(); // this waits until the elements are loaded
    const itemList = await loginItem.allTextContents();
    console.log(itemList);
    console.log("your first item is: " + itemList[0]);

    const count = await loginItem.count();
    console.log("count is: " + count);

    for (let i = 0; i < count; i++) {

        let product = await loginItem.nth(i).locator("b").textContent();
        console.log(product);

        if (product === productName) {
            //add the item to cart
            await loginItem.nth(i).locator("text= Add To Cart").click();
            console.log("item added");
            break;
        }

    }

    await cart.click();
    await page.locator("div li").first().waitFor();
    const flag = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();// this method does not auto-wait
    expect(flag).toBeTruthy();

    await checkout.click();
    await selectCountry.pressSequentially("ind");
    await countryOptions.waitFor();

    const countOptions = await countryOptions.locator("button").count();

    for (let i = 0; i < countOptions; i++) {

        let text = await countryOptions.locator("button").nth(i).textContent();
        console.log("This is option " + i + " : " + text);

        if (text === " India") {

            await countryOptions.locator("button").nth(i).click();
            console.log("country selected");
            break;

        }

    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

    await placeOrder.click();

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
        console.log("this is "+i+" row");

        if (orderId.includes(rowOrderId)) {

            await rows.nth(i).locator("button").first().click();
            console.log("The user is navigated to Order details page")
            break;

        }

    }
    const orderDetailId = await page.locator("div.col-text").textContent();
    expect(orderId.includes(orderDetailId)).toBeTruthy();



    await page.pause();


});
