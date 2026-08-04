class MyOrdersPage {
    constructor(page) {
        this.page = page;
        this.rows = page.locator("tbody tr");

    }
    async goToMyOrder(orderId) {
        for (let i = 0; i < await this.rows.count(); i++) {

            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            console.log("this is " + i + " row");

            if (orderId.includes(rowOrderId)) {

                await this.rows.nth(i).locator("button").first().click();
                console.log("The user is navigated to Order details page")
                break;

            }

        }
    }
}

module.exports = { MyOrdersPage };
