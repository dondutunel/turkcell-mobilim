const Hardware = require("sf-core/device/hardware");
const System = require("sf-core/device/system");
const { request } = require("./http");
const { getUserId } = require("../globalData");

const deviceInfo = {
	os: System.OS,
	osVersion: System.OSVersion,
	brandName: Hardware.brandName,
	brandModel: Hardware.brandModel,
	android: { apiLevel: System.android.apiLevel }
};

console.warn("DeviceInfo: ", deviceInfo);

const log = (message, type) =>
	request("/mobile/log", "", {
		method: "POST",
		body: {
			"index": "mobile",
			"type": type,
			"message": message,
			deviceInfo
		}
	});



module.exports = {
	log,
	logInfo: (message) => log(message, "info"),
};

module.exports.logError = function(message) {
	log(message, "error");
}
