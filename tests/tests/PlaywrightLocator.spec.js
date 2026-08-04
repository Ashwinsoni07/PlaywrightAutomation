import {test, expect} from '@playwright/test'

test("Playwright Special Locators", async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();  // This takes the text if it is a part of <label> tag and intelligently performs acions.
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123"); // looks for the placeholder attribute and performs the action
    await page.getByRole("button", {name: 'Submit'}).click();//gets the role of the element and attribute
    const bool = await page.getByText(" The Form has been submitted successfully!.").isVisible();

    await expect(bool).toBeTruthy();
    await page.getByRole("link", {name:'Shop'}).click();
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();



});