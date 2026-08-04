class ThankyouPage{
    constructor(page){

        this.page = page;
        this.thankyouText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrders = page.locator("button[routerlink*='myorders']");

    }
    getThankyouLocator(){
        return this.thankyouText;
    }
    async getOrderId(){
        const orderIdText = await this.orderId.textContent();
        console.log(orderIdText);
        return orderIdText;
    }
    async goToMyOrdersPage(){

        await this.myOrders.click();
        await this.page.locator("tbody").waitFor();

    }
}
module.exports = { ThankyouPage };