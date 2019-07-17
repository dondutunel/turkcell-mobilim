const AlertView = require("sf-core/ui/alertview");
const KeyboardType = require("sf-core/ui/keyboardtype");
const extend = require('js-base/core/extend');
const FlKonaklamaItemDesign = require('library/FlUcusItem');
const { getCombinedStyle } = require("sf-extension-utils/lib/getCombinedStyle");
const populateMaterialTextbox = require("../utils/populateMaterialTextbox");
const addActionToMateriaTextboxs = require("../lib/addActionToMateriaTextboxs");
const { showDatePicker, showListview, showPicker, showConfirmAlert } = require("../lib/showHelperUiItems");
const oTextChangedForTime = require("../lib/oTextChangedForTime");

const options = {
    "mtLocationFrom": {
        hint: "Nereden",
        touchEnabled: false,
        picker: true,
        mapperFn: data => data.AirPortName_Turkish
    },
    "mtLocationTo": {
        hint: "Nereye",
        touchEnabled: false,
        picker: true,
        mapperFn: data => data.AirPortName_Turkish

    },
    "mtDateFrom": {
        hint: "Tarih",
        datePicker: true
    },
    "mtTimeFrom": {
        hint: "Saat",
        keyboardType: KeyboardType.NUMBER
    },
    "mtDonusDate": {
        hint: "Tarih",
        datePicker: true
    },
    "mtDonusTime": {
        hint: "Saat",
        keyboardType: KeyboardType.NUMBER
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

        this.init = (date) => {
            Object.keys(options).forEach(componentName => {
                this[componentName].options = options[componentName];
            });
            addActionToMateriaTextboxs(this, options);
            populateMaterialTextbox(this, MATERIAL_OPTIONS);
            console.log(date);
            this.mtDateFrom.onDropDownClick = () => showDatePicker.call(this, "mtDateFrom", date.min, date.max);
            this.mtDonusDate.onDropDownClick = () => {
                const minDate = this.mtDateFrom.materialTextBox.rawValue;
                minDate && showDatePicker.call(this, "mtDonusDate", minDate, date.max);
            };

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
                showConfirmAlert("Silme işlemini onaylıyor musunuz?", () => {
                    this.onDelete && this.onDelete(); // Exposed
                });
            };
            this.mtTimeFrom.materialTextBox.onTextChanged = e => oTextChangedForTime(this.mtTimeFrom.materialTextBox, e);
            this.mtDonusTime.materialTextBox.onTextChanged = e => oTextChangedForTime(this.mtDonusTime.materialTextBox, e);
        };
    }
);

function timeMask(value) {
    const chars = value.split('');
    const hours = [
        /[0-2]/,
        chars[0] == '2' ? /[0-3]/ : /[0-9]/
    ];

    const minutes = [/[0-5]/, /[0-9]/];

    return hours.concat(':').concat(minutes);
}

module.exports = FlKonaklamaItem;
