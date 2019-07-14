const extend = require('js-base/core/extend');
const LviAwardDetailItemDesign = require('library/LviAwardDetailItem');

const LviAwardDetailItem = extend(LviAwardDetailItemDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
		this.content = this.flAwardDetailItem;
		this.setData = data => this.content.setData(data);
	}
);

module.exports = LviAwardDetailItem;
