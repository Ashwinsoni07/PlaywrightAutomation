const { test, expect } = require('@playwright/test');// 'require()' is used to import modules and @playwright is an annotation to import libraries  

test('Browser Context Playwright test', async ({ browser }) =>//can also be written as async function()
{
    const context = await browser.newContext();  // helps to open a browser without any initial cookies. Creates an instance of the browser 
    const page = await context.newPage();

    page.route('**/*.{css,jpg,jpeg,png}', route => route.abort()); // **/* represents any urlbefore and after slash and abort blocks the api requests
        

    const username = page.locator("input#username");
    const password = page.locator("input#password");
    const submit = page.locator("input[name = 'signin']");
    const errorMessage = page.locator("[style*='block']");
    const cardTitles = page.locator('.card-body a');


    await page.goto("https://rahulshettyacademy.com/loginpagePractice/");
    console.log(await page.title());
    await username.fill("rahulshetty");// there are two methods for providing the parameters type and fill 
    //use fill method as type method is decommissioned.
    await password.fill("learning");
    await submit.click();
    console.log(await errorMessage.textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await username.fill(""); //passing the empty string in fill method clears the existeing text in the inout field
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await submit.click();
    console.log(await cardTitles.first().textContent());// first() also retruns the first element from the locator if there are multiple contents
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();// when using allTextContnets() method playwright will not wait 
    // Because this method is not included in auto wait methods. When the page is not loaded the values wil be fetched from the application
    // this resuts in not found error.
    console.log(allTitles);

});

test('Page Playwright test', async ({ page }) => {
    // const context = browser.newContext();
    // const page = await context.newPage();
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google"); // expect is another name for assert in playright 

});

test('UI Controls', async ({ page }) => {


    await page.goto("https://rahulshettyacademy.com/loginpagePractice/");
    const username = page.locator("input#username");
    const password = page.locator("input#password");
    const submit = page.locator("input[name = 'signin']");
    const dropdown = page.locator("select.form-control ");
    const documentLink = page.locator("[href*='documents-request']");


    await dropdown.selectOption("consult"); //value here is tag value not text value
    await page.locator(".customradio [value='user']").click();
    // await page.waitForLoadState("networkidle");
    await page.locator("#okayBtn").click();

    console.log(await page.locator(".customradio [value='user']").isChecked());
    await expect(page.locator(".customradio [value='user']")).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy(); // Await is used when performing actions, here the action is performed in checking the expect scope
    // await is put inside the expect scope.
    await expect(documentLink).toHaveAttribute("class", "blinkingText");



    // await page.pause();

});

// This page context is imited to the home page, now moving to a new window we need to create a new browser context to handle the new tab 

test("Child window handle", async function ({ browser }) {

    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator("input#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractice/");
    const documentLink = page.locator("[href*='documents-request']");

    // listens for any new age to open...This will not return the promise pending, rejected, fulfilled
    //the above method will ony work if the action is performed after this method is executed. if we use await then this method won't get any response 
    // until the next step is executed  i.e. click(). So here we use an array of promise to couple these steps to execute paralelly
    const [newPage] = await Promise.all([ // newPage is the return type of the step
        context.waitForEvent('page'),
        documentLink.click(),
    ])

    const text = await newPage.locator(".red").textContent();
    const arrayText = (await newPage.locator("strong a").textContent()).split("@");
    const email = arrayText[1];
    console.log(text);
    console.log("Your email is : "+ email);
    await username.fill(email);
    await page.pause();

    

});













