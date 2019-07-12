const extend = require('js-base/core/extend');
const FlKonaklamaItemDesign = require('library/FlKonaklamaItem');

const options = {
    "mtRegion": {
        hint: "Bölge"
    },
    "mtWhenDate": {
        hint: "Tarih",
        touchEnabled: false
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
        touchEnabled: false
    },
    "mtWith": {
        hint: "Kişi",
        touchEnabled: false
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
    }
);

module.exports = FlKonaklamaItem;
