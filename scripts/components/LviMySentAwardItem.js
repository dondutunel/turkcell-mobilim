const extend = require('js-base/core/extend');
const LviMySentAwardItemDesign = require('library/LviMySentAwardItem');

const LviMySentAwardItem = extend(LviMySentAwardItemDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
		this.content = this.flMySentAwardItem;
		this.setData = data => this.content.setData(data);
	}
);

module.exports = LviMySentAwardItem;
