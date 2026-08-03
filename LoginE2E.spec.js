// rahulshettyacademy.com/client/auth/login
// anontest123@gmail.com
// Test1234
const { test, expect } = require('@playwright/test');


test("E2E Scenario Test new locators", async function ({ browser }) {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    const loginUsername = page.getByPlaceholder("email@example.com");
    const loginPassword = page.getByPlaceholder("enter your passsword");
    const loginSignIn = page.getByRole("button", {name:'Login'});
    const loginItem = page.locator(".card-body");
    const productName = 'ZARA COAT 3';
    const cart = page.getByRole("listitem").getByRole("button", {name:'  Cart '});
    const checkout = page.getByText("Checkout");
    const selectCountry = page.getByPlaceholder("Select Country");
    const countryOptions = page.locator(".ta-results");
    // const cardNumber = page.locator("[value*='4542']");
    const email = "anontest123@gmail.com";
    const placeOrder = page.getByText("PLACE ORDER");
    const myorders = page.getByRole("button", {name:'ORDERS'});


    await loginUsername.fill(email);
    await loginPassword.fill("Test1234");
    await loginSignIn.click();

      // await loginItem.first.textContent();
    await page.waitForLoadState("networkidle"); // this will wait until network requests get idle
    // waitForLoadState is flaky and doesn't always work there is another way to get this resoved
    await page.locator(".card-body b").first().waitFor(); // this waits until the elements are loaded

    await loginItem.filter({hasText:'ZARA COAT 3'}).getByRole("button", {name:' Add To Cart'}).click();
    await cart.click();

    const itemList = await loginItem.allTextContents();
    console.log(itemList);
    console.log("your first item is: " + itemList[0]);

    // const count = await loginItem.count();
    // console.log("count is: " + count);

    // for (let i = 0; i < count; i++) {

    //     let product = await loginItem.nth(i).locator("b").textContent();
    //     console.log(product);

    //     if (product === productName) {
    //         //add the item to cart
    //         await loginItem.nth(i).locator("text= Add To Cart").click();
    //         console.log("item added");
    //         break;
    //     }

    // }

    await page.locator("div li").first().waitFor();
    const flag = await page.getByText("ZARA COAT 3").isVisible();// this method does not auto-wait
    expect(flag).toBeTruthy();

    await checkout.click();
    await selectCountry.pressSequentially("ind");
    await countryOptions.waitFor();

    await page.getByRole("button", {name: 'India'}).nth(1).click();
    

    // const countOptions = await countryOptions.locator("button").count();

    // for (let i = 0; i < countOptions; i++) {

    //     let text = await countryOptions.locator("button").nth(i).textContent();
    //     console.log("This is option " + i + " : " + text);

    //     if (text === " India") {

    //         await countryOptions.locator("button").nth(i).click();
    //         console.log("country selected");
    //         break;

    //     }

    // }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

    await placeOrder.click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
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



});
