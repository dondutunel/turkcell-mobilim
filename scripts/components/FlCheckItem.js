const extend = require('js-base/core/extend');
const FlCheckItemDesign = require('library/FlCheckItem');

const FlCheckItem = extend(FlCheckItemDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
	}
);

module.exports = FlCheckItem;
