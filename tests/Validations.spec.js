import { expect, test } from '@playwright/test'

test('Popup validations', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();

    // await page.locator('#alertbtn').click();
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    // page.on('dialog', dialog => dialog.dismiss());

    await page.locator('#mousehover').hover();



});