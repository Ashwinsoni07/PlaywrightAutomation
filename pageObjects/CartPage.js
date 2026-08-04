class CartPage {
    constructor(page) {

        this.page = page;
        this.checkoutButton = page.locator("button[type='button'] ").last();

    }

    async verifyProductVisible(productName) {
        const flag = await this.page.locator(`h3`, { hasText: productName }).last().isVisible();// this method does not auto-wait
        return flag;
    }
    async goToCheckoutPage(){
        await this.checkoutButton.click();
    }
}
module.exports = {CartPage};