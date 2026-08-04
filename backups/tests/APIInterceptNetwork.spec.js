const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');

const loginPayload = { userEmail: "anontest123@gmail.com", userPassword: "Test1234" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
const fakePayloadOrders = { data: [], message: "No Orders" };
let response;


test.beforeAll(async () => {
    //login API
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);


});

test.beforeEach(() => {

});

test("Test API intercepting", async function ({ page }) {

    // const apiUtils = new APIUtils(apiContext,loginPayload);

    await page.addInitScript(value => { // this function helps writing JS to interact with browser
        window.localStorage.setItem('token', value);//this is a function taking key value pair where value is later povided
    }, response.token);//here value is provided as arguement tot eh inner function


    await page.goto("https://rahulshettyacademy.com/client");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {

        /*intercepting response - API response->Hijack{fake response}->browser->render data on frontend */
        const response = await page.request.fetch(route.request());//catching the response
        let body = JSON.stringify(fakePayloadOrders);
        route.fulfill({
            response,
            body,
        })
    });

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    await page.pause();

    console.log(await page.locator('.mt-4').textContent());

   

});

