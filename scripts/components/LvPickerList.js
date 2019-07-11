const extend = require('js-base/core/extend');
const LvPickerListDesign = require('library/LvPickerList');

const HIDE_CLASS_NAME = ".lvPickerList-hide";
const LvPickerList = extend(LvPickerListDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
		this._data = [];
		this.refreshEnabled = false;
		this.itemCount = 0;
		this.onRowBind = (item, index) => {
			this._data[index] && (item.lblText.text = this._data[index]);
		};
		this.onRowSelected = (item, index) => {
			this._onSelected && this._onSelected(index);
			hideShowListview(this, false);
		};
		this.setOptions = (position, data, onSelected) => {
			console.warn("setOptions: ", data, position);
			this._onSelected = typeof onSelected === "function" ? onSelected : null;
			this.itemCount = data.length;
			this._data = data.slice();
			this.left = position.x;
			this.top = position.y;
			hideShowListview(this, true);
			this.refreshData();
		};
	}
);

function hideShowListview(lv, show) {
	if (show) {
		lv.dispatch({
			type: "removeClassName",
			className: [HIDE_CLASS_NAME]
		});
		lv.enabled = true;
	}
	else {
		lv.dispatch({
			type: "pushClassNames",
			classNames: [HIDE_CLASS_NAME]
		});
		lv.enabled = false;
	}
}

module.exports = LvPickerList;
