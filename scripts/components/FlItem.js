const extend = require('js-base/core/extend');
const FlItemDesign = require('library/FlItem');

const FlItem = extend(FlItemDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
	}
);

module.exports = FlItem;
