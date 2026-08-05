class OrderDetailsPage{
    constructor(page){
        this.page = page;
        this.orderDetailsId = page.locator("div.col-text");
    }
    async getOrderDetailId(){
        let orderId = await this.orderDetailsId.textContent();
        return orderId;
    }
}
module.exports = {OrderDetailsPage};