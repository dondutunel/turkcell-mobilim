const extend = require('js-base/core/extend');
const FlCheckItemDesign = require('library/FlCheckItem');
const touch = require("sf-extension-utils/lib/touch");

const STATUS_TEXT = {
	selected: "",
	normal: ""
};
const FlCheckItem = extend(FlCheckItemDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
		this._isSelected = false;
		touch.addPressEvent(this.lblIcon, () => {
			this._isSelected = !this._isSelected;
			this.lblIcon.text = this._isSelected ? STATUS_TEXT.selected : STATUS_TEXT.normal;
			this.onCheckedChange && this.onCheckedChange(this._isSelected);
		});
		this.setData = (data) => {
			this._isSelected = !!data.isSelected;
			this.lblText.text = data.text;
			this.lblIcon.text = this._isSelected ? STATUS_TEXT.selected : STATUS_TEXT.normal;
		};
	}
);

module.exports = FlCheckItem;
