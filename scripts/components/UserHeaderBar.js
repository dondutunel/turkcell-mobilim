const extend = require('js-base/core/extend');
const UserHeaderBarDesign = require('library/UserHeaderBar');

const UserHeaderBar = extend(UserHeaderBarDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
	}
);

module.exports = UserHeaderBar;
