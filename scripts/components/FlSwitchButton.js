const extend = require('js-base/core/extend');
const FlSwitchButtonDesign = require('library/FlSwitchButton');

const FlSwitchButton = extend(FlSwitchButtonDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
		this.setData = data => {
			const childList = this.getChildList();
			childList.forEach((child, index) => child.text = data[index].text);
		};
	}
);

module.exports = FlSwitchButton;
