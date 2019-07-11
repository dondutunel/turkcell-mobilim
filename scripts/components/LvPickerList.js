const extend = require('js-base/core/extend');
const LvPickerListDesign = require('library/LvPickerList');

const LvPickerList = extend(LvPickerListDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
	}
);

module.exports = LvPickerList;
