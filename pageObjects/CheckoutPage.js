class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.country = page.getByPlaceholder("Select Country");
        this.countryOptions = page.locator(".ta-results");
        this.checkoutEmail = page.locator(".user__name [type='text']").first();
        this.placeOrderButton = page.locator(".action__submit");
    }

    async selectCountry(countryText, expectedCountry) {

        await this.country.pressSequentially(`${countryText}`);
        await this.countryOptions.waitFor();

        const optionCount = await this.countryOptions.locator("button").count();

        for (let i = 0; i < optionCount; i++) {

            let text = await this.countryOptions.locator("button").nth(i).textContent();
            console.log("This is option " + i + " : " + text);
            console.log();

            if (text === expectedCountry) {

                await this.countryOptions.locator("button").nth(i).click();
                console.log("country selected");
                break;

            }

        }
    }

    // async verifyEmail(){

    //     return this.checkoutEmail;

    // }
    async placeOrder(){
        this.placeOrderButton.click();
    }
}
module.exports = {CheckoutPage};