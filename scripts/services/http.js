const ServiceCall = require("sf-extension-utils/lib/service-call");
const sampleResponse = require("./sampleResponse");
const config = require("../config.json");
const envConfig = config.env[config.env.current];
const isActiveService = config.isActiveService;

const sharedHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};
const serviceCall = new ServiceCall({
    baseUrl: envConfig.baseUrl,
    headers: Object.assign({}, sharedHeaders, {}),
    logEnabled: envConfig.logEnabled,
    timeout: 60000
});

module.exports = {
    request: (endpoint, param, options) => new Promise((resolve, reject) => {
        var shouldUseRealService = endpoint.indexOf("award") > -1 || isActiveService;
        shouldUseRealService ?
            serviceCall.request(encodeURI(endpoint + param), options)
            .then(res => {
                resolve(res);
                console.log("Request: res", res, { endpoint, param, options });
            }, e => {
                console.log("Request: Err", e, { endpoint, param, options });
                return reject(e);
            }) :
            setTimeout(() => resolve(sampleResponse[endpoint]), 300);
    })
};
