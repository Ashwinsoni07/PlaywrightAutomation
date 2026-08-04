class LoginPage {
    constructor(page) {

        this.page = page;
        this.signInButton = page.locator("#login");
        this.loginUsername = page.locator("#userEmail");
        this.loginPassword = page.locator("#userPassword");


    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }

    async validLogin(username, password) {
        await this.loginUsername.fill(username);
        await this.loginPassword.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState("networkidle"); // this will wait until network requests get idle
        // waitForLoadState is flaky and doesn't always work there is another way to get this resoved
        
    }

}
module.exports = { LoginPage };