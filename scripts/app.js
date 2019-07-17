/* globals lang */
require("i18n/i18n.js"); // Generates global lang object

const Application = require("sf-core/application");
const OS = require('sf-core/device/system').OS;

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function(e) {
	const { logError } = require("./services/logService");
	alert({
		title: e.type || lang.applicationError,
		message: OS === "Android" ? e.stack : (e.message + "\n\n*" + e.stack)
	});
	logError(JSON.stringify(e, null, "\t"));
};

require("sf-extension-utils");
require("./theme");
const router = require("./routes");
//router.push("/login");
router.push("/btb/tab2/pgKonaklamaInfo");

const Network = require("sf-core/device/network");
var notifier = new Network.createNotifier();
notifier.subscribe(function(connectionType) {
	if (connectionType === Network.ConnectionType.NONE) {
		alert("Aktif bir internet bağlantısı bulunamadı!");
	}
	console.log("ConnectionType is " + connectionType);
});
