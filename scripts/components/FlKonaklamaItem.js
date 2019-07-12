const extend = require('js-base/core/extend');
const FlKonaklamaItemDesign = require('library/FlKonaklamaItem');

const options = {
    "mtRegion": {
        hint: "Bölge"
    },
    "mtWhenDate": {
        hint: "Tarih",
        touchEnabled: false,
        enableDropDown: true
    },
    "mtWhenTime": {
        hint: "Saat"
    },
    "mtHotel": {
        hint: "Otel"
    },
    "mtCity": {
        hint: "İlçe"
    },
    "mtNeed": {
        hint: "İhtiyaç",
        touchEnabled: false,
        enableDropDown: true
    },
    "mtWith": {
        hint: "Kişi",
        touchEnabled: false,
        enableDropDown: true
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
        };
        // Init delete button
        this.btnRemove.onPress = () => {
            this.onDelete && this.onDelete(); // Exposed
        };
    }
);

module.exports = FlKonaklamaItem;
