const { test, expect, request } = require('@playwright/test');

test('API request intercept Securty', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("#userEmail").fill("anontest123@gmail.com");
    await page.locator("#userPassword").fill("Test1234");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();


    //login and reach orders page
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
         route => 
            route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a6b911285b8849b491dc8b3' }));
    /* Continue helps intercepting the API request */

    await page.locator("button:has-text('View')").first().click();

    await expect(page.locator('p').last()).toHaveText('You are not authorize to view this order');

    await page.pause();


});