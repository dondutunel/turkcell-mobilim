const extend = require('js-base/core/extend');
const FlKonaklamaItemDesign = require('library/FlKonaklamaItem');
const populateMaterialTextbox = require("../utils/populateMaterialTextbox");
const addActionToMateriaTextboxs = require("../lib/addActionToMateriaTextboxs");
const { getAutocompleteCity } = require("../services/seyahatService");
const { showDatePicker, showListview, showPicker, showConfirmAlert } = require("../lib/showHelperUiItems");

const options = {
    "mtRegion": {
        hint: "Bölge"
    },
    "mtWhenDate": {
        hint: "Tarih",
        touchEnabled: false,
        datePicker: true
    },
    "mtWhenTime": {
        hint: "Saat"
    },
    "mtHotel": {
        hint: "Otel",
        picker: true,
        mapperFn: data => data.OtelName
    },
    "mtCity": {
        hint: "İlçe",
        searchPicker: true,
        listServiceFn: getAutocompleteCity,
        mapperFn: data => data.City
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
        icon: "date_icon.png",
        datePicker: true
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

        this.init = (date) => {
            Object.keys(options).forEach(componentName => {
                this[componentName].options = options[componentName];
            });
            addActionToMateriaTextboxs(this, options);
            populateMaterialTextbox(this, MATERIAL_OPTIONS);
            this.mtWhenDate.onDropDownClick = () => showDatePicker.call(this, "mtWhenDate", date.min, date.max);
        };
        // Init delete button
        this.btnRemove.onPress = () => {
            showConfirmAlert("Silme işlemini onaylıyor musunuz?", () => {
                this.onDelete && this.onDelete(); // Exposed
            });
        };
    }
);

module.exports = FlKonaklamaItem;
