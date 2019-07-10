const System = require("sf-core/device/system");

module.exports = function propagateTouchEvents(view) {
	if (System.OS === "iOS") {
		view.nativeObject.setValueForKey(false, "delaysContentTouches");
	}
};
