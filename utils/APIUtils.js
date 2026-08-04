class APIUtils {



    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        // const apiContext = await request.newContext();
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            }
        )
        
        const loginResponseJson = await loginResponse.json();//fetches json response
        const token = loginResponseJson.token;//retrieves the token value from the complete response object.token

        return token;
    }

    async createOrder(orderPayload) {

        let response = {};
        response.token = await this.getToken();

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {

            data: orderPayload,
            headers: {
                'Authorization': response.token,
                'content-type': 'application/json'

            },

        })
        const orderResponseJson = await orderResponse.json();

        console.log(orderResponseJson);

        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return response;
    }

}
module.exports = {APIUtils};// this line allows access to export the utils into other files.