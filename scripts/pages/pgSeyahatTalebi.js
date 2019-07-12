const KeyboardType = require("sf-core/ui/keyboardtype");
const System = require("sf-core/device/system");
const propagateTouchEvents = require("lib/propagateTouchEvents");
const Picker = require("sf-core/ui/picker");
const DatePicker = require('sf-core/ui/datepicker');
const extend = require('js-base/core/extend');
const PgSeyahatTalebiDesign = require('ui/ui_pgSeyahatTalebi');
const { wait } = require("lib/dialog");
const { getTripOptions, getAutocompleteCity, getAgentList } = require("../services/seyahatService");
const debounce = require("../utils/debounce");
const populateMaterialTextbox = require("../utils/populateMaterialTextbox");
const HIDE_MT_CLASS_NAME = ".materialTextBox-wrapper.hide";
const MATERIAL_OPTIONS = [{
        name: "mtRegion",
        icon: "arrowbottom.png"
    },
    {
        name: "mtPurpose",
        icon: "arrowbottom.png"
    }, {
        name: "mtFrom",
        icon: "search_icon.png"
    },
    {
        name: "mtTo",
        icon: "search_icon.png"
    },
    {
        name: "mtDepartureDate",
        icon: "date_icon.png"
    },
    {
        name: "mtReturnDate",
        icon: "date_icon.png"
    },
    {
        name: "mtAcente",
        icon: "arrowbottom.png"
    },
    {
        name: "mtBirthDate",
        icon: "date_icon.png"
    }
];

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
        this.routerData = {
            isFlightInfo: false,
            isAccommodationInfo: false
        };
        this.btnContinue.enabled = false;
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
        if (this.routerData.isFlightInfo) {
            page.router.push("/btb/tab2/pgFlightInfo", this.routerData);
        }
        else if (this.routerData.isAccommodationInfo) {
            page.router.push("/btb/tab2/pgKonaklamaInfo", this.routerData);
        }
    };
    propagateTouchEvents(this.svMain);
    this.flCheckFlight.setData({ text: "Ucus" });
    this.flCheckAccommodation.setData({ text: "Konaklama" });
    this.flCheckAccommodation.onCheckedChange = isChecked => {
        this.routerData.isAccommodationInfo = isChecked;
        updateContinueButtonState(this);
    };
    this.flCheckFlight.onCheckedChange = isChecked => {
        this.routerData.isFlightInfo = isChecked;
        updateContinueButtonState(this);
        showHideMaterialTextBox(this.mtAcente, isChecked);
        showHideMaterialTextBox(this.mtBirthDate, isChecked);
        showHideMaterialTextBox(this.mtID, isChecked);
        if (System.OS !== "iOS") {
            this.svMain.layout.applyLayout();
        }
        this.layout.applyLayout();
    };
    const waitDialog = wait();
    Promise.all([getTripOptions(), getAgentList()]).then(res => {
        this.itemsData["mtRegion"] = res[0].types;
        this.itemsData["mtPurpose"] = res[0].purposes;
        this.itemsData["mtAcente"] = res[1];
    }).finally(() => waitDialog.hide());
}

function initMaterials(page) {
    page.mtRegion.options = {
        hint: "Yurt ici - Yurt Disi",
        touchEnabled: false
    };
    page.mtRegion.onDropDownClick = () => page.showPicker("mtRegion", data => data.Description);
    page.mtPurpose.options = {
        hint: "Temsil",
        touchEnabled: false
    };
    page.mtPurpose.onDropDownClick = () => page.showPicker("mtPurpose", data => data.Description);
    page.mtDescription.options = {
        hint: "Seyahat Aciklamasi"
    };
    page.mtFrom.options = {
        hint: "Nereden",
        onTextChanged: (e) => {
            const text = page.mtFrom.materialTextBox.text;
            if (e && text && text.length >= 3) {
                page.showListview(
                    page,
                    page.mtFrom,
                    getAutocompleteCity,
                    text,
                    data => data.City,
                    (data) => {
                        page.mtFrom.materialTextBox.text = data.City;
                    }
                );
            }
        }
    };
    page.mtTo.options = {
        hint: "Nereye",
        onTextChanged: (e) => {
            const text = page.mtTo.materialTextBox.text;
            if (e && text && text.length >= 3) {
                page.showListview(
                    page,
                    page.mtTo,
                    getAutocompleteCity,
                    text,
                    data => data.City,
                    (data) => {
                        page.mtTo.materialTextBox.text = data.City;
                    }
                );
            }
        }
    };
    page.mtDepartureDate.options = {
        hint: "Departure Date",
        touchEnabled: false
    };
    page.mtDepartureDate.onDropDownClick = () => page.showDatePicker("mtDepartureDate");
    page.mtReturnDate.options = {
        hint: "Return Date",
        touchEnabled: false
    };
    page.mtReturnDate.onDropDownClick = () => page.showDatePicker("mtReturnDate");
    page.mtAcente.options = {
        hint: "Acente",
        touchEnabled: false
    };
    page.mtAcente.onDropDownClick = () => page.showPicker("mtAcente", data => data.AgentName);
    page.mtBirthDate.options = {
        hint: "Dogum Tarihi",
        touchEnabled: false
    };
    page.mtBirthDate.onDropDownClick = () => page.showDatePicker("mtBirthDate");
    page.mtID.options = {
        hint: "TC Kimlik No ",
        keyboardType: KeyboardType.NUMBER
    };
    populateMaterialTextbox(page, MATERIAL_OPTIONS);
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
    mt.applyLayout();
}

function showPicker(mt, itemMapFn, nextMt) {
    const page = this;
    const picker = new Picker({
        items: page.itemsData[mt].map(itemMapFn)
    });
    picker.show(({ index }) => {
        page[mt].materialTextBox.text = itemMapFn(page.itemsData[mt][index]);
        page[mt].materialTextBox.onEditEnds && page[mt].materialTextBox.onEditEnds();

    }, () => {});
}

function showDatePicker(mt) {
    const page = this;
    const myDatePicker = new DatePicker();
    myDatePicker.onDateSelected = (date) => {
        console.info("date: ", date);
        page[mt].materialTextBox.text = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
        page[mt].materialTextBox.onEditEnds && page[mt].materialTextBox.onEditEnds();
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

function updateContinueButtonState(page) {
    page.btnContinue.enabled = (page.routerData.isAccommodationInfo || page.routerData.isFlightInfo);
}

module.exports = PgSeyahatTalebi;
