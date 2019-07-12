const extend = require('js-base/core/extend');
const FlKonaklamaItemDesign = require('library/FlUcusItem');
const { getCombinedStyle } = require("sf-extension-utils/lib/getCombinedStyle");
const populateMaterialTextbox = require("../utils/populateMaterialTextbox");

const options = {
	"mtLocationFrom": {
		hint: "Nereden"
	},
	"mtLocationTo": {
		hint: "Nereye"
	},
	"mtDateFrom": {
		hint: "Tarih"
	},
	"mtTimeFrom": {
		hint: "Saat"
	},
	"mtDonusDate": {
		hint: "Tarih"
	},
	"mtDonusTime": {
		hint: "Saat"
	},
};
const MATERIAL_OPTIONS = [{
	name: "mtDateFrom",
	icon: "date_icon.png"

}, {
	name: "mtDonusDate",
	icon: "date_icon.png"
}];

const FlKonaklamaItem = extend(FlKonaklamaItemDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;

		const FULL_HEIGHT = getCombinedStyle(".flKonaklamaItem").height;
		const HEADER_HEIGHT = getCombinedStyle(".flKonaklamaItem-header").height;
		const HEIGHT_WITHOUT_RETURN_DATE = FULL_HEIGHT - HEADER_HEIGHT;

		this.init = () => {
			Object.keys(options).forEach(componentName => {
				this[componentName].options = options[componentName];
			});
			populateMaterialTextbox(this, MATERIAL_OPTIONS);

			// Init checkbox
			this.flCheckbox.setData({ text: "Dönüş Tarihi" });
			this.flCheckbox.onCheckedChange = (isChecked) => {
				let visible = !!isChecked;
				this.flDonusTarihi.dispatch({
					type: "updateUserStyle",
					userStyle: {
						visible,
						height: visible ? HEADER_HEIGHT : 0
					}
				});
				this.dispatch({
					type: "updateUserStyle",
					userStyle: {
						height: visible ? FULL_HEIGHT : HEIGHT_WITHOUT_RETURN_DATE
					}
				});
				this.onChange && this.onChange(); // Exposed
			};
			this.flCheckbox.onCheckedChange(false);

			// Init delete button
			this.btnRemove.onPress = () => {
				this.onDelete && this.onDelete(); // Exposed
			};
		};
	}
);

module.exports = FlKonaklamaItem;
