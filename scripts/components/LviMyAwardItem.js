const extend = require('js-base/core/extend');
const LviMyAwardItemDesign = require('library/LviMyAwardItem');

const LviMyAwardItem = extend(LviMyAwardItemDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
		this.content = this.flMyAwardItem;
		this.setData = data => this.content.setData(data);
	}
);

module.exports = LviMyAwardItem;
