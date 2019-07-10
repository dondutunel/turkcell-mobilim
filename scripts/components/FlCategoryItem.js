const extend = require('js-base/core/extend');
const FlCategoryItemDesign = require('library/FlCategoryItem');

const FlCategoryItem = extend(FlCategoryItemDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
	}
);

module.exports = FlCategoryItem;
