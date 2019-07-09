const extend = require('js-base/core/extend');
const FlUserHeaderBarDesign = require('library/FlUserHeaderBar');

const FlUserHeaderBar = extend(FlUserHeaderBarDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
	}
);

module.exports = FlUserHeaderBar;
