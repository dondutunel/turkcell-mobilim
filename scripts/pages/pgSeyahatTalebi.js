const System = require("sf-core/device/system");
const touch = require("sf-extension-utils/lib/touch");
const propagateTouchEvents = require("lib/propagateTouchEvents");
const Picker = require("sf-core/ui/picker");
const extend = require('js-base/core/extend');
const PgSeyahatTalebiDesign = require('ui/ui_pgSeyahatTalebi');

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
    //this.svMain.layout.minHeight = Screen.height;
    initMaterials(this);
    touch.addPressEvent(this.btnContinue, () => {

    });
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
    var picker = new Picker({
        items: ["fake1", "fake2"],
        currentIndex: 0
    });
}

function initMaterials(page) {
    page.mtRegion.options = {
        hint: "Yurt ici - Yurt Disi",
        touchEnabled: false
    };
    page.mtRegion.onDropDownClick = () => {
        console.info("mtRegion, click");
    };
    page.mtRegion.enableDropDown = true;
    page.mtPurpose.options = {
        hint: "Temsil"
    };
    page.mtPurpose.enableDropDown = true;
    page.mtDescription.options = {
        hint: "Seyahat Aciklamasi"
    };
    page.mtFrom.options = {
        hint: "Nereden"
    };
    page.mtFrom.enableDropDown = true;
    page.mtTo.options = {
        hint: "Nereye"
    };
    page.mtTo.enableDropDown = true;
    page.mtDepartureDate.options = {
        hint: "Departure Date"
    };
    page.mtDepartureDate.enableDropDown = true;
    page.mtReturnDate.options = {
        hint: "Return Date"
    };
    page.mtReturnDate.enableDropDown = true;
    page.mtAcente.options = {
        hint: "Acente"
    };
    page.mtAcente.enableDropDown = true;
    page.mtBirthDate.options = {
        hint: "Dogum Tarihi"
    };
    page.mtBirthDate.enableDropDown = true;
    page.mtID.options = {
        hint: "TC Kimlik No "
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

module.exports = PgSeyahatTalebi;
