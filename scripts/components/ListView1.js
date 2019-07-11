const extend = require('js-base/core/extend');
const ListView1Design = require('library/ListView1');

const ListView1 = extend(ListView1Design)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
	}
);

module.exports = ListView1;
