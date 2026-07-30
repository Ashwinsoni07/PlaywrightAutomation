const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');

const loginPayload = {userEmail: "anontest123@gmail.com", userPassword: "Test1234"};
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
let response;


test.beforeAll( async ()=>{
    //login API
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);


});

test.beforeEach( ()=>{

});

test("E2E Scenario Test", async function ({ page }) {

    // const apiUtils = new APIUtils(apiContext,loginPayload);

    await page.addInitScript(value => { // this function helps writing JS to interact with browser
        window.localStorage.setItem('token', value);//this is a function taking key value pair where value is later povided
    }, response.token);//here value is provided as arguement tot eh inner function

    // const context = await browser.newContext();
    // const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    // const loginUsername = page.locator("#userEmail");
    // const loginPassword = page.locator("#userPassword");
    // const loginSignIn = page.locator("#login");
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

    await myorders.click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {

        const rowOrderId = await rows.nth(i).locator("th").textContent();
        console.log("this is "+i+" row");

        if (response.orderId.includes(rowOrderId)) {

            await rows.nth(i).locator("button").first().click();
            console.log("The user is navigated to Order details page")
            break;

        }

    }
    const orderDetailId = await page.locator("div.col-text").textContent();
    expect(response.orderId.includes(orderDetailId)).toBeTruthy();



    await page.pause();


});

