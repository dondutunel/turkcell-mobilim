const extend = require('js-base/core/extend');
const FlKonaklamaItemDesign = require('library/FlKonaklamaItem');
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
};

const FlKonaklamaItem = extend(FlKonaklamaItemDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;

		this.init = () => {
			Object.keys(options).forEach(componentName => {
				this[componentName].options = options[componentName];
			});
			this.flDonusTarihi.setData({ text: "Dönüş Tarihi" });
		};
	}
);

module.exports = FlKonaklamaItem;
