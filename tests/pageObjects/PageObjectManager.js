const { LoginPage } = require('./LoginPage');
const { DashboardPage } =  require('./DashboardPage');
const { CartPage } = require('./CartPage');
const { CheckoutPage } = require('./CheckoutPage');
const { ThankyouPage } = require('./ThankyouPage');
const { MyOrdersPage } = require('./MyOrdersPage');
const { OrderDetailsPage } = require('./OrderDetailsPage');


class PageObjectManager {
    constructor(page) {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.thankyouPage = new ThankyouPage(this.page);
        this.myOrdersPage = new MyOrdersPage(this.page);
        this.orderDetailsPage = new OrderDetailsPage(this.page);

    }
    getLoginPage() {
        return this.loginPage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getCheckoutPage() {
        return this.checkoutPage;
    }
    getThankyouPage() {
        return this.thankyouPage;
    }
    getMyOrdersPage(){
        return this.myOrdersPage;
    }
    getOrderDetailsPage(){
        return this.orderDetailsPage;
    }
}
module.exports = { PageObjectManager };