
const BASE_URL = "https://n2vpt6kvxi.execute-api.ap-southeast-1.amazonaws.com/prod/let-me-in/";

const user_endpoints = {
    GET_USER_DETAILS : "user/view?phoneNumber=",
    DOES_USER_EXIST: "user/exist?phoneNumber=",
    CREATE_NEW_USER: "user/create",
    UPDATE_USER: "user/update",
}

const shop_endpoints = {
    DOES_SHOP_EXISTS: "shop/exist?reg_id=",
    CREATE_NEW_SHOP: "shop/create",
    UPDATE_SHOP: "shop/update",
    GET_SHOP_DETAILS : "shop/view?reg_id=",
    FILTER_SHOP_BY_OWNER : "shop/list?phoneNumber=",
}


const checkin_endpoints = {
    GET_CHECKING_DETAILS : "user/check-in?phoneNumber=",
    CHECK_IN : "check-in",
    GET_PERSONALIZED_CHECKINS : "shop/check-in?shop_reg_id=",
}


export {BASE_URL, user_endpoints, shop_endpoints,checkin_endpoints}
