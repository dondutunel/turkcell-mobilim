const ServiceCall = require("sf-extension-utils/lib/service-call");
const { logError } = require("./logService");
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
    logEnabled: envConfig.logEnabled
});

module.exports = {
    request: (endpoint, param, options) => new Promise((resolve, reject) => {
        isActiveService ?
            serviceCall.request(endpoint + param, options)
            .then(res => {
                resolve(res);
                console.log("Request: res", res, { endpoint, param, options });
            })
            .catch((e) => {
                console.log("Request: Err", e, { endpoint, param, options });
                logError(JSON.stringify(e, null, "\t"));
                reject(e);
            }) :
            setTimeout(() => resolve(sampleResponse[endpoint]), 300);
    })
};
