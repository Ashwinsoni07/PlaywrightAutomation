import { expect, test } from '@playwright/test'

test('Popup validations', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();

    await page.locator('#alertbtn').click();
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    // page.on('dialog', dialog => dialog.dismiss());

    await page.locator('#mousehover').hover();

});

test('Screenshot & Visual comparisions', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({ path: 'partialScreenshot.png' });
    await page.locator('#hide-textbox').click();
    await page.screenshot({ path: 'screenshot.png' });
    await expect(page.locator("displayed-text")).toBeHidden();


});
test("test Visuals", async ({ page }) => {

    await page.goto("https://www.flightaware.com/");
    expect(await page.screenshot()).toMatchSnapshot("landingPage.png");

});