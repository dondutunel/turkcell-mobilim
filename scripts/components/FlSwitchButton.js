const extend = require('js-base/core/extend');
const FlSwitchButtonDesign = require('library/FlSwitchButton');
const touch = require("sf-extension-utils/lib/touch");

const ACTIVE_CLASS_NAME = ".flSwitchButton-button.active"
const FlSwitchButton = extend(FlSwitchButtonDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
		this._data = [];
		this._currentActiveIndex = 0;
		this.setData = data => {
			this._data = data.slice();
			const childList = this.getChildList();
			childList.forEach((child, index) => {
				touch.addPressEvent(child, () => {
					if (!this._data[index].isActive) {
						this._data[index].isActive = true;
						this._data[this._currentActiveIndex].isActive = false;
						updateItems(this);
						this.onIndexChange && this.onIndexChange(index);
					}
				});
			});
			updateItems(this);
		};
		Object.defineProperty(this, "currentIndex", {
			get: () => this._currentActiveIndex
		});

	}
);

function updateItems(comp) {
	const childList = comp.getChildList();
	childList.forEach((child, index) => {
		child.text = comp._data[index].text;
		comp._data[index].isActive && (comp._currentActiveIndex = index);
		updateLayout(child, comp._data[index].isActive);
	});
}

function updateLayout(comp, isActive) {
	if (isActive) {
		comp.dispatch({
			type: "pushClassNames",
			classNames: [ACTIVE_CLASS_NAME]
		});
	}
	else {
		comp.dispatch({
			type: "removeClassName",
			className: [ACTIVE_CLASS_NAME]
		});

	}
}

module.exports = FlSwitchButton;
