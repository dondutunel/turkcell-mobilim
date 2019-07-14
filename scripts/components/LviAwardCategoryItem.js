const extend = require('js-base/core/extend');
const LviAwardCategoryItemDesign = require('library/LviAwardCategoryItem');

const LviAwardCategoryItem = extend(LviAwardCategoryItemDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
		this.setData = data => this.flAwardCategoryItem.setData(data);
	}
);

module.exports = LviAwardCategoryItem;
