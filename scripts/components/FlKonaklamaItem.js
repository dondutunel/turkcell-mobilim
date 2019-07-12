const extend = require('js-base/core/extend');
const FlKonaklamaItemDesign = require('library/FlKonaklamaItem');
const populateMaterialTextbox = require("../utils/populateMaterialTextbox");

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
const MATERIAL_OPTIONS = [{
        name: "mtRegion",
        icon: "search_icon.png"

    }, {
        name: "mtWhenDate",
        icon: "date_icon.png"
    },
    {
        name: "mtNeed",
        icon: "arrowbottom.png"
    },
    {
        name: "mtWith",
        icon: "arrowbottom.png"
    }
];

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
            populateMaterialTextbox(this, MATERIAL_OPTIONS);
        };
        // Init delete button
        this.btnRemove.onPress = () => {
            this.onDelete && this.onDelete(); // Exposed
        };
    }
);

module.exports = FlKonaklamaItem;
