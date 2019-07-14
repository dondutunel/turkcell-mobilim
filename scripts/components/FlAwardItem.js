const extend = require('js-base/core/extend');
const FlAwardItemDesign = require('library/FlAwardItem');

const FlAwardItem = extend(FlAwardItemDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
	}
);

module.exports = FlAwardItem;
