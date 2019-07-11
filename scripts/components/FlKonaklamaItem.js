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
    "mtDonusDate": {
        hint: "Tarih"
    },
    "mtDonusTime": {
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
            this.flCheckbox.setData({ text: "Dönüş Tarihi" });
            this.flCheckbox.onCheckedChange = (isChecked) => {

            };
        };
    }
);

module.exports = FlKonaklamaItem;
