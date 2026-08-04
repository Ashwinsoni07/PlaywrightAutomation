class DashboardPage {
    constructor(page) {

        this.page = page;
        this.products = page.locator(".card-body");
        this.productText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async addProductToCart(productName) {
        // this waits until the elements are loaded
        const itemNamesList = await this.products.allTextContents();
        console.log(itemNamesList);
        console.log("your first item is: " + itemNamesList[0]);

        const count = await this.products.count();
        console.log("count is: " + count);

        for (let i = 0; i < count; i++) {

            const productTitle = await this.products.nth(i).locator("b").textContent();

            if (productTitle === productName) {
                //add the item to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                console.log("item added");
                break;
            }

        }
    }

    async navigateToCart() {
        await this.cart.click();
        await this.page.locator("div li").first().waitFor();
    }
}
module.exports = { DashboardPage };