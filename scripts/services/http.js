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
	logEnabled: envConfig.logEnabled
});

module.exports = {
	request: (endpoint, param, options) => new Promise((resolve, reject) => {
		console.log("Request: ", { endpoint, param, options })
		isActiveService ?
			serviceCall.request(endpoint + param, options)
			.then(resolve)
			.catch((e) => {
				console.log("Request: Err",e, { endpoint, param, options })
				alert(e && e.body && e.body && e.body.errorMessage || e);
				reject(e);
			}) :
			setTimeout(() => resolve(sampleResponse[endpoint]), 300);
	})
};
