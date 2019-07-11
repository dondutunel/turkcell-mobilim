const ActionKeyType = require("sf-core/ui/actionkeytype");
const KeyboardType = require("sf-core/ui/keyboardtype");
const LvPickerList = require("components/LvPickerList");
const System = require("sf-core/device/system");
const touch = require("sf-extension-utils/lib/touch");
const propagateTouchEvents = require("lib/propagateTouchEvents");
const Picker = require("sf-core/ui/picker");
const DatePicker = require('sf-core/ui/datepicker');
const extend = require('js-base/core/extend');
const PgSeyahatTalebiDesign = require('ui/ui_pgSeyahatTalebi');
const { wait } = require("lib/dialog");
const { getTripOptions, getAutocompleteCity } = require("../services/seyahatService");
const debounce = require("../utils/debounce");
const HIDE_MT_CLASS_NAME = ".materialTextBox-wrapper.hide";

const PgSeyahatTalebi = extend(PgSeyahatTalebiDesign)(
    // Constructor
    function(_super) {
        // Initalizes super class for this page scope
        _super(this);
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.itemsData = {};
        this.showPicker = showPicker.bind(this);
        this.showDatePicker = showDatePicker.bind(this);
        this.showListview = debounce(showListview, 300);
    }
);

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
    superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
    superOnLoad();
    const page = this;
    //this.svMain.layout.minHeight = Screen.height;
    initMaterials(this);
    this.btnContinue.onPress = () => {
        page.router.push("/btb/tab2/pgKonaklama");
    };
    propagateTouchEvents(this.svMain);
    this.flCheckFlight.setData({ text: "Ucus" });
    this.flCheckAccommodation.setData({ text: "Konaklama" });
    this.flCheckFlight.onCheckedChange = isChecked => {
        showHideMaterialTextBox(this.mtAcente, isChecked);
        showHideMaterialTextBox(this.mtBirthDate, isChecked);
        showHideMaterialTextBox(this.mtID, isChecked);
        if (System.OS !== "iOS") {
            this.mtAcente.applyLayout();
            this.mtBirthDate.applyLayout();
            this.mtID.applyLayout();
            this.svMain.autoSizeEnabled = false;
            this.svMain.autoSizeEnabled = true;
        }
        else
            this.layout.applyLayout();
    };
    const waitDialog = wait();
    getTripOptions().then(res => {
        this.itemsData["mtRegion"] = res.types;
        this.itemsData["mtPurpose"] = res.purposes;
    }).finally(() => waitDialog.hide());
}

function initMaterials(page) {
    page.mtRegion.options = {
        hint: "Yurt ici - Yurt Disi",
        touchEnabled: false
    };
    page.mtRegion.onDropDownClick = () => page.showPicker("mtRegion", data => data.Description);
    page.mtRegion.enableDropDown = true;
    page.mtPurpose.options = {
        hint: "Temsil",
        touchEnabled: false
    };
    page.mtPurpose.onDropDownClick = () => page.showPicker("mtPurpose", data => data.Description);
    page.mtPurpose.enableDropDown = true;
    page.mtDescription.options = {
        hint: "Seyahat Aciklamasi"
    };
    page.mtFrom.options = {
        hint: "Nereden",
        onTextChanged: () => {
            if (page.mtFrom.materialTextBox.text && page.mtFrom.materialTextBox.text.length >= 3) {
                page.showListview(
                    page,
                    page.mtFrom,
                    getAutocompleteCity,
                    page.mtFrom.materialTextBox.text,
                    data => data.City,
                    (data) => {
                        page.mtFrom.materialTextBox.text = data.City;
                    }
                );
            }
        }
    };
    page.mtFrom.enableDropDown = true;
    page.mtTo.options = {
        hint: "Nereye",
        onTextChanged: () => {
            if (page.mtTo.materialTextBox.text && page.mtTo.materialTextBox.text.length >= 3) {
                page.showListview(
                    page,
                    page.mtTo,
                    getAutocompleteCity,
                    page.mtTo.materialTextBox.text,
                    data => data.City,
                    (data) => {
                        page.mtTo.materialTextBox.text = data.City;
                    }
                );
            }
        }
    };
    page.mtTo.enableDropDown = true;
    page.mtDepartureDate.options = {
        hint: "Departure Date",
        touchEnabled: false
    };
    page.mtDepartureDate.onDropDownClick = () => page.showDatePicker("mtDepartureDate");
    page.mtDepartureDate.enableDropDown = true;
    page.mtReturnDate.options = {
        hint: "Return Date",
        touchEnabled: false
    };
    page.mtReturnDate.onDropDownClick = () => page.showDatePicker("mtReturnDate");
    page.mtReturnDate.enableDropDown = true;
    page.mtAcente.options = {
        hint: "Acente"
    };
    page.mtAcente.enableDropDown = true;
    page.mtBirthDate.options = {
        hint: "Dogum Tarihi",
        touchEnabled: false
    };
    page.mtBirthDate.onDropDownClick = () => page.showDatePicker("mtReturnDate");
    page.mtBirthDate.enableDropDown = true;
    page.mtID.options = {
        hint: "TC Kimlik No ",
        keyboardType: KeyboardType.NUMBER,
        actionKeyType: ActionKeyType.DEFAULT
    };
}

function showHideMaterialTextBox(mt, show) {
    if (show) {
        mt.dispatch({
            type: "removeClassName",
            className: [HIDE_MT_CLASS_NAME]
        });
    }
    else {
        mt.dispatch({
            type: "pushClassNames",
            classNames: [HIDE_MT_CLASS_NAME]
        });
    }
}

function showPicker(mt, itemMapFn, nextMt) {
    const page = this;
    const picker = new Picker({
        items: page.itemsData[mt].map(itemMapFn)
    });
    picker.show(({ index }) => {
        page[mt].materialTextBox.text = itemMapFn(page.itemsData[mt][index]);
    }, () => {});
}

function showDatePicker(mt) {
    const page = this;
    const myDatePicker = new DatePicker();
    myDatePicker.onDateSelected = (date) => {
        console.info("date: ", date);
        page[mt].materialTextBox.text = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    };
    myDatePicker.show();
}

function showListview(page, view, listServiceFn, text, dataMapperFn, cb) {
    const location = view.getScreenLocation();
    listServiceFn(text).then(res => {
        console.warn("show listview: ", text);
        res.length && page.lvPickerList.setOptions(location,
            res.map(dataMapperFn),
            (index) => cb(res[index]));
        page.svMain.layout.applyLayout();
    });
}

module.exports = PgSeyahatTalebi;
