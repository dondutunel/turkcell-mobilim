const extend = require('js-base/core/extend');
const FlHeaderDesign = require('library/FlHeader');

const FlHeader = extend(FlHeaderDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
	}
);

module.exports = FlHeader;
